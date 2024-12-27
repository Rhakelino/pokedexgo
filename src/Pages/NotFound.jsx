import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold font-pokemon1">Page Not Found</h1>
            <img src="/images/notfound.gif" alt="" className="mb-4" />
            <Link to={"/"} className="border px-4 py-2 bg-blue-300 rounded-full transition-all hover:bg-blue-400 hover:scale-110">
                <h1 className="font-pokemon2">Back To Home</h1>
            </Link>
        </div>
    )
}


export default NotFound