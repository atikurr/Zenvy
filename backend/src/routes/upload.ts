import { Router, Response } from 'express'
import multer from 'multer'
import { uploadToS3 } from '../lib/s3'
import { verifyToken, AuthRequest } from '../middleware/auth'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post(
  '/',
  verifyToken,
  upload.single('file'),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: 'No file uploaded' })
        return
      }

      const url = await uploadToS3(req.file, 'uploads')

      res.json({
        success: true,
        url,
      })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Upload failed' })
    }
  }
)

export default router