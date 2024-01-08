import { useState, useEffect } from 'react'

interface Item {
    id: number;
    user_id: string;
    item_id: string;
    name: string;
    description: string | null;
    added: Date;
    removed: Date | null;
    modified: Date | null;
}

interface Props {
    item: Item;
    removeItem: Function;
    updateItem: Function;
}

const convertDate = (date: Date) => {
    return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Item(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(props.item.name)
    const [description, setDescription] = useState(props.item.description)
    const [identifier, setIdentifier] = useState(props.item.item_id)
    const [loading, setLoading] = useState(false)

    const onSave = () => {
        setLoading(true)
        props.updateItem(name, description, identifier, () => setLoading(false))
        setEditMode(false)
    }

    if (loading) {
        return (
            <div className="card w-96 bg-secondary-content p-4">
                <div className="card-actions justify-end">
                    <div className="skeleton h-5 w-5"></div>
                </div>
                <div className="card-body items-center text-center pb-2 pt-1">
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-12 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                </div>
                <div className="card-actions justify-end mb-5 mr-5">
                    <div className="skeleton h-8 w-16"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="card w-96 bg-secondary-content">
            <div className="card-actions justify-end">
                <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                    <div tabIndex={0} role="button" className="btn btn-square btn-sm btn-ghost mt-1 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>
                    <div tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-24">
                        <button className="btn btn-sm btn-error" onClick={() => props.removeItem()}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body items-center text-center pb-2 pt-1">
                {!editMode &&
                    <h2 className="card-title">{props.item.name}</h2>
                }
                {editMode &&
                    <input type="text" placeholder="Item name..." className="input w-full text-center font-bold text-xl" value={name} onChange={(e) => setName(e.target.value)} />
                }

                {!editMode &&
                    <p>{props.item.description}</p>
                }
                {editMode &&
                    <textarea className="textarea w-full text-center" rows={2} placeholder="Item description..." value={description as string} onChange={(e) => setDescription(e.target.value)}></textarea>
                }

                <div className="flex gap-2 flex-wrap justify-center">
                    {!editMode &&
                        <div className="badge badge-secondary gap-2 p-3">
                            <p>#</p>
                            <p>{props.item.item_id}</p>
                        </div>
                    }
                    {editMode &&
                        <div className='flex gap-2'>
                            #
                            <input type="text" placeholder="Item ID..." className="input input-xs h-7" value={identifier as string} onChange={(e) => setIdentifier(e.target.value)} />
                        </div>
                    }
                    {!editMode &&
                        <div className="badge badge-neutral-content gap-2 p-3">
                            <p>+</p>
                            <p>{convertDate(props.item.added)}</p>
                        </div>
                    }
                </div>
            </div>
            <div className="card-actions justify-end mb-5 mr-5">
                {!editMode &&
                    <button className="btn btn-sm" onClick={() => setEditMode(true)}>Edit</button>
                }
                {editMode &&
                    <button className="btn btn-sm" onClick={() => onSave()}>Save</button>
                }
            </div>
        </div >
    )
}
