import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/app/lib/auth'
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    return Response.json("hello world")
}