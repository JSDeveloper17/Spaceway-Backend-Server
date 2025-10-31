import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { connectDb } from './lib/db.js'
import demoRoutes from './routes/demo.js'
import supportRoutes from './routes/support.js'

const app = express()

const PORT = process.env.PORT || 4000
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: ORIGIN, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('tiny'))
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 300,
		standardHeaders: true,
		legacyHeaders: false,
	})
)

app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok', uptime: process.uptime() })
})

app.use('/api/demo', demoRoutes)
app.use('/api/support', supportRoutes)

connectDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`API listening on http://localhost:${PORT}`)
		})
	})
	.catch((err) => {
		console.error('Failed to connect DB:', err)
		process.exit(1)
	})
