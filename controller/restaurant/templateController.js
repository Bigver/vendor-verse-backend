// controllers/templateController.js
import Template from "../../model/restaurant/templateModel.js";
import { Op } from "sequelize";

export const createTemplate = async (req, res) => {
  const { template_id, img } = req.body;
  try {
    const newTemplate = await Template.create({ template_id, img });
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchTemplate = async (req, res) => {
  const { searchQuery = "", page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;
  try {
    const { rows, count } = await Template.findAndCountAll({
      where: {
        ...(searchQuery
          ? {
              [Op.or]: [
                { id: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน id
                { template_id: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน id
              ],
            }
          : {}), // ถ้าไม่มี searchQuery ให้แสดงสินค้าทั้งหมด
      },
      limit: parseInt(perPage), // จำนวนสินค้าที่ดึงต่อหน้า
      offset: parseInt(offset), // เริ่มต้นจากรายการที่เท่าไหร่
    });

    if (rows.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      template: rows, // ข้อมูลสินค้า
      totalItems: count, // จำนวนสินค้าทั้งหมด
      totalPages: totalPages, // จำนวนหน้าทั้งหมด
      currentPage: parseInt(page), // หน้าปัจจุบัน
      perPage: parseInt(perPage), // จำนวนสินค้าต่อหน้า
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTemplateById = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findByPk(id);
    if (!template)
      return res.status(404).json({ message: "Template not found" });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTemplateByCategoryAndId = async (req, res) => {
  const { template_id } = req.params; // ดึง category และ template_id จาก params
  try {
    const template = await Template.findOne({
      where: {
        template_id,
      },
    });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { category, template_id, img } = req.body;
  try {
    const template = await Template.findByPk(id);
    if (!template)
      return res.status(404).json({ message: "Template not found" });

    await template.update({ category, template_id, img });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findByPk(id);
    if (!template)
      return res.status(404).json({ message: "Template not found" });

    await template.destroy();
    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
