//login page
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5055/api/token/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
    } else {
      localStorage.setItem("token", data.token);
      try {
        const userRes = await fetch("http://127.0.0.1:5055/api/user", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
    
        const userData = await userRes.json();
    
        if (!userRes.ok) throw new Error("Failed to fetch user info");
    
       
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("username", userData.username); 
        navigate("/");
    
      } catch (err) {
        console.error("User fetch error:", err);
        setError("Login succeeded but failed to load user info.");
      }
    };
}

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-card">
      <img src={"/src/assets/SVG/Logo.svg"}/>
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
