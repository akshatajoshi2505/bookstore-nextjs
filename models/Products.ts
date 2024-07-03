import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    publicationDate: { type: String, required: true },
    isbn: { type: String, required: true },
    imageURL: { type: String, required: true },



}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', BookSchema);

