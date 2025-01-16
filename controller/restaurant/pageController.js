import PageRestaurantEdit from "../../model/restaurant/pageModel.js";
import StoreOwner from "../../model/main/storeOwnerModel.js";
import Menu from "../../model/restaurant/menuModel.js";

export const createPage = async (req, res) => {
  const {
    store_id,
    title,
    deatil,
    image,
    category_image,
    category_template,
    category,
  } = req.body;
  try {
    const createPage = await PageRestaurantEdit.create({
      store_id,
      title,
      deatil,
      image,
      category_image,
      category_template,
      category,
    });
    res.status(201).json(createPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPage = async (req, res) => {
  const { id } = req.params;
  const {
    name_store,
    template,
    theme,
    title,
    detail,
    image,
    category_image,
    category_template,
    category,
  } = req.body;

  try {
    const page = await PageRestaurantEdit.findByPk(id);

    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      name_store,
      template,
      theme,
      title,
      detail,
      image,
      category_image,
      category_template,
      category,
    });

    res.status(200).json(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getPage = async (req, res) => {
  const nameStore = req.params.nameStore;
  try {
    const pageData = await PageRestaurantEdit.findOne({
      where: { name_store: nameStore },
      include: {
        model: StoreOwner, // รวมข้อมูล StoreOwner
        as: "storeOwner", // ใช้ชื่อที่ตั้งไว้ในความสัมพันธ์ (alias)
      },
    });
    const endDate = new Date(pageData.storeOwner.end_date);
    const today = new Date();
    const isEndDateToday =
      endDate.getFullYear() === today.getFullYear() &&
      endDate.getMonth() === today.getMonth() &&
      endDate.getDate() === today.getDate();

    if (isEndDateToday) {
      res.status(500).json({ message: "package หมดอายุ หรือ เกิดข้อผิดพลาด" });
    }

    res.status(201).json(pageData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getCatagory = async (req, res) => {
  const store_id = req.params.store_id;
  try {
    const pageData = await PageRestaurantEdit.findOne({
      where: { store_id: store_id },
      attributes: ["category"], // ระบุเฉพาะคอลัมน์ที่ต้องการ
    });

    res.status(201).json(pageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const selectTemplate = async (req, res) => {
  const { store_id } = req.params;
  const {
    theme,
    template,
    title,
    detail,
    image,
    category,
    category_template,
    category_image,
    menus,
  } = req.body;
  try {
    const pageData = await PageRestaurantEdit.findOne({
      where: { store_id: store_id },
    });
    if (!pageData) {
      return res.status(404).json({ message: "found" });
    }

    await pageData.update({
      theme, 
      template,
      title, 
      detail,
      image,
      category,
      category_template,
      category_image,
    });

    const createdMenu = await Promise.all(
      menus.map((item) =>
        Menu.create({
          store_id : store_id,
          name : item.name, 
          detail : item.detail,
          product_img : item.product_img, 
          price : item.price,
          category : item.category,
          product_more : item.product_more,
          product_special : item.product_special,
        })
      )
    );
    res.status(200).json({ message: "successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
