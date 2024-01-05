import LoginModal from "./LoginModal"

export default function ItemsNotLoggedIn() {
    return (
        <div className="hero">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">Your Meals</h1>
                    <p className="py-6">You'll be able to see your meals below once you login or sign-up to Freezer ID.</p>
                    <div className="grid gap-1 grid-cols-2">
                        <LoginModal />
                        <div>
                            <button className="btn btn-block">Sign-up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}