const API_URL = "http://localhost:8080/api";

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.text(); 
};

export const register = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role: "USER" }) 
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }
};

export const getUsers = async (token) => {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const deleteUser = async (id, token) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    if (res.status === 403) throw new Error("Brak uprawnień (wymagany ADMIN)");
    throw new Error("Delete failed");
  }
};

export const updateUser = async (id, username, role, token) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ username, role })
  });

  if (!res.ok) {
    throw new Error("Update failed");
  }
  return res.json();
};