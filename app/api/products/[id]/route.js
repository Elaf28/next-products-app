import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params; 

        const product = await Product.findById(id);
        if (!product) {
        return NextResponse.json(
            { message: 'Product not found' },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { message: 'Product Found Successfully', data: product },
        { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
        { message: 'Failed to fetch Product', error: error.message },
        { status: 500 }
        );
    }
}