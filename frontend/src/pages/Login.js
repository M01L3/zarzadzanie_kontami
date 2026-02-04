import { useState, useContext } from "react";
import { login as apiLogin } from "../api/authApi";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await apiLogin(username, password);
      login(token);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Nieprawidłowa nazwa użytkownika lub hasło.");
    }
  };

  return (
    <div className="form-card">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username-login" className="form-label">Nazwa użytkownika</label>
          <input
            id="username-login"
            type="text"
            placeholder="Wprowadź nazwę użytkownika"
            required
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-login" className="form-label">Hasło</label>
          <input
            id="password-login"
            type="password"
            placeholder="Wprowadź hasło"
            required
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="alert-message alert-error">{error}</p>}
        
        <button type="submit" className="btn-primary form-button">Zaloguj się</button>
      </form>
      <p className="form-link-text">
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </p>
    </div>
  );
}