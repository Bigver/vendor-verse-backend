import User from "../../model/main/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import crypto from 'crypto';
import { Op } from 'sequelize';
import  sendEmail  from '../../utils/sendEmail.js';

dotenv.config();


export const registerUser = async (req, res) => {
  const { email, password, username , phone , confirmPassword } = req.body;
  try {
    // ตรวจสอบว่ากรอกครบหรือไม่
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // ตรวจสอบว่าอีเมลมีอยู่ในระบบแล้วหรือไม่
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // เข้ารหัสรหัสผ่าน (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 12);

    // สร้างผู้ใช้ใหม่
    const newUser = await User.create({
      email,
      username,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username : newUser.username,
        email: newUser.email,
        phone : newUser.phone
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // สร้าง Token ที่หมดอายุใน 3 ชั่วโมง
    const token = jwt.sign(
      { id: user.id, role: user.role , email : user.email , phone : user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  const { userId } = req.params; 
  const { username, phone } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // อัปเดตข้อมูลผู้ใช้
    user.username = username || user.username;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 3600000; // 1 ชั่วโมง
    await user.save();

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetURL}`,
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: Date.now() }, // ตรวจสอบ token หมดอายุ
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(password, 12); // เข้ารหัสรหัสผ่านใหม่
    user.passwordResetToken = null; // ล้าง token
    user.passwordResetExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const searchUsers = async (req, res) => {
  const { searchQuery = '', page = 1, perPage = 10 } = req.query;

  const offset = (page - 1) * perPage;

  try {
    const { rows, count } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { id: { [Op.like]: `%${searchQuery}%` } },
          { username: { [Op.like]: `%${searchQuery}%` } },
          { email: { [Op.like]: `%${searchQuery}%` } },
        ],
      },
      limit: parseInt(perPage),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(count / perPage);

    res.status(200).json({
      users: rows,
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};