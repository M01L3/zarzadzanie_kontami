import { useEffect, useState, useContext } from "react";
import { getUsers } from "../api/authApi";
import { AuthContext } from "../auth/AuthContext";

export default function Users() {
  const { token, userRole } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    if (!token) {
      setError("Brak tokena autoryzacyjnego.");
      return;
    }
    getUsers(token)
      .then(setUsers)
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setError("Nie udało się pobrać listy użytkowników.");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleEdit = async (user) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!window.confirm(`Czy chcesz zmienić rolę użytkownika ${user.username} na ${newRole}?`)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ id: user.id, username: user.username, role: newRole })
      });

      if (response.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "Błąd zmiany roli.");
      }
    } catch (err) {
      console.error("Błąd edycji:", err);
      setError(err.message || "Nie udało się zmienić roli użytkownika.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to konto?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setUsers(users.filter(u => u.id !== id));
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "Błąd usuwania użytkownika.");
      }
    } catch (err) {
      console.error("Błąd usuwania:", err);
      setError(err.message || "Nie udało się usunąć użytkownika.");
    }
  };

  return (
    <div className="container">
      <div className="users-section">
        <h2>Zarządzanie Użytkownikami</h2>
        {error && <p className="alert-message alert-error">{error}</p>}
        
        <div className="table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th>Użytkownik</th>
                <th>Rola</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td data-label="Użytkownik">{u.username}</td>
                  <td data-label="Rola">
                    <span className={`badge ${u.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td data-label="Akcje">
                    {userRole === 'ADMIN' && (
                      <div className="action-buttons">
                        <button 
                          className="btn-action-edit" 
                          onClick={() => handleEdit(u)}
                          disabled={userRole !== 'ADMIN'}
                        >
                          Zmień Rolę
                        </button>
                        <button 
                          className="btn-action-delete" 
                          onClick={() => handleDelete(u.id)}
                          disabled={userRole !== 'ADMIN'}
                        >
                          Usuń
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}