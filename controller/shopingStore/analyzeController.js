import OrderStore from "../../model/shopingStore/orderModel.js";
import Product from "../../model/shopingStore/productModel.js";

import { Op, fn, col, Sequelize } from "sequelize";

export const DailyIncome = async (req, res) => {
  const { store_id, date, month, year } = req.params; // รับวันที่, เดือน, ปีจากพารามิเตอร์

  try {
    // รวมค่าของวันที่, เดือน, และปี เพื่อสร้างวันที่ในรูปแบบ yyyy-mm-dd
    const formattedDate = `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
    
    // สร้าง startOfDay และ endOfDay จากวันที่ที่รวมมา
    const startOfDay = new Date(`${formattedDate}T00:00:00`); // วันที่เริ่มต้นเวลา 00:00:00
    const endOfDay = new Date(`${formattedDate}T23:59:59`); // วันที่สิ้นสุดเวลา 23:59:59

    const orders = await OrderStore.findAll({
      where: {
        store_id: store_id,
        payment_status: "ชำระเงินแล้ว", // เฉพาะคำสั่งซื้อที่ชำระเงินแล้ว
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

// export const WeeklyIncome = async (req, res) => {
//   const { store_id } = req.params;

//   const today = new Date();
  
//   // หาวันอาทิตย์ของสัปดาห์นี้
//   const startOfWeek = new Date(today);
//   startOfWeek.setDate(today.getDate() - today.getDay()); // วันอาทิตย์ของสัปดาห์นี้
  
//   // สร้างวันเสาร์ของสัปดาห์นี้
//   const endOfWeek = new Date(startOfWeek);
//   endOfWeek.setDate(startOfWeek.getDate() + 6); // เพิ่ม 6 วันเพื่อให้ถึงวันเสาร์

//   try {
//     const orders = await Order.findAll({
//       where: {
//         store_id: store_id,
//         payment_status: "ชำระเงินแล้ว",
//         createdAt: {
//           [Op.between]: [startOfWeek, endOfWeek], // คำสั่งซื้อที่เกิดขึ้นในช่วงสัปดาห์นี้
//         },
//       },
//       attributes: [
//         [fn("DATE", col("createdAt")), "date"], // วันที่ของคำสั่งซื้อ
//         [fn("SUM", col("price")), "dailyIncome"], // รายได้รายวัน
//       ],
//       group: [fn("DATE", col("createdAt"))], // จัดกลุ่มตามวันที่
//       order: [[fn("DATE", col("createdAt")), "ASC"]], // เรียงตามวันที่
//     });
//     console.log(orders)
//     // แปลงข้อมูลเป็น object {date: income}
//     const incomeData = orders.reduce((acc, order) => {
//       acc[order.getDataValue("date")] = parseFloat(
//         order.getDataValue("dailyIncome")
//       );
//       return acc;
//     }, {});

//     // สร้างชื่อวันของสัปดาห์นี้
//     const daysOfWeek = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
//     const days = [];
//     const incomes = [];

    
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startOfWeek);
//       date.setDate(startOfWeek.getDate() + i);
      
//       const dayName = daysOfWeek[date.getDay()]; // แปลงวันที่เป็นชื่อวันในสัปดาห์
//       days.push(dayName);
//       incomes.push(incomeData[date.toISOString().split("T")[0]] || 0); // ใส่ 0 ถ้าไม่มีรายได้ในวันนั้น
//     }

//     res.status(200).json({ dates : days, incomes });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const MonthlyIncome = async (req, res) => {
  const { store_id, year, month } = req.params;

  try {
    // สร้างวันที่เริ่มต้นและสิ้นสุดของเดือนที่กำหนด
    const startDate = new Date(year, month - 1, 1); // วันที่ 1 ของเดือนที่ระบุ
    const endDate = new Date(year, month, 0); // วันที่สุดท้ายของเดือนที่ระบุ

    const orders = await OrderStore.findAll({
      where: {
        store_id: store_id,
        payment_status : "ชำระเงินแล้ว", 
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
    const { store_id, year } = req.params;  // รับ store_id และ year จาก URL parameters

    const monthsName = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]; // สร้าง array สำหรับชื่อเดือน

    try {
        // ดึงข้อมูลคำสั่งซื้อที่เกิดขึ้นในปีที่ระบุ
        const orders = await OrderStore.findAll({
            where: {
                store_id: store_id,
                payment_status : "ชำระเงินแล้ว", 
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
  const { store_id } = req.params;  // รับ store_id และ year จาก URL parameters

  try {
      // ดึงจำนวนคำสั่งซื้อที่รอการตรวจสอบ
      const pendingOrders = await OrderStore.count({
          where: { shipping_status: "กำลังตรวจสอบ" , store_id : store_id }, // กำหนดสถานะคำสั่งซื้อที่ต้องการ
      });

      // ดึงจำนวนคำสั่งซื้อที่กำลังจัดส่ง
      const shippingOrders = await OrderStore.count({
          where: { shipping_status: "อยู่ระหว่างการจัดส่ง" , store_id : store_id }, // กำหนดสถานะคำสั่งซื้อที่กำลังจัดส่ง
      });

      // ดึงจำนวนสินค้าทั้งหมด
      const totalProducts = await Product.count(
        {
          where: { store_id : store_id }, // กำหนดสถานะคำสั่งซื้อที่ต้องการ
        }
      );

      res.status(200).json({
          pendingOrders,
          shippingOrders,
          totalProducts,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error)
  }
};