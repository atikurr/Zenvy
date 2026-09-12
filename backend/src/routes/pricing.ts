import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { verifyToken, AuthRequest } from '../middleware/auth'

const router = Router()

// ─── GET all pricing plans (public) ──────────────────────
router.get('/', async (req, res: Response) => {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    })
    res.json({ success: true, data: plans })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch pricing plans' })
  }
})

// ─── GET single plan (public) ─────────────────────────────
router.get('/:id', async (req, res: Response) => {
  try {
    const plan = await prisma.pricingPlan.findUnique({
      where: { id: req.params.id as string },
    })

    if (!plan) {
      res.status(404).json({ success: false, error: 'Plan not found' })
      return
    }

    res.json({ success: true, data: plan })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch plan' })
  }
})

// ─── CREATE plan (admin only) ─────────────────────────────
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { tier, price, tagline, features, featured, ctaText, order } = req.body

    const plan = await prisma.pricingPlan.create({
      data: {
        tier,
        price,
        tagline,
        features: features ? JSON.parse(features) : [],
        featured: featured === 'true',
        ctaText: ctaText || 'Get started',
        order: parseInt(order) || 0,
      },
    })

    res.status(201).json({ success: true, data: plan })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create plan' })
  }
})

// ─── UPDATE plan (admin only) ─────────────────────────────
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.pricingPlan.findUnique({
      where: { id: req.params.id as string },
    })

    if (!existing) {
      res.status(404).json({ success: false, error: 'Plan not found' })
      return
    }

    const { tier, price, tagline, features, featured, ctaText, order, visible } = req.body

    const plan = await prisma.pricingPlan.update({
      where: { id: req.params.id as string },
      data: {
        tier,
        price,
        tagline,
        features: features ? JSON.parse(features) : existing.features,
        featured: featured === 'true',
        ctaText: ctaText || existing.ctaText,
        order: parseInt(order) || 0,
        visible: visible === 'true',
      },
    })

    res.json({ success: true, data: plan })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update plan' })
  }
})

// ─── DELETE plan (admin only) ─────────────────────────────
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.pricingPlan.findUnique({
      where: { id: req.params.id as string },
    })

    if (!existing) {
      res.status(404).json({ success: false, error: 'Plan not found' })
      return
    }

    await prisma.pricingPlan.delete({
      where: { id: req.params.id as string },
    })

    res.json({ success: true, message: 'Plan deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete plan' })
  }
})

export default router