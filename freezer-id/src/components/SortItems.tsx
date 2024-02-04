interface Props {
    selectedField: string;
    sortDirection: boolean;
    disabled?: boolean;
    callback: Function;
    switchDirectionCallback: Function;
}

export default function SortItems(props: Props) {
    const sort = (field: string, direction: boolean) => {
        (document.getElementById("sortDropdown") as HTMLElement).blur();
        props.callback(field, direction)
    }

    const switchDirection = () => {
        props.switchDirectionCallback(!props.sortDirection)
    }

    return (
        <div className="flex gap-1">
            <div className="dropdown">
                <div tabIndex={0} role="button" className={props.disabled ? "btn btn-sm btn-disabled" : "btn btn-sm"} aria-disabled={props.disabled ? "true" : "false"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    {props.selectedField === 'item_id' ? 'identifier' : props.selectedField}
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2" id="sortDropdown">
                    <li>
                        <a onClick={() => sort("item_id", true)} className={props.selectedField === "item_id" && props.sortDirection ? "bg-primary-content" : ""}>
                            Identifier <span className="text-neutral-content">a-z</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => sort("item_id", false)} className={props.selectedField === "item_id" && !props.sortDirection ? "bg-primary-content" : ""}>
                            Identifier <span className="text-neutral-content">z-a</span>
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a onClick={() => sort("name", true)} className={props.selectedField === "name" && props.sortDirection ? "bg-primary-content" : ""}>
                            Name <span className="text-neutral-content">a-z</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => sort("name", false)} className={props.selectedField === "name" && !props.sortDirection ? "bg-primary-content" : ""}>
                            Name <span className="text-neutral-content">z-a</span>
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a onClick={() => sort("description", true)} className={props.selectedField === "description" && props.sortDirection ? "bg-primary-content" : ""}>
                            Description <span className="text-neutral-content">a-z</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => sort("description", false)} className={props.selectedField === "description" && !props.sortDirection ? "bg-primary-content" : ""}>
                            Description <span className="text-neutral-content">z-a</span>
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a onClick={() => sort("added", true)} className={props.selectedField === "added" && props.sortDirection ? "bg-primary-content" : ""}>
                            Added <span className="text-neutral-content">1 Jan-31 Dec</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => sort("added", false)} className={props.selectedField === "added" && !props.sortDirection ? "bg-primary-content" : ""}>
                            Added <span className="text-neutral-content">31 Dec-1 Jan</span>
                        </a>
                    </li>
                </ul>
            </div>
            <button className={props.disabled ? "btn btn-sm btn-disabled" : "btn btn-sm"} aria-disabled={props.disabled ? "true" : "false"} onClick={() => switchDirection()}>
                <svg xmlns="http://www.w3.org/2000/svg" className={props.sortDirection ? "h-4 w-2" : "h-4 w-2 rotate-180"} viewBox="0 0 245 490" stroke="currentColor">
                    <g>
                        <polygon points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46    0,194.27 37.087,221.213  " />
                    </g>
                </svg>
            </button>
        </div >
    )
}