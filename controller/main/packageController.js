import Package from "../../model/main/packageModel.js";

export const createPackage = async (req, res) => {
  const { name, detail, price, order, product, permission } = req.body;
  try {
    const createPackage = await Package.create({
      name,
      detail,
      price,
      order,
      product,
      permission,
    });
    res.status(201).json(createPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackage = async (req, res) => {
  try {
    const packageData = await Package.findAll();
    res.status(201).json(packageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePackage = async (req, res) => {
  const { id } = req.params; // รับ id ของ package ที่ต้องการอัปเดตจาก URL params
  const { name, detail, price, order, product, duration } = req.body;
  try {
    const [updatedRows] = await Package.update(
      {
        name,
        detail,
        price,
        order,
        product,
        duration,
      },
      {
        where: { id }, // เงื่อนไขการค้นหา package ด้วย id
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    const updatedPackage = await Package.findByPk(id); // ดึงข้อมูลแพ็กเกจที่อัปเดตแล้วกลับมา
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

export const deletePackage = async (req, res) => {
  const { id } = req.params; // รับ id ของ package ที่ต้องการลบจาก URL params

  try {
    const deletedRows = await Package.destroy({
      where: { id }, // เงื่อนไขการค้นหา package ด้วย id
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Package not found" }); // หากไม่พบ package ที่ต้องการลบ
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPackageById = async (req, res) => {
  const { id } = req.params; // รับ id จาก URL params
  try {
    const packageData = await Package.findOne({
      where: { id }, // เงื่อนไขค้นหา package ด้วย id
    });

    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' }); // หากไม่พบ package
    }

    res.status(200).json(packageData); // ส่งข้อมูล package กลับไป
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};