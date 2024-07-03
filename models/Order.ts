import mongoose, { Document, Model, Types } from 'mongoose';

interface IOrder extends Document {
    orderNumber: string; // Keeps orderNumber as a string
    customerName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    orderItems: Array<{ qty: number }>;
    orderStatus: string; // For order status
    isPaid: boolean; // To indicate if the order has been paid
}

const OrderSchema = new mongoose.Schema<IOrder>({
    orderNumber: { type: String}, // Keeps orderNumber as a string
    customerName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    orderItems: [{ qty: Number }],
    orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' }, // For order status
    isPaid: { type: Boolean, default: false }, // To indicate if the order has been paid
}, { timestamps: true });

OrderSchema.pre<IOrder>('save', async function(next) {
    const doc = this;

    if (!doc.isModified('orderNumber')) return next();

    try {
        let lastOrder = await mongoose.model<IOrder>('Order').findOne().sort({ orderNumber: -1 }).limit(1);
        if (lastOrder) {
            // Assuming 'ORD' is the prefix, replace 'ORD' with your actual prefix
            const numericPart = parseInt(lastOrder.orderNumber.replace('ORD', ''), 10);
            doc.orderNumber = `ORD${numericPart + 1}`; // Replace 'ORD' with your actual prefix
        } else {
            doc.orderNumber = `ORD1`; // Replace 'ORD' with your actual prefix
        }
    } catch (error) {
        console.error(error);
        next(error as Error);
    }
});




export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
