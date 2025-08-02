import { Link } from "react-router-dom";

export default function NavBar({title}) {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
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
        <Link to="/new">New Post</Link> &nbsp; | &nbsp;
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
