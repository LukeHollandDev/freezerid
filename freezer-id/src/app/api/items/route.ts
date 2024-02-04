import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"

import { authOptions } from '@/app/lib/auth'

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

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    const { name, description, identifier, shelf, servings } = await request.json()
    if (session) {
        const currentDateTime = new Date()
        const item = await prisma.item.create({
            data: {
                name: name,
                description: description,
                item_id: identifier,
                shelf: shelf,
                servings: servings,
                added: currentDateTime,
                user_id: session.user.id
            }
        })
        return Response.json(item)
    } else {
        return Response.json({})
    }
}