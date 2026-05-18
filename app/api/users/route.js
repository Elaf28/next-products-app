import User from '@/lib/models/User';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// Handle POST Request
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { username, email } = body;

    const newUser = await User.create({
      username: username,
      email: email,
    });

    return NextResponse.json(
      { message: 'User created Successfully', data: newUser },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to Create User', error: error },
      { status: 500 },
    );
  }
}

// Handle GET Request (Retrieve all users)
export async function GET() {
  try {
    await dbConnect();

    const allUsers = await User.find({});

    return NextResponse.json(
      { message: 'Users Retrieved Successfully', data: allUsers },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch Users', error: error },
      { status: 500 },
    );
  }
}

/*
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"username": "Hassan", "email": "hassan@gamil.com", "password":"123456elaf*"}'
*/

// Authentication (AuthN): Who are you ? Are you existed inside Database ?
// Authorization (AuthZ): Do you have Permission ? What can you access ?



// mongoose bcryptjs jsonwebtoken react-hook-form