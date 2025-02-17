import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const timestamp = new Date().toISOString().replace(/[:.-]/g, ""); // Generate timestamp
        const fileExtension = req.file.originalname.split(".").pop(); // Get file extension

        const stream = cloudinary.uploader.upload_stream(
          { public_id: `file_${timestamp}.${fileExtension}` }, // Set custom name
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});
export default uploadRouter;
