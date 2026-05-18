import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        { message: "Welcome to My Store"},
        { status: 200 }
    );
}