import React, { useEffect, useContext } from "react";
import { oauthConfig } from "../oauth-config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const url = "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=" + oauthConfig.clientId +
      "&redirect_uri=" + oauthConfig.redirectUri +
      "&response_type=token" +
      "&scope=" + oauthConfig.scopes.join(" ");
    window.location.href = url;
  };

  useEffect(() => {
    if (window.location.hash.startsWith("#access_token")) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        loginUser(token);
        navigate("/", { replace: true });
      }
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sign in with Google</h2>
      <button onClick={login}>Sign In</button>
    </div>
  );
}

export default LoginPage;
