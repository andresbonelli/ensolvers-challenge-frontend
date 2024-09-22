import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: any }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  async function auth() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsAuthorized(false);
      return;
    } else {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (!tokenExpiration || tokenExpiration < now) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }
  }
  console.log("Is Authorized: " + isAuthorized);

  if (isAuthorized === null) {
    return "loading";
  }

  return isAuthorized ? children : <Navigate to="/register" />;
}
