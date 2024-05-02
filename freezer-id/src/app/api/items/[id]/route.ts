import {PrismaClient} from '@prisma/client'
import {getServerSession} from "next-auth/next"

import {authOptions} from '@/app/lib/auth'

const prisma = new PrismaClient()


export async function DELETE(
    request: Request,
    {params}: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (session) {
        const currentDateTime = new Date()
        const item = await prisma.item.update({
            where: {id: parseInt(params.id), AND: [{user_id: session?.user.id}]},
            data: {
                removed: currentDateTime
            }
        })
        return Response.json(item)
    } else {
        return Response.json(`Unable to delete item with id; ${params.id}`)
    }
}

export async function PUT(
    request: Request,
    {params}: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (session) {
        const {name, description, identifier, shelf, servings} = await request.json()
        const currentDateTime = new Date()

        // obtain list of sharer ids with this user
        const usersSharing = await prisma.shared.findMany({
            where: {receiver_id: session.user.id},
            distinct: ['sharer_id']
        })
        const sharedUserIds = usersSharing.map((item: any) => item.sharer_id)

        const item = await prisma.item.update({
            where: {id: parseInt(params.id), AND: [{user_id: {in: [session?.user.id, ...sharedUserIds]}}]},
            data: {
                item_id: identifier,
                name: name,
                description: description,
                shelf: shelf,
                servings: servings,
                modified: currentDateTime
            }
        })

        // get the shared user details if this item is a shared one
        if (item.user_id !== session?.user.id && item.user_id) {
            const sharedUser = await prisma.user.findFirst({where: {id: item.user_id}})
            // @ts-ignore
            item.shared = true
            // @ts-ignore
            item.sharer = sharedUser
        }
        return Response.json(item)
    } else {
        return Response.json(`Unable to update item with id; ${params.id}`)
    }
}