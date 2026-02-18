import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params : {id : string}},
) {
    const { id } = await params;
    const transaction = await prisma.transaction.findUnique({
        where : { id },
        include: { category : true },
    });

    if (transaction === null) {
        return NextResponse.json({message : "Not Found"}, {status : 404})
    }

    return NextResponse.json(transaction, {status: 200});
}

export async function PATCH(
    request: Request,
    { params }: { params : {id : string}},
) {
    const body = await request.json();
    const { id } = await params;

    const searchTransaction = await prisma.transaction.findUnique({
        where : { id },
    });

    if (searchTransaction === null) {
        return NextResponse.json({message : "Not Found"}, {status : 404})
    }

    const transaction = await prisma.transaction.update({
        where: { id },
        data: {...body}
    })

    return NextResponse.json(transaction, { status : 200 });
}

export async function DELETE(
    request: Request,
    { params }: { params : {id : string}},
) {
    const { id } = await params;

    const searchTransaction = await prisma.transaction.findUnique({
        where : { id },
    });

    if (searchTransaction === null) {
        return NextResponse.json({message : "Not Found"}, {status : 404})
    }

    await prisma.transaction.delete({
        where: { id },
    })

    return NextResponse.json({status: 200});
}