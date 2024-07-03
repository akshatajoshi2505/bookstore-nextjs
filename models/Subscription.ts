import { Double } from 'mongodb';
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: false
  }
});

// Create a model
export default mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
