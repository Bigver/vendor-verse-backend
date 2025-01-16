import nodemailer from 'nodemailer'

// สร้าง transporter ด้วยข้อมูลที่จำเป็น
const transporter = nodemailer.createTransport({
  service: 'gmail', // หรือใช้ service อื่นๆ เช่น 'outlook', 'yahoo'
  auth: {
    user: process.env.EMAIL_USER, // อีเมลที่ใช้ส่ง
    pass: process.env.EMAIL_PASS
  }
});
// ฟังก์ชันในการส่งอีเมล
const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // อีเมลที่ใช้ส่ง
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

export default sendEmail;