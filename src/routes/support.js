import { Router } from 'express'
import { z } from 'zod'
import { SupportTicket } from '../models/SupportTicket.js'

const router = Router()

const schema = z.object({
	email: z.string().email(),
	subject: z.string().min(1),
	message: z.string().min(1),
})

router.post('/', async (req, res) => {
	const parsed = schema.safeParse(req.body)
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
	const doc = await SupportTicket.create(parsed.data)
	res.status(201).json({ id: doc._id })
})

router.get('/', async (_req, res) => {
	const list = await SupportTicket.find().sort({ createdAt: -1 }).limit(50)
	res.json(list)
})

export default router


