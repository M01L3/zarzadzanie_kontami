import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar() {
  const { token, logout, userRole, username } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {token && (
          <>
            <NavLink to="/users" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>
              Użytkownicy
            </NavLink>
          </>
        )}
        {!token && (
          <>
            <NavLink to="/" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>
              Register
            </NavLink>
          </>
        )}
      </div>
      <div className="navbar-auth">
        {token && username && <span className="navbar-username">Witaj, {username} ({userRole})</span>}
        {token && (
          <button className="navbar-logout" onClick={logout}>
            Wyloguj
          </button>
        )}
      </div>
    </nav>
  );
}