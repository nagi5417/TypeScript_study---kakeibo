"use client"

type MonthPickerProps = {
    currentMonth: string,
    onChangeMonth: (month: string) => void,
}

export function MonthPicker(props: MonthPickerProps) {


    return (
        <>
            <button className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600" onClick={() => {
                const date = new Date(props.currentMonth + "-01");
                date.setMonth(date.getMonth() - 1);
                const newMonth = date.toISOString().slice(0, 7);
                props.onChangeMonth(newMonth);
            }}>前月</button>
            <span className="text-lg font-bold">{props.currentMonth}</span>
            <button className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600" onClick={() => {
                const date = new Date(props.currentMonth + "-01");
                date.setMonth(date.getMonth() + 1);
                const newMonth = date.toISOString().slice(0, 7);
                props.onChangeMonth(newMonth);
            }}>次月</button>
        </>
        
    )
}