"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// ─── GET all services (public) ───────────────────────────
router.get('/', async (req, res) => {
    try {
        const services = await prisma_1.prisma.service.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' },
        });
        res.json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch services' });
    }
});
// ─── GET single service (public) ─────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const service = await prisma_1.prisma.service.findUnique({
            where: { id: req.params.id },
        });
        if (!service) {
            res.status(404).json({ success: false, error: 'Service not found' });
            return;
        }
        res.json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch service' });
    }
});
// ─── CREATE service (admin only) ─────────────────────────
router.post('/', auth_1.verifyToken, async (req, res) => {
    try {
        const { number, title, description, icon, tags, order } = req.body;
        const service = await prisma_1.prisma.service.create({
            data: {
                number,
                title,
                description,
                icon,
                tags: tags ? JSON.parse(tags) : [],
                order: parseInt(order) || 0,
            },
        });
        res.status(201).json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create service' });
    }
});
// ─── UPDATE service (admin only) ─────────────────────────
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const existing = await prisma_1.prisma.service.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Service not found' });
            return;
        }
        const { number, title, description, icon, tags, order, visible } = req.body;
        const service = await prisma_1.prisma.service.update({
            where: { id: req.params.id },
            data: {
                number,
                title,
                description,
                icon,
                tags: tags ? JSON.parse(tags) : existing.tags,
                order: parseInt(order) || 0,
                visible: visible === 'true',
            },
        });
        res.json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update service' });
    }
});
// ─── DELETE service (admin only) ─────────────────────────
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const existing = await prisma_1.prisma.service.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Service not found' });
            return;
        }
        await prisma_1.prisma.service.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: 'Service deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete service' });
    }
});
exports.default = router;
