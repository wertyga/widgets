import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
  },
  type: String,
  status: String,
  sum: Number,
}, { timestamps: true });

export const Payment = mongoose.model('payment', paymentSchema);
