"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async() => {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        if(result?.ok) {
            router.push("/");
        } else {
            alert("ログインに失敗しました");
        }
    }

    return (
        <form className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow p-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
            <p>メールアドレス</p>
            <input className="w-full border rounded p-2 mb-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>パスワード</p>
            <input className="w-full border rounded p-2 mb-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600" type="submit">ログイン</button>
        </form>
    )
}
