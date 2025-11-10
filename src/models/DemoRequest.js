import mongoose from 'mongoose'

const DemoRequestSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		company: { type: String },
		message: { type: String },
	},
	{ timestamps: true }
)

export const DemoRequest = mongoose.model('DemoRequest', DemoRequestSchema)



