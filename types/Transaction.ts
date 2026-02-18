import { Category } from "./category";

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: "income" | "expense";
    category: Category;
    date: string;
    memo?:string;
}