import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Home() {
  const { user, authLoading, logout } = useAuthContext();

  if (authLoading) {
    return (
      <div className="page">
        <main className="login" aria-busy="true">
          <p className="signup">Betöltés...</p>
        </main>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page">
      <main className="login" aria-label="Kezdőlap">
        <header className="brand">
          <img
            className="brand__logo"
            src="/logoBPX.png"
            alt="BallPredix"
            width="420"
            height="120"
          />
        </header>

        <p className="signup" style={{ marginTop: 0 }}>
          Szia, <strong>{user.name}</strong>
        </p>

        <button className="btn" type="button" onClick={() => logout()}>
          Kijelentkezés
        </button>
      </main>
    </div>
  );
}
