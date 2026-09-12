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
// ─── GET all projects (public) ────────────────────────────
router.get('/', async (req, res) => {
    try {
        const projects = await prisma_1.prisma.project.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' },
        });
        res.json({ success: true, data: projects });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
});
// ─── GET featured projects (public) ──────────────────────
router.get('/featured', async (req, res) => {
    try {
        const projects = await prisma_1.prisma.project.findMany({
            where: { visible: true, featured: true },
            orderBy: { order: 'asc' },
            take: 6,
        });
        res.json({ success: true, data: projects });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
});
// ─── GET single project by slug (public) ─────────────────
router.get('/:slug', async (req, res) => {
    try {
        const project = await prisma_1.prisma.project.findUnique({
            where: { slug: req.params.slug },
        });
        if (!project) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
});
// ─── CREATE project (admin only) ─────────────────────────
router.post('/', auth_1.verifyToken, upload.single('coverImage'), async (req, res) => {
    try {
        const { title, slug, description, category, tags, liveUrl, featured, order, challenge, solution, results, } = req.body;
        let coverImage = '';
        if (req.file) {
            coverImage = await (0, s3_1.uploadToS3)(req.file, 'projects');
        }
        const project = await prisma_1.prisma.project.create({
            data: {
                title,
                slug,
                description,
                coverImage,
                category: category ? JSON.parse(category) : [],
                tags: tags ? JSON.parse(tags) : [],
                liveUrl: liveUrl || null,
                featured: featured === 'true',
                order: parseInt(order) || 0,
                challenge: challenge || null,
                solution: solution || null,
                results: results || null,
            },
        });
        res.status(201).json({ success: true, data: project });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create project' });
    }
});
// ─── UPDATE project (admin only) ─────────────────────────
router.put('/:id', auth_1.verifyToken, upload.single('coverImage'), async (req, res) => {
    try {
        const existing = await prisma_1.prisma.project.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        let coverImage = existing.coverImage || '';
        if (req.file) {
            if (existing.coverImage)
                await (0, s3_1.deleteFromS3)(existing.coverImage);
            coverImage = await (0, s3_1.uploadToS3)(req.file, 'projects');
        }
        const { title, slug, description, category, tags, liveUrl, featured, order, visible, challenge, solution, results, } = req.body;
        const project = await prisma_1.prisma.project.update({
            where: { id: req.params.id },
            data: {
                title,
                slug,
                description,
                coverImage,
                category: category ? JSON.parse(category) : existing.category,
                tags: tags ? JSON.parse(tags) : existing.tags,
                liveUrl: liveUrl || null,
                featured: featured === 'true',
                order: parseInt(order) || 0,
                visible: visible === 'true',
                challenge: challenge || null,
                solution: solution || null,
                results: results || null,
            },
        });
        res.json({ success: true, data: project });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update project' });
    }
});
// ─── DELETE project (admin only) ─────────────────────────
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const existing = await prisma_1.prisma.project.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Project not found' });
            return;
        }
        if (existing.coverImage)
            await (0, s3_1.deleteFromS3)(existing.coverImage);
        await prisma_1.prisma.project.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: 'Project deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete project' });
    }
});
exports.default = router;
