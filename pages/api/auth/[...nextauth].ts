import NextAuth from 'next-auth';
import GithibProvider from 'next-auth/providers/github'
export const authOptions = {
    providers: [
        GithibProvider({
            clientId: process.env.GITGUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            httpOptions: {
                timeout: 100000
            }
        })
    ]
}
export default NextAuth(authOptions)