import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore"
import { addItemToCart, removeItemFromCart } from './cart-context';
import Loader from "../Utils/Loader";

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

    const [invoice ,setInvoice] = useState(null);

    // context for cart 
    const [itemCount, setItemCount] = useState(1);
    const [itemArr, setItemArr] = useState([]);

    const [added, setAdded] = useState(false);

    let itemData = {
        key : false
    }


    const addToCart = (itemKey, quantity) => {
        // console.log('itemCount', quantity);
        if(user){
            setItemCount(itemCount + 1)
            products.forEach((item) => {
                if(item.itemId === itemKey){
                   addItemToCart(item, quantity);
                }
            });
        }else{
            alert('You need to login first');
        }

    };
    
    const removeFromCart = (itemId) => {

        console.log('trying to remove things', itemId);
        
        if(user){
            console.log('removing item', itemId);
            removeItemFromCart(itemId);
            // itemInCart.forEach(item => {
            //     if(itemId === item.productId){
            //         removeItemFromCart(itemId);
            //         setItemCount(itemCount - 1);
            //         return;
            //     }
            // })
        }else{
            alert('You need to login first');
        }
    }

    // CALCULATE THE BILL OF ADDED ITEMS 
    const calculateInvoice = function() {
        console.log(itemInCart);
        let basePrice = 0;
        let totalTAX = 0;
        let itemCost = 0;
        itemInCart.forEach(item => {
        
        let itemPrice = Number(item.data.itemPrice);
        // console.log('itemPrice :', itemPrice);

        let tax = Math.floor((itemPrice * 12) / 100);
        let withoutTAX = itemPrice - tax;

        totalTAX = totalTAX + tax;

        itemCost += (itemPrice * item.quantity)
        // console.log('itemCost :', itemCost);

        // item price 
           basePrice = basePrice + (withoutTAX * item.quantity)
        //    console.log('itemCost :', itemCost);
        });

        // calclulateGST/TAX 
        let afterTAX = basePrice + totalTAX;

        // Discount 
        let discount = Math.floor((afterTAX * 5) / 100); 
        let afterDiscount = afterTAX - discount;

        // FLAT150OFF
        let payableAmount = afterDiscount - 199;

        console.table({payableAmount,itemCost, basePrice, totalTAX, discount});

        setInvoice({payableAmount,itemCost, basePrice, totalTAX, discount});

        console.log('invoice generated');
    }

    // Fetch Current User If he have saved any items previousely in The CART
    function fetchUserCart(snapshot) {
        
            if(user){
               
                let items = [];
                let noOfItems = 0;
                if(snapshot){
                    
                    snapshot.forEach(doc => {
                        let thisisdata = doc.data();

                        let itemdObj = {
                            data : thisisdata.data,
                            quantity : thisisdata.quantity,
                            id : thisisdata.id
                        }

                        noOfItems += thisisdata.quantity

                        items.push(itemdObj);
                    });
                    
                    setItemInCart(items);
                    setItemCount(noOfItems);
                    console.log('Got new data : ',items);
                    
                }
            }else{
                console.log('User Not Logged IN...');
            }
           
        };

    useEffect(()=>{
        if(user){
            const docRef = doc(db, 'users', user.uid);
                
            const unsub = onSnapshot(collection(docRef, 'userCart'), (querySnapshot) => {
                console.log("Change in cartData");
                fetchUserCart(querySnapshot);
                
            })
        }
        
    },[user])

    // fetching all products and storing them in array which can be accessed via context in app 
    function FetchAllProducts(snapshot) {  
        var itemData = [];
        try{
            snapshot.forEach((doc) => {
               
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
        // FetchAllProducts();

        const unsub = onSnapshot(collection(db, "products"), (querySnapshot) => {
            console.log("Current data: ", querySnapshot);
            FetchAllProducts(querySnapshot);
        });
       

    },[])

    if(loading){
        return(
            <div>
                <Loader />
            </div>
        )
    }else{
        return (
            <ThemeContext.Provider value={{theme, setTheme}}>
                <AuthContext.Provider value={{user}}>
                    <ProductContext.Provider value={{products, itemInCart, fetchUserCart, calculateInvoice}}>
                        <CartContext.Provider value={{itemCount ,addToCart, invoice, added, itemData, itemInCart, itemArr, removeFromCart}}>
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
