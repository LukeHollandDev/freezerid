import { useState } from 'react'
import Image from "next/image"

interface Item {
    id: number;
    user_id: string;
    item_id: string;
    name: string;
    description: string | null;
    servings: string | null;
    shelf: string | null;
    added: Date;
    removed: Date | null;
    modified: Date | null;
    shared: boolean | null;
    sharer: any;
}

interface Props {
    item: Item;
    removeItem: Function;
    updateItem: Function;
    restoreItem: Function;
}

const convertDate = (date: Date) => {
    return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Item(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(props.item.name)
    const [description, setDescription] = useState(props.item.description)
    const [identifier, setIdentifier] = useState(props.item.item_id)
    const [shelf, setShelf] = useState(props.item.shelf)
    const [servings, setServings] = useState(props.item.servings)
    const [loading, setLoading] = useState(false)

    const onSave = () => {
        setLoading(true)
        props.updateItem(name, description, identifier, shelf, servings, () => setLoading(false))
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
            {!props.item.removed ?
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
                :
                <br />
            }
            <div className="card-body items-center text-center pb-2 pt-1">
                {!editMode &&
                    <h2 className="card-title">{props.item.name}</h2>
                }
                {editMode &&
                    <input type="text" placeholder="Item name..." className="input w-full text-center font-bold text-xl" value={name} onChange={(e) => setName(e.target.value)} />
                }

                {!editMode &&
                    <span>{props.item.description}</span>
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
                            <input type="number" placeholder="Item ID..." className="input input-xs h-7" value={identifier as string} onChange={(e) => setIdentifier(e.target.value)} />
                        </div>
                    }
                    {!editMode &&
                        <div className="badge badge-neutral-content gap-2 p-3">
                            <p>+</p>
                            <p>{convertDate(props.item.added)}</p>
                        </div>
                    }
                </div>

                {editMode || props.item.shelf || props.item.servings ?
                    <div className="flex gap-2 flex-wrap justify-center">
                        {!editMode && props.item.shelf &&
                            <div className="badge badge-neutral-content gap-2 p-3">
                                <p>Shelf</p>
                                <p>{props.item.shelf}</p>
                            </div>
                        }
                        {editMode &&
                            <div className='flex gap-2'>
                                Shelf
                                <input type="number" placeholder="Shelf..." className="input input-xs h-7" value={shelf as string} onChange={(e) => setShelf(e.target.value)} />
                            </div>
                        }
                        {!editMode && props.item.servings &&
                            <div className="badge badge-neutral-content gap-2 p-3">
                                <p>Serves</p>
                                <p>x{props.item.servings}</p>
                            </div>
                        }
                        {editMode &&
                            <div className='flex gap-2'>
                                Serves
                                <input type="number" placeholder="Serves..." className="input input-xs h-7" value={servings as string} onChange={(e) => setServings(e.target.value)} />
                            </div>
                        }
                    </div>
                    :
                    null
                }
            </div>

            {!props.item.removed ?
                <div className="card-actions justify-end mb-5 mr-5">
                    {props.item.shared ?
                        <button className="btn btn-sm btn-ghost">
                            <Image alt="User Profile Icon" className='rounded-full' src={props.item.sharer.image as string} height={25} width={25} />
                            {props.item.sharer.name}
                        </button>
                        :
                        null
                    }
                    {!editMode &&
                        <button className="btn btn-sm" onClick={() => setEditMode(true)}>Edit</button>
                    }
                    {editMode &&
                        <button className="btn btn-sm" onClick={() => onSave()}>Save</button>
                    }
                </div>
                :
                <div className="card-actions justify-end mb-5 mr-5">
                    <button className="btn btn-sm" onClick={() => props.restoreItem()}>Restore Item</button>
                </div>
            }
        </div >
    )
}
