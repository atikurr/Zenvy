import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { verifyToken, AuthRequest } from '../middleware/auth'
import nodemailer from 'nodemailer'

const router = Router()

// ─── Email transporter ────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ─── POST contact message (public) ───────────────────────
router.post('/', async (req, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: 'Name, email and message are required',
      })
      return
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      },
    })

    // Admin notification
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact: ${subject || 'No Subject'} — ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // User confirmation
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `We received your message — Zenvy Digital`,
      html: `
        <h2>Hi ${name}!</h2>
        <p>Thanks for reaching out. We've received your message and will get back to you within 2 hours.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Zenvy Digital Team</strong></p>
      `,
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send message' })
  }
})

// ─── GET all messages (admin only) ───────────────────────
router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: messages })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages' })
  }
})

// ─── UPDATE message status (admin only) ──────────────────
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body

    const message = await prisma.contactMessage.update({
      where: { id: req.params.id as string },
      data: { status },
    })

    res.json({ success: true, data: message })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update message' })
  }
})

// ─── DELETE message (admin only) ─────────────────────────
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.contactMessage.delete({
      where: { id: req.params.id as string },
    })

    res.json({ success: true, message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete message' })
  }
})

export default router