"use client"

import Image from "next/image"
import LoginModal from "./LoginModal"
import { useSession, signIn, signOut } from "next-auth/react"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <div className="navbar bg-base-100 fixed z-10">
            <div className="navbar-start">
                <Image className="btn-ghost" src={'/logo.png'} width={50} height={50} alt="Freezer ID logo" />
                <a className="btn btn-ghost text-xl">Freezer ID</a>
            </div>
            <div className="navbar-end">
                {/* <LoginModal /> */}
                {session ?
                    <button onClick={() => signOut()}>Sign out</button>
                    :
                    <button onClick={() => signIn()}>Sign in</button>
                }
            </div>
        </div>
    )
}