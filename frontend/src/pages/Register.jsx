import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";


export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { loginReg, errors } = useAuthContext();


    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setError("");

        try {
            const adat = {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            };

            await loginReg(adat, "/register");

            navigate("/");

        } catch (err) {
            setError("Hiba történt a regisztráció során. Kérlek, ellenőrizd az adatokat.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="page">

            <main className="login" aria-label="Regisztráció">

                <header className="brand">

                    <img
                        className="brand__logo"
                        src="/logoBPX.png"
                        alt="BallPredix"
                        width="420"
                        height="120"
                    />


                </header>


                <form
                    className="form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <div className="field">

                        <label htmlFor="name">
                            Név
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Jatekosnev"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        {errors?.name && (
                            <span className="error">
                                {errors.name[0]}
                            </span>
                        )}

                    </div>


                    <div className="field">

                        <label htmlFor="email">
                            Email
                        </label>

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

                        {errors?.email && (
                            <span className="error">
                                {errors.email[0]}
                            </span>
                        )}

                    </div>


                    <div className="field">

                        <label htmlFor="password">
                            Jelszó
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {errors?.password && (
                            <span className="error">
                                {errors.password[0]}
                            </span>
                        )}

                    </div>


                    <div className="field">

                        <label htmlFor="password_confirmation">
                            Jelszó megerősítése
                        </label>

                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            required
                        />

                        {errors?.password_confirmation && (
                            <span className="error">
                                {errors.password_confirmation[0]}
                            </span>
                        )}

                    </div>


                    <button
                        className="btn"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Regisztráció..."
                            : "Regisztráció"}
                    </button>

                </form>


                <p className="signup">

                    Már van fiókod?{" "}

                    <Link
                        className="link"
                        to="/login"
                    >
                        Bejelentkezés
                    </Link>

                </p>

            </main>

        </div>
    );
}