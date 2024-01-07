"use client"

import Login from "./Login"
import { useSession } from "next-auth/react"

export default function Items() {
    const { data: session } = useSession()

    const items = [

    ]

    return (
        <div>
            {!session &&
                <div className="hero">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-4xl font-bold">Your Meals</h1>
                            <p className="py-6">You'll be able to see your meals below once you login or sign-up to Freezer ID.</p>
                            <Login />
                        </div>
                    </div>
                </div>
            }
            {session &&
                <div className="text-center">Items will go here!</div>
            }
        </div>

    )
}