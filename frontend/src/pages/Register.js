import { useState } from "react";
import { register } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await register(username, password);
      setMessage("Konto utworzone pomyślnie. Możesz się teraz zalogować.");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Rejestracja nie powiodła się. Spróbuj ponownie.");
    }
  };

  return (
    <div className="form-card">
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username-register" className="form-label">Nazwa użytkownika</label>
          <input
            id="username-register"
            type="text"
            placeholder="Wprowadź nazwę użytkownika"
            required
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-register" className="form-label">Hasło</label>
          <input
            id="password-register"
            type="password"
            placeholder="Wprowadź hasło"
            required
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {message && <p className="alert-message alert-success">{message}</p>}
        {error && <p className="alert-message alert-error">{error}</p>}
        
        <button type="submit" className="btn-primary form-button">Zarejestruj się</button>
      </form>
      <p className="form-link-text">
        Masz już konto? <Link to="/">Zaloguj się</Link>
      </p>
    </div>
  );
}