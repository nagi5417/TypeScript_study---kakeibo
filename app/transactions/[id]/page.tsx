"use client";
import { Transaction } from "../../../types/Transaction";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TransactionDetailPage() {
  const params = useParams();
  const [transactionData, setTransactionData] = useState<Transaction | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/transactions/${params.id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("取引データの取得に失敗しました。");
        }

        const transactionData = await response.json();
        setTransactionData(transactionData);
      } catch (err) {
        alert(err instanceof Error ? err.message : "エラーが発生しました。");
      }
    };
    fetchData();
  }, []);

  if (transactionData === null) {
    return <p>読み込み中...</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">取引詳細</h1>
        <p className="mb-2">
          <span className="font-bold">日付：</span>
          {new Date(transactionData.date).toLocaleString("ja-JP")} 
        </p>
        <p className="mb-2">
          <span className="font-bold">タイトル：</span>
          {transactionData.title}
        </p>
        <p className="mb-2">
          <span className="font-bold">カテゴリ：</span>
          {transactionData.category.name}
        </p>
        <p className="mb-2">
          <span className="font-bold">金額：</span>
          {transactionData.amount.toLocaleString()}円
        </p>
        <p className="mb-2">
          <span className="font-bold">メモ：</span>
          {transactionData.memo}
        </p>
        <Link href="/transactions" className="text-blue-600 font-bold hover:text-blue-700">一覧へ戻る</Link>
      </div>
    </main>
  );
}
