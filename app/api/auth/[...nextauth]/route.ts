import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "メールアドレス", type: "email"},
                password: { label: "パスワード", type: "password"},
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    return null;
                }

                const findEmailResult = await prisma.user.findUnique({ where: {email} })

                if (findEmailResult === null) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(password, findEmailResult.password);
                if (!isPasswordValid) {
                    return null;
                }

                return { id: findEmailResult.id, email: findEmailResult.email, name: findEmailResult.name};
            }
        })
    ]
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };