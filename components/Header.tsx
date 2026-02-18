type HeaderProps = {
    title: string;
    comment: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export function Header(headerItems: HeaderProps) {

    return (
        <header>
            <h1 className="text-2xl font-bold text-gray-800">{headerItems.title}</h1>
            <p className="text-gray-500 mb-4">{headerItems.comment}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4 text-green-600">{headerItems.totalIncome.toLocaleString()}</div>
                <div className="bg-white rounded-lg shadow p-4 text-red-600">{headerItems.totalExpense.toLocaleString()}</div>
                <div className={`bg-white rounded-lg shadow p-4 ${headerItems.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    <span>
                        { headerItems.balance >= 0? "黒字" : "赤字" }: { Math.abs(headerItems.balance).toLocaleString() }円
                    </span>
                </div>
            </div>
        </header>
    )

}