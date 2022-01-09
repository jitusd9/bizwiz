import React, {useEffect, useState} from "react";
import { Link, useHistory } from 'react-router-dom'
import { auth, loginWithEmail, signInWithGoogle } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "../styles/login.css"

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const history = useHistory();
    useEffect(()=>{
        if(loading){
            // maybe trigger a laoding screen
            
            return(
                <div className="loading">
                    <h1>Loading...Login</h1>
                </div>
            )
        }
        if (user) history.replace("/dashboard");
    }, [user, loading]);

    return(
        <div className="login">
            <div className="login__container">
                <input
                 type="text"
                 className="login__textBox"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="E-mail Address"
                />
                <input
                 type="text"
                 className="login__textBox"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password"                    
                />
                <button
                    className="login__btn"
                    onClick={() => loginWithEmail(email, password)}>
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login;