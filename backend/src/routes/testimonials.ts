import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { verifyToken, AuthRequest } from '../middleware/auth'
import { uploadToS3, deleteFromS3 } from '../lib/s3'
import multer from 'multer'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

// ─── GET all testimonials (public) ───────────────────────
router.get('/', async (req, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    })
    res.json({ success: true, data: testimonials })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials' })
  }
})

// ─── GET featured testimonials (public) ──────────────────
router.get('/featured', async (req, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { visible: true, featured: true },
      orderBy: { order: 'asc' },
    })
    res.json({ success: true, data: testimonials })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials' })
  }
})

// ─── CREATE testimonial (admin only) ─────────────────────
router.post(
  '/',
  verifyToken,
  upload.single('avatar'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, role, company, rating, text, featured, order } = req.body

      let avatar = ''
      if (req.file) {
        avatar = await uploadToS3(req.file, 'avatars')
      }

      const testimonial = await prisma.testimonial.create({
        data: {
          name,
          role,
          company,
          avatar: avatar || null,
          rating: parseInt(rating) || 5,
          text,
          featured: featured === 'true',
          order: parseInt(order) || 0,
        },
      })

      res.status(201).json({ success: true, data: testimonial })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create testimonial' })
    }
  }
)

// ─── UPDATE testimonial (admin only) ─────────────────────
router.put(
  '/:id',
  verifyToken,
  upload.single('avatar'),
  async (req: AuthRequest, res: Response) => {
    try {
      const existing = await prisma.testimonial.findUnique({
        where: { id: req.params.id as string },
      })

      if (!existing) {
        res.status(404).json({ success: false, error: 'Testimonial not found' })
        return
      }

      let avatar = existing.avatar || ''
      if (req.file) {
        if (existing.avatar) await deleteFromS3(existing.avatar)
        avatar = await uploadToS3(req.file, 'avatars')
      }

      const { name, role, company, rating, text, featured, order, visible } = req.body

      const testimonial = await prisma.testimonial.update({
        where: { id: req.params.id as string },
        data: {
          name,
          role,
          company,
          avatar: avatar || null,
          rating: parseInt(rating) || 5,
          text,
          featured: featured === 'true',
          order: parseInt(order) || 0,
          visible: visible === 'true',
        },
      })

      res.json({ success: true, data: testimonial })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update testimonial' })
    }
  }
)

// ─── DELETE testimonial (admin only) ─────────────────────
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.testimonial.findUnique({
      where: { id: req.params.id as string },
    })

    if (!existing) {
      res.status(404).json({ success: false, error: 'Testimonial not found' })
      return
    }

    if (existing.avatar) await deleteFromS3(existing.avatar)

    await prisma.testimonial.delete({
      where: { id: req.params.id as string },
    })

    res.json({ success: true, message: 'Testimonial deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete testimonial' })
  }
})

export default router