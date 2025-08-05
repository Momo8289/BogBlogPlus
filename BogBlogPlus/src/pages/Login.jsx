//login page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../components/FloatingLogo";
import { tokenLogin, currentUser } from "../utils/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
   
      const loginRes = await tokenLogin(username, password);
      const token = loginRes.token;
  
      localStorage.setItem("token", token);
      const userData = await currentUser(token);
  
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("username", userData.username);
  
      navigate("/");
  
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-card">
      <div style={{ position: "relative" }}>
      <LogoSVG />
       </div>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
