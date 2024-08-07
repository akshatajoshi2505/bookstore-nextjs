import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    description: string;
    price: number;
    publicationDate: Date;
    isbn: string;
    imageURL: string;
    category: mongoose.Types.ObjectId; // Add category field
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    publicationDate: { type: Date, required: true },
    isbn: { type: String, required: true },
    imageURL: { type: String, required: false },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true }, // Define the category field
});

const Books: Model<IBook> = mongoose.models.Books || mongoose.model<IBook>('Books', BookSchema);
export default Books;
export type { IBook };
