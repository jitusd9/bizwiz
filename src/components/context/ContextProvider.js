import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import AuthContext from './AuthContext'
import ThemeContext from "./Theme-context"
import { auth, db, logout } from "../../firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore"

export default function ContextProvider(props) {
    
    const [theme, setTheme] = useState('theme-light');
    const [user, loading] = useAuthState(auth);

    if(loading){
        return(
            <div className="authLoader loadingstart">
                <svg className="spinner" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
            </div>
        )
    }else{
        return (
            <ThemeContext.Provider value={{theme, setTheme}}>
                <AuthContext.Provider value={{user}}>
                    {props.children}
                </AuthContext.Provider>
            </ThemeContext.Provider>
        )
    }

}

