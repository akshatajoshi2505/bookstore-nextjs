import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';
import {connectDB} from '@/app/lib/dbConnect';

export async function POST(request: Request) {
  await connectDB(); // Ensure the connection is established before handling the request
  try {
    const { username, email, password } = await request.json();
    console.log("Received payload:", { username, email, password });

    // Check if username, email, and password are provided
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
