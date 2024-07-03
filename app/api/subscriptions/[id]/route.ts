import { connectDB } from '@/app/lib/dbConnect'; // Adjust the import path as necessary
import Subscription from '@/models/Subscription';
import { NextRequest, NextResponse } from 'next/server';


connectDB();


export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    // console.log("IDDD"+id);
    if (id && id !== 'subscriptions') {
        // Handle GET request for a specific book
        try {
            const subscription = await Subscription.findById(id);
            if (!subscription) {
                return NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: subscription });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
    } else {
        // Handle GET request for all books
        try {
            const subscriptions = await Subscription.find({});
            return NextResponse.json({ success: true, data: subscriptions });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
    }
    return NextResponse.json({ success: false, message: 'Method Not Allowed' });

}


export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    // console.log("PUT" + id);
    if (!id || id === 'subscription') {
        return NextResponse.json({ success: false, message: 'Invalid subscription ID' }, { status: 400 });
    }

    try {
        const subscription = await request.json();
        const updatedSubscription = await Subscription.findByIdAndUpdate(id, subscription, { new: true, runValidators: true });
        if (!updatedSubscription) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedSubscription });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
     console.log("DELETE" + id);
    if (!id || id === 'subscription') {
        return NextResponse.json({ success: false, message: 'Invalid subscription ID' }, { status: 400 });
    }

    try {
        const deletedSubscription = await Subscription.findByIdAndDelete(id);
        console.log("IF deleted" + deletedSubscription);
        return NextResponse.json({
        message: 'Subscription deleted successfully',
        success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
