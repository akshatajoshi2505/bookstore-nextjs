// Import your database connection setup and Category model
import { connectDB } from '@/app/lib/dbConnect'; // Adjust the import path as necessary
import Category from '@/app/models/Categories';
import Books from '@/app/models/Books';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(request: NextRequest) {
    try {
        // Fetch all categories from the database
        const categories = await Category.find({});
        
        return NextResponse.json({
            message: 'Categories fetched successfully',
            success: true,
            categories,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const categoryData = await request.json();
        const newCategory = new Category({
            name: categoryData.name,
            books: categoryData.books,
        });

        await newCategory.save();
        return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, message: 'Invalid category ID' }, { status: 400 });
    }

    try {
        const categoryData = await request.json();
        const updatedCategory = {
            name: categoryData.name,
            books: categoryData.books,
        };

        const category = await Category.findByIdAndUpdate(id, updatedCategory, { new: true, runValidators: true });
        if (!category) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: category });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id || id === 'categories') {
        return NextResponse.json({ success: false, message: 'Invalid category ID' }, { status: 400 });
    }

    try {
        const deletedCategory = await Category.deleteOne({ _id: id });
        if (!deletedCategory) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
