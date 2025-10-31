import mongoose from 'mongoose'

const SupportTicketSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		subject: { type: String, required: true },
		message: { type: String, required: true },
		status: { type: String, enum: ['open', 'closed'], default: 'open' },
	},
	{ timestamps: true }
)

export const SupportTicket = mongoose.model('SupportTicket', SupportTicketSchema)

