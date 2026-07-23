import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { formatErrorMessage } from "../utils";
import { AxiosError } from "axios";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleSubmit() {
        if (!username || !password) {
            setError("Please enter your username and password");
            return;
        }
        api.post("/auth/login", { username, password })
            .then(res => {
                login(res.data.token);
                navigate("/cars");
            })
            .catch((err: AxiosError) => setError(formatErrorMessage(err)));
    }

    return (
        <div className="auth-page auth-page--login">
            <div className="auth-card">
                <div className="auth-card__header">
                    <h1 className="auth-card__title">Welcome back</h1>
                    <p className="auth-card__subtitle">
                        Log in to manage your rentals.
                    </p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <div className="auth-field">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="auth-submit" onClick={handleSubmit}>
                    Log in
                </button>

                <p className="auth-switch">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;