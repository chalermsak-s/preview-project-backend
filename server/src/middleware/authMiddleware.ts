import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as authService from '../services/authService'
import type { user_role } from '@prisma/client'

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload

    const user = await authService.getUserFromToken(token)
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    req.body.user = user 
    next() 
  } catch (error) {
    next(error)
  }
}

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
  if (
    req.body.user &&
    req.body.user.roles.map((role: user_role) => role.role_name).includes('Admin')
  ) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'You are not authorized to perform this action' })
  }
  next()
}

export function checkAdvisor(req: Request, res: Response, next: NextFunction) {
  if (
    req.body.user &&
    req.body.user.roles.map((role: user_role) => role.role_name).includes('Advisor')
  ) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'You are not authorized to perform this action' })
  }
  next()
}
export function checkStudent(req: Request, res: Response, next: NextFunction) {
  if (
    req.body.user &&
    req.body.user.roles.map((role: user_role) => role.role_name).includes('Student')
  ) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'You are not authorized to perform this action' })
  }
  next()
}
