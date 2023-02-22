import NextAuth, { AuthOptions } from 'next-auth';
import GithibProvider from 'next-auth/providers/github'
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import jwt from "jsonwebtoken"
export const authOptions = {
    providers: [
        GithibProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            httpOptions: {
                timeout: 10000
            }
        }),

    ],
    // adapter: SupabaseAdapter({

    //     url: process.env.SUPABASE_URL!,
    //     secret: process.env.SUPABASE_SECRET_KEY!,
    // }),
    // session: {

    // },
    // callbacks: {
    //     async session({ session, user }) {
    //         const signature = process.env.SUPABASE_JWT_SECRET!;
    //         if (signature) {
    //             const payload = {
    //                 aud: "authenticated",
    //                 exp: Math.floor(new Date(session.expires).getTime() / 1000),
    //                 sub: user.id,
    //                 email: user.email,
    //                 role: "authenticated",
    //             }
    //             session.supabaseAccessToken = jwt.sign(payload, signature)
    //         }
    //         return session
    //     }
    // }
} as AuthOptions;
export default NextAuth(authOptions)