import express, { Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import cors from 'cors'
import studentRoute from './routes/studentRoute'
import authRoutes from './routes/authRoutes'
import advisorRoutes from './routes/advisorRoutes'
import { uploadFile } from './services/uploadFileService'

dotenv.config()
const app = express()

app.use(cors())

app.use(express.json())

app.use('/students', studentRoute)
app.use('/auth', authRoutes)
app.use('/advisors', advisorRoutes)
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.json({
    message:"Welcome to Backend"
  })
})

const upload = multer({ storage: multer.memoryStorage() })
app.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const file = req.file
      if (!file) {
        return res.status(400).send('No file uploaded.')
      }

      const bucket = process.env.SUPABASE_BUCKET_NAME
      const filePath = process.env.UPLOAD_DIR

      if (!bucket || !filePath) {
        return res.status(500).send('Bucket name or file path not configured.')
      }
      const ouputUrl = await uploadFile(bucket, filePath, file)

      res.status(200).send(ouputUrl)
    } catch (error) {
      res.status(500).send('Error uploading file.')
    }
  }
)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
