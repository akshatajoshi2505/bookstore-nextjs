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
        const { customerName, cardNumber, expiryDate, cvv } = reqBody;

        const newOrder = await Order.create({
            customerName: customerName,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
        });

        return NextResponse.json({
        message: 'Order created successfully',
        success: true,
        order: newOrder,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
