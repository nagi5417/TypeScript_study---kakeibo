import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request
) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (year === null || month === null) {
        return NextResponse.json({message: "Not Found"}, { status: 404 })
    }

    const transactions = await prisma.transaction.findMany(
        {
            where: {
            date: {
                gte: new Date(Number(year), Number(month) -1, 1),
                lt:  new Date(Number(year), Number(month), 1),
            }
        }}
    )
    const incomeItems = transactions.filter((transaction) => transaction.type === "income");
    const totalIncome = incomeItems.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    const expenseItems = transactions.filter((transaction) => transaction.type === "expense");
    const totalExpense = expenseItems.reduce((sum, expenseItem) => sum + expenseItem.amount, 0);
    const balance = totalIncome - totalExpense;
    const totalCategoryAmount = transactions.reduce((group, transaction) => {
        if (!group[transaction.categoryId]) {
            group[transaction.categoryId] = 0
        };

        group[transaction.categoryId] += transaction.amount;
        return group;
    }, {} as { [key: string]: number })
    return NextResponse.json(
        {
            totalIncome,
            totalExpense,
            balance,
            totalCategoryAmount,
        },
        {status: 200}
    )
}