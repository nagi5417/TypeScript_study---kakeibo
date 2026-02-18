"use client"
import { Transaction } from "../types/Transaction"
import { useState } from "react"
import { CategoryBadge } from "./CategoryBadge"
import Link from "next/link";

type TransactionItemProps = {
    transaction: Transaction;
    onDeleteTransaction: (id: string) => void;
    onUpdateTransaction: (id: string, title: string, amount: number) => void;
}

export function TransactionItem(transactionItem: TransactionItemProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(transactionItem.transaction.title);
    const [editAmount, setEditAmount] = useState<number>(transactionItem.transaction.amount);

    return (
        <>
        {isEditing ? (
            <tr className="even:bg-gray-50">
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"><input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2 text-right"><input type="number" value={editAmount} onChange={(e) => setEditAmount(Number(e.target.value))} /></td>
                <td className="px-4 py-2">
                    <button onClick={() => {
                        transactionItem.onUpdateTransaction(transactionItem.transaction.id, editTitle, editAmount)
                        setIsEditing(false)
                    }} className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600">保存</button>
                    <button onClick={() => {
                        setEditTitle(transactionItem.transaction.title)
                        setEditAmount(transactionItem.transaction.amount)
                        setIsEditing(false)}} className="bg-gray-500 text-white rounded px-3 py-1 hover:bg-gray-600">キャンセル
                    </button>
                </td>
            </tr>
        ) : (
            <tr className="even:bg-gray-50">
                <td className="px-4 py-2">{
                 new Date(transactionItem.transaction.date).toLocaleDateString()}</td>
                <td className="px-4 py-2"><Link href={`/transactions/${transactionItem.transaction.id}`}>{transactionItem.transaction.title}</Link></td>
                <td className="px-4 py-2"><CategoryBadge category={transactionItem.transaction.category.name} /></td>
                <td className={`px-4 py-2 text-right ${transactionItem.transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>{transactionItem.transaction.amount.toLocaleString()}円</td>
                <td className="px-4 py-2">
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white rounded px-3 py-1 hover:bg-yellow-600" >編集</button>
                    <button onClick={() =>
                        transactionItem.onDeleteTransaction(transactionItem.transaction.id)
                    } className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600">削除</button>
                </td>
            </tr>
        )}
        </>
    )
}