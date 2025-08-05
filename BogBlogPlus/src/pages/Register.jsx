//registration page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../components/FloatingLogo";
import { registerUser, currentUser } from "../utils/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters."); 
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
    
      const { token } = await registerUser(username, password);
      localStorage.setItem("token", token);

      const userData = await currentUser(token);

      localStorage.setItem("userId", userData.id);
      localStorage.setItem("username", userData.username);

      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Something went wrong during registration.");
    }
  };


  return (
    <div className="registerPage">
    <div className="auth-container">
    <div style={{ position: "relative" }}>
      <LogoSVG />
       </div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  );
}
