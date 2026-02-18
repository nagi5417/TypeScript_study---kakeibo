"use client"
import { useEffect, useState } from "react"
import { Transaction } from "../types/Transaction";
import { Category } from "../types/category";
type TransactionFormProps = {
    onAddTransaction: (transaction: Transaction) => void;
}

export function TransactionForm(props: TransactionFormProps) {
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [type, setType] = useState<"income" | "expense">("expense");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [memo, setMemo] = useState<string>("");

    useEffect(() => {
        const fetchCategory = async() => {
            const response = await fetch("/api/categories");
            const data = await response.json();
            setCategories(data);
        }
        fetchCategory();
    }, [])

    const handleSubmit = async(e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (title.trim() === "") {
            alert("タイトルが入力されていません。")
            return;
        }

        if (amount.trim() === "" || amount.trim() === "0") {
            alert("金額が入力されていません。")
            return;
        }

        if (categoryId.trim() === "") {
            alert("カテゴリが選択されていません。")
            return;
        }

        if (date.trim() === "") {
            alert("日付が入力されていません。")
            return;
        }

        const response = await fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, amount: Number(amount), type, categoryId, date, memo}),
        });
        const newTransaction = await response.json();
        props.onAddTransaction(newTransaction);

        setTitle("");
        setAmount("");
        setType("expense");
        setCategoryId("");
        setDate("");
        setMemo("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6" >
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                <option value="expense">支出</option>
                <option value="income">収入</option>
            </select>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                <option value="">選択してください</option>
                {categories.map((categoryItem) =>(
                    <option value={categoryItem.id} key={categoryItem.id}>{categoryItem.name}</option>
                ))}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600" >追加</button>
        </form>
    )
}