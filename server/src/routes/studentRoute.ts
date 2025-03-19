import express, { Request, Response } from 'express'
import * as service from '../services/studentService'
import type { Student } from '../models/student'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  if (req.query.pageSize && req.query.pageNo) {
    const pageSize = parseInt(req.query.pageSize as string) || 3
    const pageNo = parseInt(req.query.pageNo as string) || 1
    const keyword = req.query.keyword as string || ''
    try {
      const result = await service.getAllStudentPagination(
        keyword,
        pageSize,
        pageNo
      )
      if (result.students.length === 0) {
        res.status(404).send('No event found')
        return
      }
      res.setHeader('x-total-count', result.count.toString())
      res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
      res.json(result.students)
    } catch (error) {
      if (pageNo < 1 || pageSize < 1) {
        res.status(400).send('Invalid pageNo or pageSize')
      } else {
        res.status(500).send('Internal Server Error')
      }
      return
    } finally {
      console.log(
        `Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`
      )
    }
  } else if (req.query.category) {
    const category = req.query.category
    res.json(await service.getAllStudents())
  } else {
    res.json(await service.getAllStudents())
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const event = await service.getStudentById(id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send('Event not found')
  }
})

router.post('/', async (req: Request, res: Response) => {
  const newStudent: Student = req.body
  const result = await service.addStudent(newStudent)
  res.json(result)
})

export default router
