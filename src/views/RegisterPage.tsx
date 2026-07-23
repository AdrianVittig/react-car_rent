import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { formatErrorMessage } from "../utils";
import { AxiosError } from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleSubmit() {
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }
        if (!checkPasswords(password, confirmPassword)) {
            return;
        }
        api.post("/auth/register", { username, password, confirmPassword })
            .then(res => {
                login(res.data.token);
                navigate("/cars");
            })
            .catch((err: AxiosError) => setError(formatErrorMessage(err)));
    }

    function checkPasswords(p: string, confPass: string): boolean {
        if (p !== confPass) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    }

    return (
        <div className="auth-page auth-page--register">
            <div className="auth-card">
                <div className="auth-card__header">
                    <h1 className="auth-card__title">Create your account</h1>
                    <p className="auth-card__subtitle">
                        Join CarRent and book your first ride in minutes.
                    </p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <div className="auth-field">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button className="auth-submit" onClick={handleSubmit}>
                    Sign up
                </button>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;