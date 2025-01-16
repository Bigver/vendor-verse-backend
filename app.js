import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/main/userRoutes.js';
import packageRoutes from './routes/main/packageRoutes.js';
import blogRoutes from './routes/main/blogRoute.js';
import storeOwnerRoutes from './routes/main/storeOwnerRoutes.js';
import paymentRoutes from './routes/main/paymentRoutes.js';
import uploadRoutes from './routes/main/uploadRoutes.js';
import pageRoutes from './routes/shopingStore/pageRoute.js';
import productRoutes from './routes/shopingStore/productRoute.js';
import orderRoutes from './routes/shopingStore/orderRoute.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import uploadRouter from "./routes/main/uploadFile.js";
import orderRestaurantRoute from"./routes/restaurant/orderRoute.js"
import MenuRoute from"./routes/restaurant/menuRoute.js"
import pageRestaurantRoutes from './routes/restaurant/pageRoute.js';
import analyzeStoreRoutes from './routes/shopingStore/analyzeRoute.js'
import analyzeRestaurantRoutes from './routes//restaurant/analyzeRoute.js'
import analyzeMainRoutes from './routes/main/analyzeRoute.js'
import MessageRoutes from './routes/shopingStore/messageRoute.js'
import templateStoreRoutes from './routes/shopingStore/templateRoute.js'
import templateRestaurantRoutes from './routes/restaurant/templateRoute.js'

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// กำหนดเส้นทาง
app.use('/api', packageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/storeOwner', storeOwnerRoutes);
app.use('/api/package', packageRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/analyze', analyzeMainRoutes);

//uploadSlip
app.use('/api/upload', uploadRoutes);
//uploadFile
app.use("/api/uploadFile", uploadRouter);
//storeShop
app.use('/api/store/page', pageRoutes);
app.use('/api/store/product', productRoutes);
app.use('/api/store/order', orderRoutes);
app.use('/api/store/analyze', analyzeStoreRoutes);
app.use('/api/store/message', MessageRoutes);
app.use('/api/store/template', templateStoreRoutes);

//resturant
app.use('/api/restaurant/order' , orderRestaurantRoute)
app.use('/api/restaurant/menu' , MenuRoute)
app.use('/api/restaurant/page', pageRestaurantRoutes);
app.use('/api/restaurant/analyze', analyzeRestaurantRoutes);
app.use('/api/restaurant/template', templateRestaurantRoutes);


export default app;