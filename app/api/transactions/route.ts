import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const transactions = await prisma.transaction.findMany({
        include: { category : true },
        orderBy: { date: "desc" },
    })

    return NextResponse.json(transactions)
}

export async function POST(request: Request) {
    const body = await request.json();

    const transaction = await prisma.transaction.create({
        include: { category : true },
        data: {
            title: body.title,
            amount: body.amount,
            type: body.type,
            categoryId: body.categoryId,
            date: new Date(body.date),
            memo: body.memo,
        }
    })

    return NextResponse.json(transaction, {status: 201})
}