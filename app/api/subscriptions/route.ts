import { connectDB } from '@/app/lib/dbConnect'; // Adjust the import path as necessary
import Subscription from '@/models/Subscription';
import { NextRequest, NextResponse } from 'next/server';


connectDB();


export async function GET(request: Request) {
    
        // Handle GET request for all books
        try {
            const subscriptions = await Subscription.find({});
            return NextResponse.json({ success: true, data: subscriptions });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
   

}

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { title, duration, amount, status } = reqBody;

        const newSubscription = await Subscription.create({
            title: title,
            duration: duration,
            amount: amount,
            status: status,
        });

        return NextResponse.json({
        message: 'Subscription created successfully',
        success: true,
        order: newSubscription,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




