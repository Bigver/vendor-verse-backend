import Payment from "../../model/main/paymentModel.js";
import StoreOwner from "../../model/main/storeOwnerModel.js";
import User from "../../model/main/userModel.js";
import Product from "../../model/shopingStore/productModel.js";

import { Op, fn, col, Sequelize } from "sequelize";

export const DailyIncome = async (req, res) => {
  const {  date, month, year } = req.params; // รับวันที่, เดือน, ปีจากพารามิเตอร์

  try {
    // รวมค่าของวันที่, เดือน, และปี เพื่อสร้างวันที่ในรูปแบบ yyyy-mm-dd
    const formattedDate = `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
    
    // สร้าง startOfDay และ endOfDay จากวันที่ที่รวมมา
    const startOfDay = new Date(`${formattedDate}T00:00:00`); // วันที่เริ่มต้นเวลา 00:00:00
    const endOfDay = new Date(`${formattedDate}T23:59:59`); // วันที่สิ้นสุดเวลา 23:59:59

    const orders = await Payment.findAll({
      where: {
        status: "ตรวจสอบแล้ว", // เฉพาะคำสั่งซื้อที่ชำระเงินแล้ว
        createdAt: {
          [Op.between]: [startOfDay, endOfDay], // คำสั่งซื้อที่เกิดขึ้นในช่วงเวลาของวันที่นั้น
        },
      },
      attributes: [
        [fn("HOUR", col("createdAt")), "hour"], // ดึงชั่วโมงจาก createdAt
        [fn("SUM", col("price")), "hourlyIncome"], // รายได้รายชั่วโมง
      ],
      group: [fn("HOUR", col("createdAt"))], // จัดกลุ่มตามชั่วโมง
      order: [["hour", "ASC"]], // เรียงตามชั่วโมง
    });

    // แปลงข้อมูลเป็น object {hour: income} โดยที่ชั่วโมงจะถูกแปลงเป็นรูปแบบ HH:00
    const incomeData = orders.reduce((acc, order) => {
      const hour = order.getDataValue("hour").toString().padStart(2, "0") + ":00"; // รูปแบบ HH:00
      acc[hour] = parseFloat(order.getDataValue("hourlyIncome"));
      return acc;
    }, {});

    // สร้างช่วงเวลา 24 ชั่วโมงของวันที่
    const hours = [];
    const incomes = [];
    for (let i = 0; i < 24; i++) {
      const formattedHour = i.toString().padStart(2, "0") + ":00"; // รูปแบบ HH:00

      hours.push(formattedHour);
      incomes.push(incomeData[formattedHour] || 0); // ใส่ 0 ถ้าไม่มีรายได้ในชั่วโมงนั้น
    }

    // ส่งข้อมูลกลับ
    res.status(200).json({ dates : hours, incomes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const MonthlyIncome = async (req, res) => {
  const { year, month } = req.params;

  try {
    // สร้างวันที่เริ่มต้นและสิ้นสุดของเดือนที่กำหนด
    const startDate = new Date(year, month - 1, 1); // วันที่ 1 ของเดือนที่ระบุ
    const endDate = new Date(year, month, 0); // วันที่สุดท้ายของเดือนที่ระบุ

    const orders = await Payment.findAll({
      where: {
        status : "ตรวจสอบแล้ว", 
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [fn("DATE", col("createdAt")), "date"], // วันที่ของคำสั่งซื้อ
        [fn("SUM", col("price")), "dailyIncome"], // รายได้รายวัน
      ],
      group: ["date"], // จัดกลุ่มตามวันที่
      order: [["date", "ASC"]], // เรียงตามวันที่
    });

    // แปลงข้อมูลเป็น object {date: income}
    const incomeData = orders.reduce((acc, order) => {
      acc[order.getDataValue("date")] = parseFloat(
        order.getDataValue("dailyIncome")
      );
      return acc;
    }, {});

    // สร้างข้อมูลสำหรับทั้งเดือน
    const dates = [];
    const incomes = [];
    const daysInMonth = new Date(year, month, 0).getDate(); // จำนวนวันในเดือนที่ระบุ

    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = new Date(year, month - 1, i)
        .toISOString()
        .split("T")[0]; // รูปแบบ YYYY-MM-DD
      dates.push(formattedDate);
      incomes.push(incomeData[formattedDate] || 0); // ใส่ 0 ถ้าไม่มีรายได้ในวันนั้น
    }

    res.status(200).json({ dates, incomes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const YearlyIncome = async (req, res) => {
    const {  year } = req.params;  // รับ store_id และ year จาก URL parameters

    const monthsName = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]; // สร้าง array สำหรับชื่อเดือน

    try {
        // ดึงข้อมูลคำสั่งซื้อที่เกิดขึ้นในปีที่ระบุ
        const orders = await Payment.findAll({
            where: {
                status : "ตรวจสอบแล้ว", 
                createdAt: {
                    [Op.between]: [
                        new Date(`${year}-01-01`), // วันที่เริ่มต้นของปี
                        new Date(`${year}-12-31`), // วันที่สิ้นสุดของปี
                    ],
                },
            },
            attributes: [
                [fn('MONTH', col('createdAt')), 'month'], // ดึงข้อมูลเดือนจากวันที่
                [fn('SUM', col('price')), 'monthlyIncome'], // รายได้รายเดือน
            ],
            group: ['month'], // จัดกลุ่มตามเดือน
            order: [['month', 'ASC']], // เรียงตามเดือน
        });

        // สร้าง array สำหรับชื่อเดือนและรายได้
        const months = [];
        const monthlyIncome = [];

        // เก็บข้อมูลเดือนที่มีรายได้
        orders.forEach(order => {
            const month = order.getDataValue('month'); // ดึงเดือน
            const income = parseFloat(order.getDataValue('monthlyIncome')); // ดึงรายได้รายเดือน

            months.push(month); // เก็บเดือนใน array
            monthlyIncome.push(income); // เก็บรายได้ใน array
        });

        // เติมค่า 0 สำหรับเดือนที่ไม่มีข้อมูล
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1); // เดือน 1 - 12
        const resultMonths = [];
        const resultMonthlyIncome = [];

        allMonths.forEach(month => {
            const index = months.indexOf(month);
            resultMonths.push(monthsName[month - 1]); // แปลงหมายเลขเดือนเป็นชื่อเดือน
            resultMonthlyIncome.push(index === -1 ? 0 : monthlyIncome[months.indexOf(month)]);
        });

        // ส่งข้อมูลเดือนและรายได้
        res.status(200).json({ dates: resultMonths, incomes: resultMonthlyIncome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const OverviewWebsite = async (req, res) => {
  try {
      const pendingPayment = await Payment.count({
          where: { status: "กำลังตรวจสอบ" }, 
      });
      const totalUser = await User.count();
      const totalStore = await StoreOwner.count();

      res.status(200).json({
          pendingPayment,
          totalUser,
          totalStore
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};