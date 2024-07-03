import { connectDB } from '@/app/lib/dbConnect';
import Order from '@/models/Order'; // Assuming you have an Order model similar to the Books model
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Ensure the database connection is established
connectDB();

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, message: 'Invalid order ID' }, { status: 400 });
    }

    try {
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: order });
    } catch (error) {
        const message = error instanceof Error? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, message: 'Invalid order ID' }, { status: 400 });
    }

    try {
        const requestBody = await request.json(); // Parse the request body as JSON
        const updatedOrderStatus = requestBody.orderStatus; // Extract the orderStatus from the parsed JSON

        if (!updatedOrderStatus) {
            return NextResponse.json({ success: false, message: 'Order status not provided' }, { status: 400 });
        }

        const order = await Order.findByIdAndUpdate(id, { orderStatus: updatedOrderStatus }, { new: true, runValidators: true });
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: order });
    } catch (error) {
        const message = error instanceof Error? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
