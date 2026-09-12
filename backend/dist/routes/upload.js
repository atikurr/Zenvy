"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const s3_1 = require("../lib/s3");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/', auth_1.verifyToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, error: 'No file uploaded' });
            return;
        }
        const url = await (0, s3_1.uploadToS3)(req.file, 'uploads');
        res.json({
            success: true,
            url,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
});
exports.default = router;
