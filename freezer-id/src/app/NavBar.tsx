import Image from "next/image"
import LoginModal from "./LoginModal"

export default async function NavBar() {
    return (
        <div className="navbar bg-base-100 fixed z-10">
            <div className="navbar-start">
                <Image className="btn-ghost" src={'/logo.png'} width={50} height={50} alt="Freezer ID logo" />
                <a className="btn btn-ghost text-xl">Freezer ID</a>
            </div>
            <div className="navbar-end">
                <LoginModal />
            </div>
        </div>
    )
}