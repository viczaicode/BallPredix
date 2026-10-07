import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";


export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginReg, errors } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const adat =  {
                email: email,
                password: password,
                remember: remember
            };
            await loginReg(adat, "/login");
            navigate("/");
        } catch (err) {
            setError("Hiba történt a bejelentkezés során. Kérlek, próbáld újra.");
        } finally {
            setSubmitting(false);
        }
    };

    return ( 
        <div className="page"> 
            <main className="login" aria-label="Bejelentkezés"> 
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
                        <label htmlFor="email">
                             Email 
                        </label> 
                        
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            autoComplete="username" 
                            placeholder="email@pelda.hu" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        /> 
                        
                        {errors?.email && ( 
                            <span className="error"> 
                                {errors.email[0]} 
                            </span> )} 
                            
                    </div> 
                    
                    <div className="field"> 
                        <div className="field__label-row"> 
                            <label htmlFor="password"> 
                                Jelszó 
                            </label> 
                            
                            <Link 
                                className="link" 
                                to="/forgot-password" 
                            > 
                                Elfelejtett jelszó? 
                            
                            </Link> 
                        </div> 
                        
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
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
                    
                    <label className="remember"> 
                        <input 
                            type="checkbox" 
                            name="remember" 
                            checked={remember} 
                            onChange={(e) => 
                                setRemember(e.target.checked) 
                            } 
                        /> 
                        
                        <span> 
                            Maradjak bejelentkezve 
                        </span> 
                    </label> 
                    
                    <button 
                        className="btn" 
                        type="submit" 
                        disabled={submitting} 
                    > 
                        {submitting
                             ? "Bejelentkezés..." 
                             : "Bejelentkezés"} 
                    </button> 
                    
                </form> 
                
                <p className="signup"> 
                    Nincs még fiókod?{" "} 
                    
                    <Link 
                        className="link" 
                        to="/register" 
                    > 
                        Regisztráció 
                    </Link> 
                </p> 
                
            </main> 
        </div> );

}