import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { verifyToken, AuthRequest } from '../middleware/auth'

const router = Router()

// GET all blogs
router.get('/', async (req, res: Response) => {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ success: true, data: blogs })
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch blogs' })
  }
})

// GET single blog
router.get('/:slug', async (req, res: Response) => {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug as string },
    })

    if (!blog) {
      res.status(404).json({ success: false, error: 'Blog not found' })
      return
    }

    res.json({ success: true, data: blog })
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch blog' })
  }
})

// CREATE blog
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      author,
      readTime,
      published,
    } = req.body

    const blog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags: tags ? JSON.parse(tags) : [],
        author,
        readTime: readTime ? parseInt(readTime) : 5,
        published: published === 'true',
      },
    })

    res.status(201).json({ success: true, data: blog })
  } catch {
    res.status(500).json({ success: false, error: 'Failed to create blog' })
  }
})

// UPDATE blog
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.blogPost.findUnique({
      where: { id: req.params.id as string },
    })

    if (!existing) {
      res.status(404).json({ success: false, error: 'Blog not found' })
      return
    }

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      author,
      readTime,
      published,
    } = req.body

    const blog = await prisma.blogPost.update({
      where: { id: req.params.id as string },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags: tags ? JSON.parse(tags) : existing.tags,
        author,
        readTime: readTime ? parseInt(readTime) : existing.readTime,
        published: published === 'true',
      },
    })

    res.json({ success: true, data: blog })
  } catch {
    res.status(500).json({ success: false, error: 'Failed to update blog' })
  }
})

// DELETE blog
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.blogPost.delete({
      where: { id: req.params.id as string },
    })

    res.json({ success: true, message: 'Blog deleted' })
  } catch {
    res.status(500).json({ success: false, error: 'Failed to delete blog' })
  }
})

export default router