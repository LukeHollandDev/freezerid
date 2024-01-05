"use client"

export default function LoginModal() {
    return (
        <div>
            <button className="btn btn-block" onClick={() => (document.getElementById('my_modal_1') as HTMLFormElement).showModal()}>
                Login
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Login</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form method="dialog">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                        <br />
                        <button className="btn w-full" type="submit">Login</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}