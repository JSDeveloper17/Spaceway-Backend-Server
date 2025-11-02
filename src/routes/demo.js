import { Router } from 'express'
import { z } from 'zod'
import { DemoRequest } from '../models/DemoRequest.js'

const router = Router()

const schema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	company: z.string().optional(),
	message: z.string().optional(),
})

router.post('/', async (req, res) => {
	const parsed = schema.safeParse(req.body)
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
	const doc = await DemoRequest.create(parsed.data)
	res.status(201).json({ id: doc._id })
})

router.get('/', async (_req, res) => {
	const list = await DemoRequest.find().sort({ createdAt: -1 }).limit(50)
	res.json(list)
})

export default router


