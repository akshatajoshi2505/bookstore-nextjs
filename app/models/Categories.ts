import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    _id: string;
    name: string;
    books: mongoose.Types.ObjectId[]; // Array of book ISBNs as strings
}


const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    books: [{ type: mongoose.Types.ObjectId, ref: 'Books' }], // Reference to Books model
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
