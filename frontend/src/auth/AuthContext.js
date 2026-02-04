import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
        setUsername(payload.sub);
      } catch (e) {
        console.error("Failed to decode token:", e);
        logout();
      }
    } else {
      setUserRole(null);
      setUsername(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    navigate("/users");
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userRole, username }}>
      {children}
    </AuthContext.Provider>
  );
};