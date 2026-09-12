"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const s3_1 = require("../lib/s3");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// ─── GET all testimonials (public) ───────────────────────
router.get('/', async (req, res) => {
    try {
        const testimonials = await prisma_1.prisma.testimonial.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' },
        });
        res.json({ success: true, data: testimonials });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
    }
});
// ─── GET featured testimonials (public) ──────────────────
router.get('/featured', async (req, res) => {
    try {
        const testimonials = await prisma_1.prisma.testimonial.findMany({
            where: { visible: true, featured: true },
            orderBy: { order: 'asc' },
        });
        res.json({ success: true, data: testimonials });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
    }
});
// ─── CREATE testimonial (admin only) ─────────────────────
router.post('/', auth_1.verifyToken, upload.single('avatar'), async (req, res) => {
    try {
        const { name, role, company, rating, text, featured, order } = req.body;
        let avatar = '';
        if (req.file) {
            avatar = await (0, s3_1.uploadToS3)(req.file, 'avatars');
        }
        const testimonial = await prisma_1.prisma.testimonial.create({
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
        });
        res.status(201).json({ success: true, data: testimonial });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create testimonial' });
    }
});
// ─── UPDATE testimonial (admin only) ─────────────────────
router.put('/:id', auth_1.verifyToken, upload.single('avatar'), async (req, res) => {
    try {
        const existing = await prisma_1.prisma.testimonial.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Testimonial not found' });
            return;
        }
        let avatar = existing.avatar || '';
        if (req.file) {
            if (existing.avatar)
                await (0, s3_1.deleteFromS3)(existing.avatar);
            avatar = await (0, s3_1.uploadToS3)(req.file, 'avatars');
        }
        const { name, role, company, rating, text, featured, order, visible } = req.body;
        const testimonial = await prisma_1.prisma.testimonial.update({
            where: { id: req.params.id },
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
        });
        res.json({ success: true, data: testimonial });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update testimonial' });
    }
});
// ─── DELETE testimonial (admin only) ─────────────────────
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const existing = await prisma_1.prisma.testimonial.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Testimonial not found' });
            return;
        }
        if (existing.avatar)
            await (0, s3_1.deleteFromS3)(existing.avatar);
        await prisma_1.prisma.testimonial.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: 'Testimonial deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete testimonial' });
    }
});
exports.default = router;
