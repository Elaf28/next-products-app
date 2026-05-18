import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        const allProducts = await Product.find({}).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                message: 'Products Retrieved Successfully',
                data: allProducts
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Failed to fetch Products',
                error: error.message
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();

        const newProduct = await Product.create(body);

        return NextResponse.json(
            {
                message: 'Product created Successfully',
                data: newProduct
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Failed to Create Product',
                error: error.message
            },
            { status: 500 }
        );
    }
}