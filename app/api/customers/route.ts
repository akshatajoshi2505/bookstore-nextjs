import { connectDB } from '@/app/lib/dbConnect'; // Adjust the import path as necessary
import Customer from '@/models/Customer';
import { NextRequest, NextResponse } from 'next/server';

connectDB();


export async function GET(request: NextRequest) {
    try {
        const customers = await Customer.find({});
        return NextResponse.json({
            message: 'Customers fetched successfully',
            success: true,
            customers,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email } = reqBody;

        const newCustomer = await Customer.create({
            name,
            email,
        });

        return NextResponse.json({
            message: 'Customer created successfully',
            success: true,
            customer: newCustomer,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        await Customer.findByIdAndDelete(id);
        return NextResponse.json({
            message: 'Customer deleted successfully',
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { id, name, email } = await request.json();
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, email }, { new: true });
        return NextResponse.json({
            message: 'Customer updated successfully',
            success: true,
            customer: updatedCustomer,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
