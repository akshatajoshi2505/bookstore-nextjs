import { connectDB } from '../../../lib/dbConnect';
import Books,{ IBook } from '../../../models/Books';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


// Ensure the database connection is established
connectDB();

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (id) {
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
        return NextResponse.json({ success: false, message: 'Book ID not provided' }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, message: 'Invalid book ID' }, { status: 400 });
    }

    try {
        const bookData = await request.formData();
        const updatedBook = {
            title: bookData.get('title'),
            description: bookData.get('description'),
            author: bookData.get('author'),
            price: bookData.get('price'),
            publicationDate: bookData.get('publicationDate'),
            isbn: bookData.get('isbn'),
            imageURL: bookData.get('imageURL') ? `/images/${bookData.get('imageURL')}` : undefined,
        };
    
        const book = await Books.findByIdAndUpdate(id, updatedBook, { new: true, runValidators: true });
        if (!book) {
          return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: book });
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
