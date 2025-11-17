import React, { createContext, useState, useEffect } from "react";
import { oauthConfig } from "../oauth-config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("streamlistUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const loginUser = (token) => {
    const userData = { token };
    setUser(userData);
    localStorage.setItem("streamlistUser", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("streamlistUser");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
