"use client"

import {useSession, signOut} from "next-auth/react"
import Image from "next/image"

import Login from "@/app/Login"
import {useState} from "react"

export default function NavBar() {
    const {data: session} = useSession()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const shareItems = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Email address is invalid, please make sure the email provided is valid.");
            setSuccess(false)
            return;
        }

        fetch(`/api/share`, {method: "POST", body: JSON.stringify({email})})
            .then((res) => {
                if (res.status === 404) {
                    setError("Email not in use, could not find user with that email.");
                    setSuccess(false)
                    return;
                }
                if (res.status === 409) {
                    setError("You have already shared your items with this email.");
                    setSuccess(false)
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setSuccess(true)
                    setError('')
                }
                return;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const clear = () => {
        setEmail('')
        setError('')
        setSuccess(false)
    }

    return (
        <div className="navbar bg-base-100 fixed z-10">
            <div className="navbar-start">
                <Image src={'/logo.png'} width={50} height={50} alt="Freezer ID logo"/>
                <a className="btn btn-ghost text-xl">Freezer ID</a>
            </div>
            <div className="navbar-end gap-2">
                {session &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost avatar">
                            <span>{session.user.name}</span>
                            <div className="w-10 rounded-full">
                                <Image alt="User Profile Icon" src={session.user.image as string} height={40}
                                       width={40}/>
                            </div>
                        </div>
                        <div tabIndex={0}
                             className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <div className="inline-block">
                                <button className="btn w-full"
                                        onClick={() => (document.getElementById('share_modal') as HTMLDialogElement).showModal()}>
                                    Share Items
                                </button>
                                <dialog id="share_modal" className="modal">
                                    <div className="modal-box max-w-md">
                                        <span className="text-xl font-bold">Share your items!</span>
                                        <br/>
                                        <span>Enter the email of the user you&apos;d like to share your freezer items with. They will be able to view all of your freezer items.</span>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">
                                                    Email Address
                                                </span>
                                            </div>
                                            <input type="text" placeholder="Type here..."
                                                   className="input input-sm input-bordered w-full max-w-md"
                                                   value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </label>
                                        {error ?
                                            <p>
                                                <br/>
                                                <span className='font-bold text-error'>{error}</span>
                                            </p>
                                            : null
                                        }
                                        {success ?
                                            <p>
                                                <br/>
                                                <span
                                                    className='font-bold text-success'>Successfully shared your items!</span>
                                            </p>
                                            : null
                                        }
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn" onClick={() => clear()}>Cancel</button>
                                                <div role="button" className="btn bg-primary-content"
                                                     onClick={() => shareItems()}>Add
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <button className="btn" onClick={() => signOut()}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                }
                {!session &&
                    <Login/>
                }
            </div>
        </div>
    )
}