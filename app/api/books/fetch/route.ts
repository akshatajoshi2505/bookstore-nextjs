import { connectDB } from '@/app/lib/dbConnect';
import Books from '@/app/models/Books';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(request: Request) {
    try {
        const { ids } = await request.json();
        const books = await Books.find({ _id: { $in: ids } });
        return NextResponse.json({ success: true, books });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}