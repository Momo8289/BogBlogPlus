import { Link } from "react-router-dom";
import { tokenLogout } from "../utils/api";
import {Bars3Icon} from "@heroicons/react/16/solid"
import { useState } from "react";

export default function NavBar({title}) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
        void tokenLogout(token);
        localStorage.removeItem("token");
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        window.location.href = "/login";
    };

  return (
    <nav className="navbar">
        <div className="titleLink"><Link to="/" ><img className="navBarLogo" src={"/src/assets/SVG/Logo.svg"}/></Link>
    <h1 className="navbar-title">{title}</h1></div>

    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <Bars3Icon className="bar-icon" id="barButton"/>
      </button>

    <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
     
      {token ? (
      <> <ul className="navbarList">
        <li><Link to="/">Home</Link> </li> 
      <li><Link to= {`/user/${id}/posts`}>My Posts</Link> </li>  
       <li><Link to="/new">New Post</Link> </li> 
       <li><Link to={`/user/${id}/account`}>My Account</Link></li> </ul>
        <button className="barButtonLogout" onClick={handleLogout}>Logout</button>
        </>):(
        <><ul className="navbarList">
        <li><Link to="/">Home</Link> </li> 
         <li><Link to="/login">Login</Link></li> 
         <li> <Link to="/register">Register</Link></li>
       </ul>  </>)}
     
    </div>
  </nav>
);
}
