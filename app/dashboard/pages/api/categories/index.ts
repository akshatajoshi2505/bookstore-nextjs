// Import your database connection setup and Category model
import { connectDB } from '@/app/lib/dbConnect'; // Adjust the import path as necessary
import Category from '@/app/models/Categories';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(request: NextRequest) {
    try {
        // Fetch all categories from the database
        const categoriesDB = await Category.find({}).populate('books');
        if (!categoriesDB) {
            console.log("No categories found");
            return NextResponse.json({ message: 'No categories found' }, { status: 404 });
        }
        console.log('Fetched categories:', categoriesDB); // Log the fetched data
        return NextResponse.json({
            message: 'Categories fetched successfully',
            success: true,
            categories: categoriesDB,
        });
    } catch (error: any) {
        console.error('Error fetching categories:', error); // Log any errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, books } = reqBody; // Assume 'books' is an array of book IDs

        // Create a new category in the database
        const newCategory = await Category.create({
            name: name,
            books: books,
        });

        return NextResponse.json({
            message: 'Category created successfully',
            success: true,
            category: newCategory,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
