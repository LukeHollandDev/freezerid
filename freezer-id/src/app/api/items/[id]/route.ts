import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/app/lib/auth'
import { getServerSession } from "next-auth/next"

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