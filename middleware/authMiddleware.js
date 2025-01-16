import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // เก็บข้อมูล user ไว้ใน req
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware สำหรับตรวจสอบ role admin
export const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; // ดึง token จาก header

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ถอดรหัส token
    // ตรวจสอบ role ใน payload ว่าเป็น admin หรือไม่
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // req.user = decoded; // เก็บข้อมูล user ไว้ใน req สำหรับ middleware ถัดไป
    next(); // อนุญาตให้ดำเนินการต่อ
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};