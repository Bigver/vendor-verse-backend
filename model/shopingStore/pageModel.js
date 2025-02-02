import { DataTypes } from "sequelize";
import sequelize from "../../database.js";
import StoreOwner from "../main/storeOwnerModel.js";

const PageEdit = sequelize.define(
  "page_store_edits",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StoreOwner, // เชื่อมกับตาราง Store
        key: "id", // เชื่อมกับคอลัมน์ id ของตาราง Store
      },
    },
    name_store: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    font: {
      type: DataTypes.STRING,
      defaultValue: "Arial",
    },
    category: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: ["women", "men", "grasses"],
    },
  },
  {
    hooks: {
      afterCreate: async (page, options) => {
        await Navbar.create({
          page_id: page.id,
        });
        await Section1.create({
          page_id: page.id,
        });
        await Section2.create({
          page_id: page.id,
        });
        await Section3.create({
          page_id: page.id,
        });
        await Section4.create({
          page_id: page.id,
        });
        await Section5.create({
          page_id: page.id,
        });
        await Section6.create({
          page_id: page.id,
        });
        await Footer.create({
          page_id: page.id,
        });
        await Shipping.create({
          page_id: page.id,
        });
      },
    },
  }
);

const Navbar = sequelize.define(
  "navbar",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHSCmEHIwIqAuTIPx7EfJEb6s3RToY8YQEng&s",
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Section1 = sequelize.define(
  "section1",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "SHOPPING STORE",
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eveniet recusandae quo, perferendis illum, praesentium aspernatur cupiditate facere hic a voluptatem. Quasi facilis autem cupiditate natus sequi iure, et exercitationem.",
    },
    image: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        "https://static.wixstatic.com/media/84770f_a4e5aee60e58478a8781128441765935~mv2.jpg/v1/crop/x_45,y_89,w_2955,h_1767/fill/w_1849,h_995,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/fold1_hero%20(1).jpg",
      ],
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Section2 = sequelize.define(
  "section2",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    use_section: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes", // กำหนดค่าเริ่มต้นเป็น 'pending'
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Section3 = sequelize.define(
  "section3",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    use_section: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes", // กำหนดค่าเริ่มต้นเป็น 'pending'
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "SHOPPING STORE",
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eveniet recusandae quo, perferendis illum, praesentium aspernatur cupiditate facere hic a voluptatem. Quasi facilis autem cupiditate natus sequi iure, et exercitationem.",
    },
    image: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        "https://static.wixstatic.com/media/c837a6_ce2611b99f714d55ac39dd982c0e2dc3~mv2.jpg/v1/crop/x_0,y_514,w_2688,h_1278/fill/w_1851,h_880,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/fold3_banner.jpg",
      ],
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Section4 = sequelize.define(
  "section4",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    use_section: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes",
    },
    image: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        "https://static.wixstatic.com/media/c837a6_3f664c12d6cf450fa8124bb718c24fa8~mv2.jpg/v1/crop/x_0,y_321,w_1733,h_2133/fill/w_533,h_656,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/woman%20with%20face%20cream.jpg",
        "https://static.wixstatic.com/media/c837a6_17aea40f0fe74fa0bd04e5052b900a9b~mv2.jpg/v1/crop/x_153,y_661,w_1752,h_2156/fill/w_533,h_656,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/fold4_body%20category.jpg",
        "https://static.wixstatic.com/media/c837a6_7ed6c000f44a4e70bd6397a496c53d63~mv2.jpg/v1/crop/x_0,y_125,w_1920,h_2363/fill/w_533,h_656,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/fold4_hair%20category.jpg",
      ],
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Section5 = sequelize.define(
  "section5",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    use_section: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes", // กำหนดค่าเริ่มต้นเป็น 'pending'
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "our story",
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eveniet recusandae quo, perferendis illum, praesentium aspernatur cupiditate facere hic a voluptatem. Quasi facilis autem cupiditate natus sequi iure, et exercitationem.",
    },
    image: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        "https://static.wixstatic.com/media/c837a6_7a7a62482b6f4d6c971de6bd2740b63f~mv2.jpg/v1/fill/w_1079,h_1079,q_90/c837a6_7a7a62482b6f4d6c971de6bd2740b63f~mv2.webp",
      ],
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Section6 = sequelize.define(
  "section6",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    use_section: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes", // กำหนดค่าเริ่มต้นเป็น 'pending'
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Contact Us",
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eveniet recusandae quo, perferendis illum, praesentium aspernatur cupiditate facere hic a voluptatem. Quasi facilis autem cupiditate natus sequi iure, et exercitationem.",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://static.wixstatic.com/media/c837a6_3e57aa37f05c428fbe93d96301ffe50c~mv2.jpg/v1/fill/w_940,h_826,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ModelYellow.jpg",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "test_email@gmail.com",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Bangkok , Thailand",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "08888888",
    },
    link_facebook: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/",
    },
    link_instragram: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/",
    },
    link_line: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/",
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);


const Footer = sequelize.define(
  "footers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    use_section: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes", // กำหนดค่าเริ่มต้นเป็น 'pending'
    },
    text_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#000000",
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#fff",
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    detail_footer: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio illum veniam quos fugiat maiores fuga quam consectetur omnis quis! Sequi iusto qui dignissimos nostrum beatae. Neque accusamus temporibus at cum.",
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

const Shipping = sequelize.define(
  "shippings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PageEdit,
        key: "id",
      },
    },
    transportation_company: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Kerry",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 40,
    },
  },
  {
    timestamps: false, // ปิดการสร้างคอลัมน์ createdAt และ updatedAt
  }
);

StoreOwner.hasOne(PageEdit, { foreignKey: "store_id" }); // ร้านค้าหนึ่งมีหนึ่งเพจ
PageEdit.belongsTo(StoreOwner, { foreignKey: "store_id", as: "storeOwner" }); // หน้าเพจเชื่อมกับร้านค้า

PageEdit.hasOne(Navbar, { foreignKey: "page_id", as: "navbar" });
Navbar.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Section1, { foreignKey: "page_id", as: "section1" });
Section1.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Section2, { foreignKey: "page_id", as: "section2" });
Section2.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Section3, { foreignKey: "page_id", as: "section3" });
Section3.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Section4, { foreignKey: "page_id", as: "section4" });
Section4.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Section5, { foreignKey: "page_id", as: "section5" });
Section5.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Section6, { foreignKey: "page_id", as: "section6" });
Section6.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Footer, { foreignKey: "page_id", as: "footer" });
Footer.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

PageEdit.hasOne(Shipping, { foreignKey: "page_id", as: "shipping" });
Shipping.belongsTo(PageEdit, { foreignKey: "page_id", as: "page" });

export {
  PageEdit,
  Navbar,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Footer,
  Shipping
};
