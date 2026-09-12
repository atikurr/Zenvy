import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'

// Routes
import projectRoutes from './routes/projects'
import testimonialRoutes from './routes/testimonials'
import serviceRoutes from './routes/services'
import pricingRoutes from './routes/pricing'
import contactRoutes from './routes/contact'
import settingsRoutes from './routes/settings'
import uploadRoutes from './routes/upload'
import blogRoutes from './routes/blogs'

import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

// API Routes
app.use('/api/projects', projectRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/pricing', pricingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/blogs', blogRoutes) // ✅ ADD THIS

// Health check
app.get('/', (req, res) => {
  res.send('Zenvy Backend Running 🚀')
})

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})