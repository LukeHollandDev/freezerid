import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, user }) {
            // update the session object to include user id
            return {
                ...session,
                user: { ...session.user, id: user.id }
            }

        }
    }
};