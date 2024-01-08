import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"

import { authOptions } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)

    await prisma.item.delete({
        where: { id: parseInt(params.id), AND: [{ user_id: session?.user.id }] }
    })

    return Response.json(`Delete route was called for item; ${params.id}`)
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)

    const { name, description, identifier } = await request.json()

    const item = await prisma.item.update({
        where: { id: parseInt(params.id), AND: [{ user_id: session?.user.id }] },
        data: {
            item_id: identifier,
            name: name,
            description: description
        }
    })

    return Response.json(item)
}