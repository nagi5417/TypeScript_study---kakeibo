"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function UserRegisterPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async() => {
        await fetch("/api/auth/register",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email, password, name})
        })
        router.push("/login");
    }

    return (
        <form className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <h1 className="text-2xl font-bold mb-6 text-center">ユーザー登録</h1>
            <p>メールアドレス</p>
            <input className="w-full border rounded p-2 mb-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>パスワード</p>
            <input className="w-full border rounded p-2 mb-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>ユーザーネーム</p>
            <input className="w-full border rounded p-2 mb-4" type="password" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600" type="submit">登録</button>
        </form>
    )
}