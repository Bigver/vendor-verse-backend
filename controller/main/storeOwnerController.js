import StoreOwner from "../../model/main/storeOwnerModel.js";
import {PageEdit} from "../../model/shopingStore/pageModel.js";
import Payment from "../../model/main/paymentModel.js";
import PageResturantEdit from "../../model/restaurant/pageModel.js";
import Package from "../../model/main/packageModel.js";
import sequelize from "../../database.js";
import { Op } from 'sequelize';

export const createStoreOwner = async (req, res) => {
  const {
    user_id,
    name_store,
    select_store,
    package_id,
    start_date,
    end_date,
    permission,
    image,
    price,
    trans_ref
  } = req.body;

  try {
    if (price > 0){
      await Payment.create({
        user_id,
        price,
        image,
        trans_ref
      });
    }
    const existingStore = await StoreOwner.findOne({
      where: { name_store },
    });

    if (existingStore) {
      return res.status(400).json({ message: "ชื่อร้านซ้ำกัน กรุณาเลือกชื่อร้านใหม่" });
    }
    const createStoreOwner = await StoreOwner.create({
      user_id,
      name_store,
      select_store,
      package_id,
      start_date,
      end_date,
      permission,
    });
   
    if (select_store === "store") {
      await PageEdit.create({
        store_id : createStoreOwner.id,
        name_store : name_store
      });
    }else if(select_store === "restaurant"){
      await PageResturantEdit.create({
        store_id : createStoreOwner.id,
        name_store : name_store
      });
    }
    res.status(201).json(createStoreOwner);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


export const getStoreOwner = async (req, res) => {
  const user_id = req.params.user_id
    try {
      const StoreOwnerData = await StoreOwner.findAll(
        {
          where : { user_id: user_id }, 
          include: {
            model: Package,  // รวมข้อมูล StoreOwner
            as: 'packageId',   // ใช้ชื่อที่ตั้งไว้ในความสัมพันธ์ (alias)
          },
        }
      );
      res.status(201).json(StoreOwnerData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const getStoreOwnerAll = async (req, res) => {
  const { searchQuery = '', page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;
  try {
    const { rows: storeOwners, count: totalItems } = await StoreOwner.findAndCountAll({
      where: {
        [Op.or]: [
          { name_store: { [Op.like]: `%${searchQuery}%` } }, // Example field for search
          { user_id: { [Op.like]: `%${searchQuery}%` } },
          { id: { [Op.like]: `%${searchQuery}%` } } // Example field for search
        ]
      },
      limit: parseInt(perPage),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']], // Order by created date
    });
    const totalPages = Math.ceil(totalItems / perPage);
    res.status(200).json({
      storeOwners,
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStoreOwner = async (req, res) => {
  const { store_id } = req.params; // ดึง id จาก params
  const {
    package_id,
    end_date,
    price,
    image,
    trans_ref
  } = req.body;
  try {
    const storeOwner = await StoreOwner.findByPk(store_id);
  
    if (!storeOwner) {
      return res.status(404).json({ message: "Store Owner not found" });
    }

    if (price > 0){
      await Payment.create({
        user_id : storeOwner.user_id,
        price,
        image,
        trans_ref
      });
    }

    // อัปเดตข้อมูล
    await storeOwner.update({
      package_id,
      end_date,
    });

    // ส่งข้อมูลที่อัปเดตกลับไปยัง client
    res.status(200).json({ message: "Store Owner updated successfully", storeOwner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getStoreOwnerId = async (req, res) => {
  const store_id = req.params.store_id
    try {
      const StoreOwnerData = await StoreOwner.findByPk(store_id);
      res.status(201).json(StoreOwnerData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };