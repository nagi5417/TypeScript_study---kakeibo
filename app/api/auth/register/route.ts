import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const hashPassword = await bcrypt.hash(body.password, 10)
    const registerData = await prisma.user.create({
        data: {
            email: body.email,
            password: hashPassword,
            name: body.name,
        }}
    )
    return NextResponse.json({ id: registerData.id, email: registerData.email, name: registerData.name }, {status: 201});


}