import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import studentRoute from './routes/studentRoute'
import authRoutes from './routes/authRoutes'
import advisorRoutes from './routes/advisorRoutes'
import { uploadFile } from './services/uploadFileService'

const port = process.env.PORT || 3000
dotenv.config()
const app = express()

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
