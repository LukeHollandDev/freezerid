"use client"

import Image from "next/image"
import Login from "./Login"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <div className="navbar bg-base-100 fixed z-10">
            <div className="navbar-start">
                <Image className="btn-ghost" src={'/logo.png'} width={50} height={50} alt="Freezer ID logo" />
                <a className="btn btn-ghost text-xl">Freezer ID</a>
            </div>
            <div className="navbar-end">
                {session &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={session?.user?.image as string} />
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <button className="btn" onClick={() => signOut()}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                }
                {!session &&
                    <Login />
                }
            </div>
        </div>
    )
}