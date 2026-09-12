"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET all settings
router.get('/', async (req, res) => {
    try {
        const settings = await prisma_1.prisma.siteSettings.findMany();
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch settings' });
    }
});
// UPDATE / CREATE setting
router.post('/', auth_1.verifyToken, async (req, res) => {
    try {
        const { key, value } = req.body;
        const setting = await prisma_1.prisma.siteSettings.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
        res.json({ success: true, data: setting });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update setting' });
    }
});
exports.default = router;
