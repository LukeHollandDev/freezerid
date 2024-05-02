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
        const item = await prisma.item.update({
            where: {id: parseInt(params.id), AND: [{user_id: session?.user.id}]},
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