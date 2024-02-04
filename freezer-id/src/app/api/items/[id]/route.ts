import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"

import { authOptions } from '@/app/lib/auth'

const prisma = new PrismaClient()


export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (session) {
        // await prisma.item.delete({
        //     where: { id: parseInt(params.id), AND: [{ user_id: session?.user.id }] }
        // })
        const currentDateTime = new Date()
        await prisma.item.update({
            where: { id: parseInt(params.id), AND: [{ user_id: session?.user.id }] },
            data: {
                removed: currentDateTime
            }
        })
        return Response.json(`Successfully deleted item with id; ${params.id}`)
    } else {
        return Response.json(`Unable to delete item with id; ${params.id}`)
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (session) {
        const { name, description, identifier, shelf, servings } = await request.json()
        const currentDateTime = new Date()
        const item = await prisma.item.update({
            where: { id: parseInt(params.id), AND: [{ user_id: session?.user.id }] },
            data: {
                item_id: identifier,
                name: name,
                description: description,
                shelf: shelf,
                servings: servings,
                modified: currentDateTime
            }
        })
        return Response.json(item)
    } else {
        return Response.json(`Unable to update item with id; ${params.id}`)
    }
}