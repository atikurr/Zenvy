import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { verifyToken, AuthRequest } from '../middleware/auth'

const router = Router()

// ─── GET all services (public) ───────────────────────────
router.get('/', async (req, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    })
    res.json({ success: true, data: services })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch services' })
  }
})

// ─── GET single service (public) ─────────────────────────
router.get('/:id', async (req, res: Response) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id as string },
    })

    if (!service) {
      res.status(404).json({ success: false, error: 'Service not found' })
      return
    }

    res.json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch service' })
  }
})

// ─── CREATE service (admin only) ─────────────────────────
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { number, title, description, icon, tags, order } = req.body

    const service = await prisma.service.create({
      data: {
        number,
        title,
        description,
        icon,
        tags: tags ? JSON.parse(tags) : [],
        order: parseInt(order) || 0,
      },
    })

    res.status(201).json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create service' })
  }
})

// ─── UPDATE service (admin only) ─────────────────────────
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.service.findUnique({
      where: { id: req.params.id as string },
    })

    if (!existing) {
      res.status(404).json({ success: false, error: 'Service not found' })
      return
    }

    const { number, title, description, icon, tags, order, visible } = req.body

    const service = await prisma.service.update({
      where: { id: req.params.id as string },
      data: {
        number,
        title,
        description,
        icon,
        tags: tags ? JSON.parse(tags) : existing.tags,
        order: parseInt(order) || 0,
        visible: visible === 'true',
      },
    })

    res.json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update service' })
  }
})

// ─── DELETE service (admin only) ─────────────────────────
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.service.findUnique({
      where: { id: req.params.id as string },
    })

    if (!existing) {
      res.status(404).json({ success: false, error: 'Service not found' })
      return
    }

    await prisma.service.delete({
      where: { id: req.params.id as string },
    })

    res.json({ success: true, message: 'Service deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete service' })
  }
})

export default router