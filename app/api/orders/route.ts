import { connectDB } from '@/app/lib/dbConnect'; // Adjust the import path as necessary
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(request: NextRequest) {
    try {
        const ordersDB = await Order.find({});
        return NextResponse.json({
            message: 'Orders fetched successfully',
            success: true,
            orders: ordersDB,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {_id,  customerName, cardNumber, expiryDate, cvv, orderItems } = reqBody;
        // Mask the cardNumber except for the first 4 and last 4 digits
        const maskedCardNumber = cardNumber.replace(/(\d{4})(.*?)(\d{4})/, '$1********$3');

        // Ensure orderItems is an array
        if (!Array.isArray(orderItems)) {
            throw new Error('orderItems must be an array');
        }

        // Create the order with the provided information, relying on the schema's default values for orderStatus and isPaid
        const newOrder = await Order.create({
            _id : _id,
            customerName: customerName,
            cardNumber: maskedCardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            orderItems: orderItems.map(item => ({ qty: item.qty })),
            // Explicitly setting orderStatus and isPaid here, though it's optional due to default values
            orderStatus: 'Pending', // Example of setting orderStatus explicitly, though not necessary
            isPaid: true, // Example of setting isPaid explicitly, though not necessary
        });

        // Retrieve the newly created order to include the generated orderNumber in the response
        const finalOrder = await Order.findById(newOrder._id).select('-__v'); // Exclude __v from the response
        return NextResponse.json({
            message: 'Order created successfully',
            success: true,
            order: finalOrder,
            orderId: newOrder._id, // Include the generated orderNumber in the response
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, customerName, cardNumber, expiryDate, cvv, orderItems } = reqBody;

        // Optional: Mask the cardNumber except for the first 4 and last 4 digits
        const maskedCardNumber = cardNumber.replace(/(\d{4})(.*?)(\d{4})/, '$1********$3');

        // Find the order by _id and update it
        const updatedOrder = await Order.findByIdAndUpdate(
            _id,
            {
                $set: {
                    customerName: customerName || undefined, // Use MongoDB's $set operator to update specific fields
                    cardNumber: maskedCardNumber,
                    expiryDate: expiryDate,
                    cvv: cvv,
                    orderItems: orderItems.map((item: { qty: any; }) => ({ qty: item.qty })),
                    // Explicitly setting orderStatus and isPaid here, though it's optional due to default values
                    orderStatus: 'Pending', // Example of setting orderStatus explicitly, though not necessary
                    isPaid: true, // Example of setting isPaid explicitly, though not necessary
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Order updated successfully',
            success: true,
            order: updatedOrder,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
