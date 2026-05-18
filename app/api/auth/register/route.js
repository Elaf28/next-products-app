import User from '@/lib/models/User';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already existed' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User Created', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error, ${error}` }, { status: 500 });
  }
}
