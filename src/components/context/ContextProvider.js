import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../../firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore"
import { addItemToCart, removeItemFromCart } from './cart-context';

const ThemeContext = React.createContext();
const AuthContext = React.createContext();
const CartContext = React.createContext();


function ContextProvider(props) {
    
    const [theme, setTheme] = useState('theme-light');
    const [user, loading] = useAuthState(auth);

    // context for cart 
    const [itemCount, setItemCount] = useState(0);
    const [itemArr, setItemArr] = useState([]);
    const [itemId, setItemid] = useState();

    const [added, setAdded] = useState(false);

    let itemData = {
        key : false
    }

    const addToCart = (isAdded,itemKey) => {
        // console.log(isAdded);
        let item = {
            key : itemKey
        }
        itemArr.push(item);

        addItemToCart(item);
        // console.log(itemArr);
        if(isAdded === 'add'){
            // console.log('isAdded true');
            setItemCount(itemCount - 1)
        }else{
            // console.log('isAdded false');
            setItemCount(itemCount + 1)
        }       
        // setAdded(!added);
    };

    const removeFromCart = (key) => {
        console.log('remove item', key);
        // removeFromCart(key);
    }

    // useEffect(() => {

    // },[isAdded])

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
                    <CartContext.Provider value={{itemCount ,addToCart, added, itemData, itemArr, removeFromCart}}>
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
