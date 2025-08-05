import { Link } from "react-router-dom";
import { tokenLogout } from "../utils/api";

export default function NavBar({title}) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");


  const handleLogout = async () => {

     const token = localStorage.getItem("token");
  if (token) {
    try {
      await tokenLogout(token);
    } catch (err) {
      console.warn("Logout failed or token already invalid:", err.message);
      
    }
  }

  
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username"); 
  window.location.href = "/login"; 
  };
  

  return (
    <nav className="navbar">
        <div className="titleLink"><Link to="/" ><img className="navBarLogo" src={"/src/assets/SVG/Logo.svg"}/></Link>
    <h1 className="navbar-title">{title}</h1></div>
    
    <div className="navbar-links">
      <Link to="/">Home</Link> &nbsp; | &nbsp;
      {token && (
      <>
        <Link to= {`/user/${id}/posts`}>My Posts</Link> &nbsp; | &nbsp;
        <Link to="/new">New Post</Link> &nbsp; | &nbsp;
        <Link to={`/user/${id}/account`}>My Account</Link> &nbsp; | &nbsp;
        <button onClick={handleLogout}>Logout</button>
        </>)}
      {!token &&(
        <>
          <Link to="/login">Login</Link> &nbsp; | &nbsp;
          <Link to="/register">Register</Link>
        </>)}
      
    </div>
  </nav>
);
}
