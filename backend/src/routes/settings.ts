import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { verifyToken, AuthRequest } from '../middleware/auth'

const router = Router()

// GET all settings
router.get('/', async (req, res: Response) => {
  try {
    const settings = await prisma.siteSettings.findMany()
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch settings' })
  }
})

// UPDATE / CREATE setting
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { key, value } = req.body

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })

    res.json({ success: true, data: setting })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update setting' })
  }
})

export default router