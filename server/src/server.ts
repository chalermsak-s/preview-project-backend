import express, { Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import cors from 'cors'
import studentRoute from './routes/studentRoute'
import authRoutes from './routes/authRoutes'
import advisorRoutes from './routes/advisorRoutes'
import { uploadFile } from './services/uploadFileService'

const port = process.env.PORT || 3000
dotenv.config()
const app = express()

import fs from 'fs';
import path from 'path';

app.use(cors())
app.use(express.json())


app.use('/students', studentRoute)
app.use('/auth', authRoutes)
app.use('/advisors', advisorRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Backend',
  })
})

const uploadDir = path.join(__dirname, 'uploads');
// ตรวจสอบและสร้างโฟลเดอร์อัปโหลดถ้ายังไม่มี
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการจัดเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    callback(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const fileUrl = `/uploads/${req.file.filename}`;

  // ส่งข้อมูลไฟล์กลับ รวมถึง path ของไฟล์
  res.json({ 
    filename: req.file.filename, 
    path: filePath, // Path แบบเต็มของไฟล์
    url: fileUrl    // URL สำหรับการเข้าถึงไฟล์
  });
});

// เสิร์ฟไฟล์ในโฟลเดอร์ 'uploads'
app.use('/uploads', express.static(uploadDir));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
