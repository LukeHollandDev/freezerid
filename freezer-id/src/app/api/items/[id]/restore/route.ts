import {PrismaClient} from '@prisma/client'
import {getServerSession} from "next-auth/next"

import {authOptions} from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function PUT(
    request: Request,
    {params}: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (session) {
        const currentDateTime = new Date()
        const usersSharing = await prisma.shared.findMany({
            where: {receiver_id: session.user.id},
            distinct: ['sharer_id']
        })
        const sharedUserIds = usersSharing.map((item: any) => item.sharer_id)
        const item = await prisma.item.update({
            where: {id: parseInt(params.id), AND: [{user_id: {in: [session?.user.id, ...sharedUserIds]}}]},
            data: {
                modified: currentDateTime,
                removed: null
            }
        })
        return Response.json(item)
    } else {
        return Response.json(`Unable to update item with id; ${params.id}`)
    }
}