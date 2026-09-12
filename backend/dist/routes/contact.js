"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = (0, express_1.Router)();
// ─── Email transporter ────────────────────────────────────
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
// ─── POST contact message (public) ───────────────────────
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({
                success: false,
                error: 'Name, email and message are required',
            });
            return;
        }
        const contact = await prisma_1.prisma.contactMessage.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message,
            },
        });
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
        });
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
        });
        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: contact,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});
// ─── GET all messages (admin only) ───────────────────────
router.get('/', auth_1.verifyToken, async (req, res) => {
    try {
        const messages = await prisma_1.prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: messages });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
});
// ─── UPDATE message status (admin only) ──────────────────
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const message = await prisma_1.prisma.contactMessage.update({
            where: { id: req.params.id },
            data: { status },
        });
        res.json({ success: true, data: message });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update message' });
    }
});
// ─── DELETE message (admin only) ─────────────────────────
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        await prisma_1.prisma.contactMessage.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: 'Message deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete message' });
    }
});
exports.default = router;
