import { Link } from "react-router-dom";

export default function NavBar({title}) {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
    <h1 className="navbar-title">{title}</h1>
    <div className="navbar-links">
      <Link to="/">Home</Link> &nbsp; | &nbsp;
      {token && (
        <button onClick={handleLogout}>Logout</button>)}
      {!token &&(
        <>
          <Link to="/login">Login</Link> &nbsp; | &nbsp;
          <Link to="/register">Register</Link>
        </>)}
      )
    </div>
  </nav>
);
}
