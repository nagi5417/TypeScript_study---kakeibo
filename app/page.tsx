"use client"
import { Transaction } from "../types/Transaction";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { MonthlyBarChart } from "@/components/MonthlyBarChart";
import { BalanceLineChart } from "@/components/BalanceLineChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MonthPicker } from "@/components/MonthPicker";

export default function Home() {
  const title = "家計簿アプリ";
  const comment = "あなたの収支を管理するアプリです"
  const [transactions, setTransactions] = useState<Transaction[]> ([])
  const [currentMonth, setCurrentMonth] = useState<string>("2026-02");
  const filteredTransactions = transactions.filter((transaction) => transaction.date.slice(0, 7) === currentMonth);
  const incomeItems = filteredTransactions.filter((transaction) => transaction.type === "income");
  const totalIncome = incomeItems.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
  const expenseItems = filteredTransactions.filter((transaction) => transaction.type === "expense");
  const totalExpense = expenseItems.reduce((sum, expenseItem) => sum + expenseItem.amount, 0);
  const balance = totalIncome - totalExpense;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  

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

  if (status === "loading") {
    return <p>読み込み中</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <p className="text-xl font-bold mb-4">{session?.user?.name}さん、こんにちは</p>
      {isLoading ? (<p>読み込み中...</p>) : (
        <Header
        title={title}
        comment={comment}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        />
      )}
      <div className="flex items-center justify-center gap-4 my-4">
        <MonthPicker currentMonth={currentMonth} onChangeMonth={setCurrentMonth}/>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">カテゴリ別支出</h2>
        <CategoryPieChart transactions={filteredTransactions}/>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">月別収支</h2>
        <MonthlyBarChart transactions={filteredTransactions}/>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">残高推移</h2>
        <BalanceLineChart transactions={filteredTransactions}/>
      </div>
    </main>
  );
}
