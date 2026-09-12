"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// ─── GET all pricing plans (public) ──────────────────────
router.get('/', async (req, res) => {
    try {
        const plans = await prisma_1.prisma.pricingPlan.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' },
        });
        res.json({ success: true, data: plans });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch pricing plans' });
    }
});
// ─── GET single plan (public) ─────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const plan = await prisma_1.prisma.pricingPlan.findUnique({
            where: { id: req.params.id },
        });
        if (!plan) {
            res.status(404).json({ success: false, error: 'Plan not found' });
            return;
        }
        res.json({ success: true, data: plan });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch plan' });
    }
});
// ─── CREATE plan (admin only) ─────────────────────────────
router.post('/', auth_1.verifyToken, async (req, res) => {
    try {
        const { tier, price, tagline, features, featured, ctaText, order } = req.body;
        const plan = await prisma_1.prisma.pricingPlan.create({
            data: {
                tier,
                price,
                tagline,
                features: features ? JSON.parse(features) : [],
                featured: featured === 'true',
                ctaText: ctaText || 'Get started',
                order: parseInt(order) || 0,
            },
        });
        res.status(201).json({ success: true, data: plan });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create plan' });
    }
});
// ─── UPDATE plan (admin only) ─────────────────────────────
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const existing = await prisma_1.prisma.pricingPlan.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Plan not found' });
            return;
        }
        const { tier, price, tagline, features, featured, ctaText, order, visible } = req.body;
        const plan = await prisma_1.prisma.pricingPlan.update({
            where: { id: req.params.id },
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
        });
        res.json({ success: true, data: plan });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update plan' });
    }
});
// ─── DELETE plan (admin only) ─────────────────────────────
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const existing = await prisma_1.prisma.pricingPlan.findUnique({
            where: { id: req.params.id },
        });
        if (!existing) {
            res.status(404).json({ success: false, error: 'Plan not found' });
            return;
        }
        await prisma_1.prisma.pricingPlan.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: 'Plan deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete plan' });
    }
});
exports.default = router;
