import { Request, Response, NextFunction } from 'express'
import admin from '../lib/firebase'

export interface AuthRequest extends Request {
  user?: {
    uid: string
    email: string
  }
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const token = authHeader.split('Bearer ')[1]
    const decoded = await admin.auth().verifyIdToken(token)

    req.user = {
      uid: decoded.uid,
      email: decoded.email || '',
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}