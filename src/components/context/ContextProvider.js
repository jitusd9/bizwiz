import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../../firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore"
import { addItemToCart, removeItemFromCart } from './cart-context';
import { test } from './Allproducts';

const ThemeContext = React.createContext();
const AuthContext = React.createContext();
const CartContext = React.createContext();

const ProductContext = React.createContext();


function ContextProvider(props) {
    
    const [theme, setTheme] = useState('theme-light');
    const [user, loading] = useAuthState(auth);

    // all products 
    const [products, setProducts] = useState([]);
    // userCart products
    const [itemInCart, setItemInCart] = useState([]);

    // context for cart 
    const [itemCount, setItemCount] = useState(1);
    const [itemArr, setItemArr] = useState([]);
    const [itemId, setItemid] = useState();

    const [added, setAdded] = useState(false);

    let itemData = {
        key : false
    }


    const addToCart = (isAdded,itemKey) => {
        // console.log(isAdded);

        products.forEach(item => {
            if(item.itemId === itemKey){
                // itemArr.push(item);
                addItemToCart(item);
            }
        });

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

    const removeFromCart = (itemId) => {
        console.log('removing item', itemId);
        removeItemFromCart(itemId);
    }

        // Fetch Current User If he have saved any items previousely in The CART
    async function fetchUserCart() {
        console.log('FETCHING CART PRODUCTS');
            let user = auth.currentUser;
            if(user){
                const docRef = doc(db, 'users', user.uid);
                
                const docSnap = await getDocs(collection(docRef, 'userCart'));

                let items = []
                if(docSnap){
                    docSnap.docs.forEach(element => {
                        let thisisdata = element.data();

                        let itemdObj = {
                            productId : thisisdata.itemId,
                            itemId : element.id
                        }

                        items.push(itemdObj);
                    });
                    setItemInCart(items);
                    
                }else{
                    console.log('No Such Document');
                }
            }else{
                console.log('User Not Logged IN...');
            }
           
        };

    // fetching all products and storing them in array which can be accessed via context in app 
    async function FetchAllProducts() {  
        var itemData = [];
        try{
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
               console.log(doc.id);
               
               let itemObj = {
                    itemId : doc.id,
                    itemData : doc.data()
                }
                itemData.push(itemObj);
            })

            setProducts(itemData);
            
        }catch(err){
            console.error(err);
            return err;
        }
    }

    useEffect(() => {
        
        FetchAllProducts();
    },[])

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
                    <ProductContext.Provider value={{products, itemInCart, fetchUserCart}}>
                        <CartContext.Provider value={{itemCount ,addToCart, added, itemData, itemInCart, itemArr, removeFromCart}}>
                            {props.children}
                        </CartContext.Provider>
                    </ProductContext.Provider>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        )
    }

}

export {
    ContextProvider,
    ThemeContext,
    AuthContext,
    CartContext,
    ProductContext,
}
