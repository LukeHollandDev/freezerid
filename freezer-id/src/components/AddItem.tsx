import { useState } from 'react'

export default function AddItem() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const clear = () => {
        setName('')
        setDescription('')
        setIdentifier('')
        setError(false)
    }

    const add = () => {
        if (name.length === 0 || description.length === 0 || identifier.length === 0) {
            setError(true)
        } else {
            setLoading(true)
            fetch(`/api/items`, { method: "POST", body: JSON.stringify({ name, description, identifier }) })
                .then((res) => res.json())
                .then((data) => {
                    (document.getElementById('item_modal') as HTMLDialogElement).close()
                    setLoading(false)
                })
        }
    }

    return (
        <div className="inline-block">
            <button className="btn btn-sm" onClick={() => (document.getElementById('item_modal') as HTMLDialogElement).showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-6-6h12"></path>
                </svg>
            </button>
            <dialog id="item_modal" className="modal">
                <div className="modal-box">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">
                                Identifier
                                {error && identifier.length === 0 && <span className='text-error'> required</span>}
                            </span>
                        </div>
                        <input type="text" placeholder="Type here..." className="input input-sm input-bordered w-full max-w-xs" disabled={loading} value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">
                                Name
                                {error && name.length === 0 && <span className='text-error'> required</span>}
                            </span>
                        </div>
                        <input type="text" placeholder="Type here..." className="input input-sm input-bordered w-full max-w-xs" disabled={loading} value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">
                                Description
                                {error && description.length === 0 && <span className='text-error'> required</span>}
                            </span>
                        </div>
                        <textarea className="textarea textarea-sm textarea-bordered w-full max-w-xs" rows={2} placeholder="Type here..." disabled={loading} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    </label>
                    <div className="modal-action">
                        {!loading &&
                            <form method="dialog">
                                <button className="btn" onClick={() => clear()}>Cancel</button>
                                <div role="button" className="btn bg-primary-content" onClick={() => add()}>Add</div>
                            </form>
                        }
                        {loading &&
                            <div className="skeleton h-12 w-40"></div>
                        }
                    </div>
                </div>
            </dialog>
        </div >
    )
}