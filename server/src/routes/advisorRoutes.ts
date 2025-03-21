import express, { Request, Response } from 'express'
import * as service from '../services/advisorService'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(await service.getAllAdvisors())
})

export default router
