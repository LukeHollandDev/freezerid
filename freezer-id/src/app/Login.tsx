"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Login() {
    const { data: session } = useSession()

    return (
        <div>
            <div className="dropdown dropdown-end dropdown-hover">
                <button className="btn btn-block" tabIndex={0} >
                    Login / Register
                </button>
                <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                    {session &&
                        <div className="text-center">
                            <p>You're currently signed in.</p>
                            <button className="btn" onClick={() => signOut()}>
                                Sign Out
                            </button>
                        </div>

                    }
                    {!session &&
                        <button className="btn" onClick={() => signIn('google')}>
                            <Image src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" width={24} height={24} alt="Google G Logo" />
                            Login / Sign-up with Google
                        </button>
                    }

                </div>
            </div>

        </div>
    )
}