import mongoose from 'mongoose'

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
      min: 0,
    },
    spent: {
      type: Number,
      default: 0,
      min: 0,
    },
    month: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Budget', budgetSchema)
