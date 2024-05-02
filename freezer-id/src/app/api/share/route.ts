import {PrismaClient} from '@prisma/client'
import {getServerSession} from "next-auth/next"

import {authOptions} from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    const {email} = await request.json()
    if (session) {
        // get user id of current user 'sharer'
        const sharer_id = session.user.id

        // get user id of the 'receiver' user using their email
        const receiver = await prisma.user.findFirst({where: {email: email}})
        if (!receiver) {
            return Response.json({message: "Email address is invalid.", email}, {status: 404})
        }
        const receiver_id = receiver.id

        if (receiver_id === sharer_id) {
            return Response.json({message: "You cannot share with yourself.", email}, {status: 400})
        }

        const existingShared = await prisma.shared.findFirst({where: {sharer_id: sharer_id, receiver_id: receiver_id}})

        if (existingShared) {
            return Response.json("User has already shared with this email.", {status: 409})
        }

        const shared = await prisma.shared.create({
            data: {
                sharer_id: sharer_id,
                receiver_id: receiver_id
            }
        })

        return Response.json(shared)
    } else {
        return Response.json("User is unauthorised.", {status: 401})
    }
}