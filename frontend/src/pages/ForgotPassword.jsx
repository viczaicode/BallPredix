import React, { useState } from "react";
import { Link } from "react-router-dom";
import { myAxios } from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setStatus("");
    setFieldErrors({});

    try {
      await myAxios.get("/sanctum/csrf-cookie");
      const response = await myAxios.post("/forgot-password", { email });
      setStatus(
        response.data?.status ||
          "Ha létezik fiók ezzel az email címmel, elküldtük a visszaállító linket."
      );
    } catch (err) {
      if (err?.response?.status === 422) {
        setFieldErrors(err.response.data.errors || {});
      } else {
        setError("Nem sikerült elküldeni a kérelmet. Próbáld újra.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <main className="login" aria-label="Elfelejtett jelszó">
        <header className="brand">
          <img
            className="brand__logo"
            src="/logoBPX.png"
            alt="BallPredix"
            width="420"
            height="120"
          />
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email@pelda.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldErrors?.email && (
              <span className="error">{fieldErrors.email[0]}</span>
            )}
          </div>

          {status && <p className="signup">{status}</p>}
          {error && <span className="error">{error}</span>}

          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Küldés..." : "Visszaállító link küldése"}
          </button>
        </form>

        <p className="signup">
          <Link className="link" to="/login">
            Vissza a bejelentkezéshez
          </Link>
        </p>
      </main>
    </div>
  );
}
