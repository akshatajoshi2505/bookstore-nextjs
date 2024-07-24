import { connectDB } from '@/app/lib/dbConnect';
import Books,{ IBook } from '@/app/models/Books';
import { NextResponse } from 'next/server';


connectDB();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (id && id !== 'books') {
        // Handle GET request for a specific book
        try {
            const book = await Books.findById(id);
            if (!book) {
                return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: book });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
    } else {
        // Handle GET request for all books
        const countOnly = url.searchParams.get('countOnly');
        try {
            if (countOnly === 'true') {
                const totalBooks = await Books.countDocuments();
                return NextResponse.json({ success: true, data: { totalBooks } });
            } else {
                const books = await Books.find({});
                return NextResponse.json({ success: true, data: books });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
    }
}

export async function POST(request: Request) {
    try {
        const book: IBook = await request.json();
        const newBook = await Books.create(book);
        return NextResponse.json({ success: true, data: newBook }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id || id === 'books') {
        return NextResponse.json({ success: false, message: 'Invalid book ID' }, { status: 400 });
    }

    try {
        const book = await request.json();
        const updatedBook = await Books.findByIdAndUpdate(id, book, { new: true, runValidators: true });
        if (!updatedBook) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedBook });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id || id === 'books') {
        return NextResponse.json({ success: false, message: 'Invalid book ID' }, { status: 400 });
    }

    try {
        const deletedBook = await Books.deleteOne({ _id: id });
        if (!deletedBook) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
