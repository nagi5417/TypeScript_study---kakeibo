"use client"
import { Transaction } from "@/types/Transaction";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type BalanceLineChartProps = {
    transactions: Transaction[],
}

export function BalanceLineChart(props: BalanceLineChartProps) {
    const monthlyData = props.transactions.reduce((acc, transaction) => {
        const month = transaction.date.slice(0, 7);
        const existing = acc.find((item) => item.month === month);
        if(existing) {
            if (transaction.type === "income") {
                existing.income += transaction.amount;
            } else {
                existing.expense += transaction.amount;
            }
        } else {
            if (transaction.type === "income") {
                acc.push({ month: month, income: transaction.amount, expense: 0});
            } else {
                acc.push({ month: month, income: 0, expense: transaction.amount});
            }
        }
        return acc;
    }, [] as {month: string; income: number; expense: number; }[]);

    const monthlyBalanceData = monthlyData.reduce((acc, data) => {
        const balance = (data.income - data.expense) + (acc.length > 0 ? acc[acc.length - 1].balance : 0);
            acc.push({ month: data.month, balance: balance});
        return acc;
    }, [] as { month: string; balance: number; }[]);

    return (
        <>
            <LineChart data={monthlyBalanceData} width={500} height={300}>
                <XAxis  dataKey={"month"}/>
                <YAxis></YAxis>
                <Line dataKey={"balance"}></Line>
                <Tooltip></Tooltip>
            </LineChart>
        </>
    )
}