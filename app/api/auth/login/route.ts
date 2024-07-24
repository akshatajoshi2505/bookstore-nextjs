import { NextResponse } from 'next/server';
import {connectDB} from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';


export async function POST(request: Request) {
    connectDB();
    try {
        const { email, password } = await request.json();

        // Basic validation
        if (!email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Generate a token or send user details
        // For simplicity, just send a success message
        return NextResponse.json({ message: 'Login successful', userId: user._id }, { status: 200 });
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ message: 'Error logging in user' }, { status: 500 });
    }
}
