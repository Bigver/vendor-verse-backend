// import PageEdit from "../../model/shopingStore/pageModel.js";
import StoreOwner from "../../model/main/storeOwnerModel.js";
import {
  Footer,
  Navbar,
  PageEdit,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Shipping,
} from "../../model/shopingStore/pageModel.js";
import Product from "../../model/shopingStore/productModel.js";

export const createPage = async (req, res) => {
  const { store_id, logo, title1, deatil1, image1, title2, detail2, image2 } =
    req.body;
  try {
    const createPage = await PageEdit.create({
      store_id,
      logo,
      title1,
      deatil1,
      image1,
      title2,
      detail2,
      image2,
    });
    res.status(201).json(createPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPage = async (req, res) => {
  const nameStore = req.params.nameStore;
  try {
    const pageData = await PageEdit.findOne({
      where: { name_store: nameStore }, // ดึงข้อมูล Page ที่ต้องการ
      include: [
        {
          model: Navbar,
          as: "navbar", // เชื่อมโยงกับ Navbar โดยใช้อัลเลียส navbars
        },
        {
          model: Section1,
          as: "section1", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        },
        {
          model: Section2,
          as: "section2", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        },
        {
          model: Section3,
          as: "section3", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        },
        {
          model: Section4,
          as: "section4", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        },
        {
          model: Section5,
          as: "section5", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        }, 
        {
          model: Section6,
          as: "section6", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        },
        {
          model: Footer,
          as: "footer", // เชื่อมโยงกับ Section โดยใช้อัลเลียส sections
        },
        {
          model: StoreOwner,
          as: "storeOwner", // เชื่อมโยงกับ Owner โดยใช้อัลเลียส owner
        },
        {
          model: Shipping,
          as: "shipping", // เชื่อมโยงกับ Owner โดยใช้อัลเลียส owner
        },
      ],
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
    res.status(500).json({ error: error.message });
  }
};

export const editPage = async (req, res) => {
  const { id } = req.params;
  const { name_store, font, category } = req.body;
  try {
    const page = await PageEdit.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      font,
      name_store,
      category,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageNavbar = async (req, res) => {
  const { id } = req.params;
  const { template, text_color, background_color, logo } = req.body;
  try {
    const page = await Navbar.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      logo,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageSection1 = async (req, res) => {
  const { id } = req.params;
  const { template, text_color, background_color, title, detail, image } =
    req.body;
  try {
    const page = await Section1.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      title,
      detail,
      image,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageSection2 = async (req, res) => {
  const { id } = req.params;
  const { template, text_color, background_color, use_section } = req.body;
  try {
    const page = await Section2.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }
    await page.update({
      template,
      text_color,
      background_color,
      use_section,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageSection3 = async (req, res) => {
  const { id } = req.params;
  const {
    template,
    text_color,
    background_color,
    title,
    detail,
    image,
    use_section,
  } = req.body;
  try {
    const page = await Section3.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      title,
      detail,
      image,
      use_section,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageSection4 = async (req, res) => {
  const { id } = req.params;
  const { template, text_color, background_color, image, use_section } =
    req.body;
  try {
    const page = await Section4.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      image,
      use_section,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageSection5 = async (req, res) => {
  const { id } = req.params;
  const {
    template,
    text_color,
    background_color,
    title,
    detail,
    image,
    use_section,
  } = req.body;
  try {
    const page = await Section5.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      title,
      detail,
      image,
      use_section,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageSection6 = async (req, res) => {
  const { id } = req.params;
  const {
    template,
    text_color,
    background_color,
    title,
    detail,
    image,
    use_section,
    email,
    address,
    phone,
    link_facebook,
    link_instragram,
    link_line,
  } = req.body;
  try {
    const page = await Section6.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      title,
      detail,
      image,
      use_section,
      email,
      address,
      phone,
      link_facebook,
      link_instragram,
      link_line,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPageFooter = async (req, res) => {
  const { id } = req.params;
  const { template, text_color, background_color, detail_footer } = req.body;
  try {
    const page = await Footer.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "found" });
    }

    await page.update({
      template,
      text_color,
      background_color,
      detail_footer,
    });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editShipping = async (req, res) => {
  const { id } = req.params;
  const { transportation_company , price } = req.body;
  try {
    const page = await PageEdit.findOne({
      where: { store_id: id },
    });
    if (!page) {
      return res.status(404).json({ message: "found" });
    }
    const shipping = await Shipping.findOne({
      where: { page_id : page.id },
    });
    if (!shipping) {
      return res.status(404).json({ message: "found" });
    }
    await shipping.update({
      transportation_company : transportation_company,
      price : price
    });
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCatagory = async (req, res) => {
  const store_id = req.params.store_id;
  try {
    const pageData = await PageEdit.findOne({
      where: { store_id: store_id },
      attributes: ["category"], // ระบุเฉพาะคอลัมน์ที่ต้องการ
    });

    if (!pageData) {
      return res.status(404).json({ message: "found" });
    }
    res.status(201).json(pageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const selectTemplate = async (req, res) => {
  const { store_id } = req.params;
  const {
    page,
    navbar,
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    footer,
    product,
  } = req.body;
  try {
    const PageData = await PageEdit.findOne({
      where: {
        store_id: store_id, // กำหนดเงื่อนไขการค้นหา
      },
    });    
    
    if (
      !PageData 
    ) {
      return res.status(404).json({ message: "found" });
    }
    const NavbarData = await Navbar.findByPk(PageData.id);
    const Section1Data = await Section1.findByPk(PageData.id);
    const Section2Data = await Section2.findByPk(PageData.id);
    const Section3Data = await Section3.findByPk(PageData.id);
    const Section4Data = await Section4.findByPk(PageData.id);
    const Section5Data = await Section5.findByPk(PageData.id);
    const Section6Data = await Section6.findByPk(PageData.id);
    const FooterData = await Footer.findByPk(PageData.id);

    if (
      !NavbarData ||
      !Section1Data ||
      !Section2Data ||
      !Section3Data ||
      !Section4Data ||
      !Section5Data ||
      !Section6Data ||
      !FooterData
    ) {
      return res.status(404).json({ message: "found" });
    }

    await PageData.update({
      font : page.font,
      category : page.category,
    });
    

    await NavbarData.update({
      template : navbar.template,
      text_color : navbar.text_color,
      background_color  : navbar.background_color,
      logo : navbar.logo,
    });

    await Section1Data.update({
      template : section1.template,
      text_color : section1.text_color,
      background_color  : section1.background_color,
      title : section1.title,
      detail : section1.detail,
      image : section1.image
    });

    await Section2Data.update({
      template : section2.template,
      text_color : section2.text_color,
      background_color  : section2.background_color,
      use_section : section2.use_section
    });

    await Section3Data.update({
      template : section3.template,
      text_color : section3.text_color,
      background_color  : section3.background_color,
      title : section3.title,
      detail : section3.detail,
      image : section3.image,
      use_section : section3.use_section
    });

    await Section4Data.update({
      template : section4.template,
      text_color : section4.text_color,
      background_color  : section4.background_color,
      image : section4.image,
      use_section : section4.use_section
    });

    await Section5Data.update({
      template : section5.template,
      text_color : section5.text_color,
      background_color  : section5.background_color,
      title : section5.title,
      detail : section5.detail,
      image : section5.image,
      use_section : section5.use_section
    });

    await Section6Data.update({
      template : section6.template,
      text_color : section6.text_color,
      background_color  : section6.background_color,
      title : section6.title,
      detail : section6.detail,
      image : section6.image,
      use_section : section6.use_section
    });

    await FooterData.update({
      template : footer.template,
      text_color : footer.text_color,
      background_color  : footer.background_color,
      detail_footer : footer.detail,
    });

    const createdProducts = await Promise.all(
      product.map((product) =>
        Product.create({
          store_id,
          name: product.name,
          detail: product.detail,
          product_img: product.product_img,
          product_more1: product.product_more1,
          product_more2: product.product_more2,
          price: product.price,
          stock: product.stock,
          category: product.category,
        })
      )
    );
    res.status(200).json({ message : "successfully!"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
