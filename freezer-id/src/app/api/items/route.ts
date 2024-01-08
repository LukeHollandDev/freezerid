import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/app/lib/auth'
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient()

export async function GET() {
    const session = await getServerSession(authOptions)
    if (session) {
        const items = await prisma.item.findMany({
            where: { user_id: session.user.id }
        })
        return Response.json(items)
    } else {
        return Response.json([])
    }
}