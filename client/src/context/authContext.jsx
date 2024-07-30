import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VITE_API = `${import.meta.env.VITE_API}`;

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${VITE_API}/api/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error(
        error.response
          ? error.response.data.error
          : "Login failed. Please try again."
      );
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${VITE_API}/api/signup`, {
        name,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error(
        error.response
          ? error.response.data.error
          : "Signup failed. Please try again."
      );
      throw error;
    }
  };

  const deleteAccount = async (email) => {
    try {
      await axios.delete(`${VITE_API}/api/delete`, { data: { email } });
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      alert("Account deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete account.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, deleteAccount, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
