// src/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("eztech_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginWithGoogle = async () => {
    // In your video you will explain this as the Google OAuth login.
    const fakeGoogleUser = {
      id: "1234567890",
      name: "Demo User",
      email: "user@example.com",
      provider: "google"
    };

    setUser(fakeGoogleUser);
    localStorage.setItem("eztech_user", JSON.stringify(fakeGoogleUser));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eztech_user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
