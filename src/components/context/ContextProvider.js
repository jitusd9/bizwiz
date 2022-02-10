import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../../firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore"

const ThemeContext = React.createContext();
const AuthContext = React.createContext();
const CartContext = React.createContext();

function ContextProvider(props) {
    
    const [theme, setTheme] = useState('theme-light');
    const [user, loading] = useAuthState(auth);
    const [itemCount, setItemCount] = useState(0);

    const addToCart = (e) => e ? setItemCount(itemCount - 1) : setItemCount(itemCount + 1);

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
                    <CartContext.Provider value={{itemCount ,addToCart}}>
                        {props.children}
                    </CartContext.Provider>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        )
    }

}

export {
    ContextProvider,
    ThemeContext,
    AuthContext,
    CartContext
}
