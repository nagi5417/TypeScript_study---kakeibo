import { TransactionItem } from "./TransactionItem"
import { Transaction } from "../types/Transaction"

type TransactionListProps = {
    transactions: Transaction[];
    onUpdateTransaction: (id: string, title: string, amount: number) => void;
    onDeleteTransaction: (id: string) => void;
}

export function TransactionList(transactionList: TransactionListProps) {

    return (
        <table className="w-full">
            <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className="px-4 py-2">日付</th>
                        <th className="px-4 py-2">タイトル</th>
                        <th className="px-4 py-2">カテゴリ</th>
                        <th className="px-4 py-2">金額</th>
                        <th className="px-4 py-2">操作</th>
                    </tr>
            </thead>
            <tbody>
                {transactionList.transactions.map((transaction) => (
                    <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onUpdateTransaction={transactionList.onUpdateTransaction}
                    onDeleteTransaction={transactionList.onDeleteTransaction}
                    />
                ))}
            </tbody>
        </table>
    )
}