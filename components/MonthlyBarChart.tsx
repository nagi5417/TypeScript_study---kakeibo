"use client"
import { Transaction } from "@/types/Transaction"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

type MonthlyBarChartProps = {
    transactions : Transaction[],
}

export function MonthlyBarChart(props: MonthlyBarChartProps) {

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

    return (
        <BarChart width={500} height={300} data={monthlyData}>
            <XAxis dataKey={"month"}/>
            <YAxis></YAxis>
            <Bar dataKey={"income"} fill="green"></Bar>
            <Bar dataKey={"expense"} fill="red"></Bar>
            <Tooltip></Tooltip>
        </BarChart>
    )

}