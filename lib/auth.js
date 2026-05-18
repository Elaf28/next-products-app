import { cookies } from 'next/headers';


import { verifyToken } from './token';
import dbConnect from './mongodb';
import User from './models/User';

export async function getCurrentUser() {
  try {
    await dbConnect();

    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return null;
    }

    const user = await User.findById(decoded.userId).select('-password');

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
}
