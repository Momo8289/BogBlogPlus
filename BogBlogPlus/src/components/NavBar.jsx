import {Link} from "react-router-dom";
import {tokenLogout} from "../utils/api.js";

export default function NavBar({title}) {
    const token = localStorage.getItem("token");
    const handleLogout = () => {
        void tokenLogout(token);
        localStorage.removeItem("token");
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">{title}</h1>
            <div className="navbar-links">
                <Link to="/">Home</Link> &nbsp; | &nbsp;
                {token && (
                    <>
                        <Link to="/new">New Post</Link> &nbsp; | &nbsp;
                        Logged in as {localStorage.getItem("username")} &nbsp;
                        <button onClick={handleLogout}>Logout</button>
                    </>)}
                {!token && (
                    <>
                        <Link to="/login">Login</Link> &nbsp; | &nbsp;
                        <Link to="/register">Register</Link>
                    </>)}

            </div>
        </nav>
    );
}
