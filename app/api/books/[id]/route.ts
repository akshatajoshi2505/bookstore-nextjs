import { connectDB } from '../../../lib/dbConnect';
import Books, { IBook } from '../../../models/Books';
import Categories, { ICategory } from '../../../models/Categories';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Ensure the database connection is established
connectDB();

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (id) {
        try {
            const book = await Books.findById(id).populate('category'); // Populate category
            if (!book) {
                return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: book });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
    } else {
        try {
            const books = await Books.find({}).populate('category'); // Populate categories for all books
            return NextResponse.json({ success: true, data: books });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            return NextResponse.json({ success: false, message }, { status: 500 });
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        const book: IBook = await request.json();
        const newBook = await Books.create(book);
        // Update category to include this book
        if (book.category) {
            await Categories.findByIdAndUpdate(
                book.category,
                { $push: { books: newBook._id } },
                { new: true, useFindAndModify: false }
            );
        }
        return NextResponse.json({ success: true, data: newBook }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, message: 'Invalid book ID' }, { status: 400 });
    }

    try {
        const bookData = await request.json();
        const updatedBook = await Books.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
        if (!updatedBook) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedBook });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, message: 'Invalid book ID' }, { status: 400 });
    }

    try {
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
