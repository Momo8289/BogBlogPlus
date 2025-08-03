//registration page
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../utils/api.js";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const {data} = await registerUser(username, password)
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id)
            localStorage.setItem("username", data.user.username)
            navigate("/");

        } catch (err) {
            console.error(err)
            setError(err.message || "Registration failed.");
        }

    };

    return (
        <div className="registerPage">
            <div className="auth-container">
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
