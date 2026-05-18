import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import User from '@/models/User';

import { verifyToken } from '@/lib/token';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        },
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        {
          message: 'Invalid token',
        },
        {
          status: 401,
        },
      );
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: 'Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
