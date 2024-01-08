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
}

const convertDate = (date: Date) => {
    return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Item(props: Props) {
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
                <h2 className="card-title">{props.item.name}</h2>
                <p>{props.item.description}</p>
                <div className="flex gap-2 flex-wrap justify-center">
                    <div className="badge badge-secondary gap-2 p-3">
                        <p>#</p>
                        <p>{props.item.item_id}</p>
                    </div>
                    <div className="badge badge-neutral-content gap-2 p-3">
                        <p>+</p>
                        <p>{convertDate(props.item.added)}</p>
                    </div>
                </div>
            </div>
            <div className="card-actions justify-end mb-5 mr-5">
                <button className="btn btn-sm">Edit</button>
            </div>
        </div >
    )
}
