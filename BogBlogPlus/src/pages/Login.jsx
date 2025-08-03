//login page
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApiError, currentUser, tokenLogin} from "../utils/api.js";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data: loginData} = await tokenLogin(username, password);
            const {data: userData} = await currentUser(loginData.token);

            localStorage.setItem("token", loginData.token);
            localStorage.setItem("userId", userData.id);
            localStorage.setItem("username", userData.username);
            navigate("/");

        } catch (err) {
            console.error(err)
            if(err instanceof ApiError) {
                setError(err.message)
            }
            else {
                throw err
            }
        }
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleLogin} className="login-card">
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
