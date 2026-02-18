"use client"
import { PieChart, Pie, Tooltip } from "recharts";
import { Transaction } from "@/types/Transaction";
type CategoryPieChartProps = {
    transactions: Transaction[];
}

export function CategoryPieChart(props: CategoryPieChartProps) {
    const expenseData = props.transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
        const existing = acc.find((item) => item.name === transaction.category.name);
        if(existing) {
            existing.value += transaction.amount;
        } else {
            acc.push({ name: transaction.category.name, value: transaction.amount});
        }
        return acc;
    }, [] as {name: string; value: number }[]);

    return (
        <PieChart width={500} height={300}>
            <Pie data={expenseData} dataKey="value" nameKey="name" label />
            <Tooltip></Tooltip>
        </PieChart>
    )
}