"use client"
import { useState, useEffect } from "react";
import { TransactionList } from "../../components/TransactionList";
import { TransactionForm } from "../../components/TransactionForm";
import { Transaction } from "../../types/Transaction";

export default function TransactionsPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<Transaction[]> ([])
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [searchText, setSearchText] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("all");
    const filteredTransactions = transactions
        .filter((transaction) => transaction.title.includes(searchText))
        .filter((transaction) => filterType === "all" || transaction.type === filterType);
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.date > b.date ? 1 : -1;
        } else {
          return b.date > a.date ? 1 : -1;
        }});

    useEffect(() => {
        const fetchData = async() => {
            try {
            setIsLoading(true);
            const response = await fetch("/api/transactions");
            if (!response.ok) {
                throw new Error("取引データの取得に失敗しました");
            }

            const data = await response.json();
            setTransactions(data);
            } catch (err) {
            alert(err instanceof Error ? err.message : "エラーが発生しました。");
            } finally {
            setIsLoading(false);
            }};
        fetchData();
        }, []);

    const onDeleteTransaction = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/transactions/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("取引の削除に失敗しました");
        }

        setTransactions(transactions.filter((transaction: Transaction) => (transaction.id !== id)))
        } catch (err) {
            alert(err instanceof Error ? err.message : "エラーが発生しました。");

        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateTransaction = async (id: string, newTitle: string, newAmount: number) => {
        try {
        setIsLoading(true);
            const response = await fetch(`/api/transactions/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, amount: Number(newAmount)}),
            })

            if (!response.ok) {
            throw new Error("取引の更新に失敗しました");
            }

        setTransactions(transactions.map((transaction) => (
            transaction.id === id ? ({...transaction, title: newTitle, amount: Number(newAmount)}) : (transaction)
        )))
        } catch (err) {
        alert(err instanceof Error ? err.message : "エラーが発生しました。");

        } finally {
        setIsLoading(false);
        }
    }

    return (
        <main className="max-w-4xl mx-auto p-6">
            <div className="bg-gray rounded-lg shadow p-4 mb-15">
                <h2 className="text-lg font-bold mb-2">取引追加</h2>
                <TransactionForm onAddTransaction={
                    (newTransaction: Transaction) => {
                    setTransactions([...transactions, newTransaction]);
                    }
                }/>
            </div>
            <div className="flex gap-4 mb-4">
                <input className="border rounded p-2 flex-1"  type="text" value={searchText} onChange={(e) => (setSearchText(e.target.value))} />
                <select  className="border rounded p-2" value={filterType} onChange={(e) => (setFilterType(e.target.value))}>
                    <option value="all">全て</option>
                    <option value="income">収入のみ</option>
                    <option value="expense">支出のみ</option>
                </select>
                <button className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600" onClick={() =>
                    sortOrder === "asc"? setSortOrder("desc") : setSortOrder("asc")
                }>{
                    sortOrder === "asc"? "古い順" : "新しい順"
                }</button>
            </div>
            

            {isLoading ? (<p>読み込み中...</p>) : (
                <TransactionList
                transactions={sortedTransactions}
                onUpdateTransaction={onUpdateTransaction}
                onDeleteTransaction={onDeleteTransaction}
                />
            )}
        </main>
    )
}