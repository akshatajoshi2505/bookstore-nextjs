// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'  // Assuming you have a Book model
  }]
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
