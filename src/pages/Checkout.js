import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext, ProductContext } from '../components/context/ContextProvider'
// firebase imports 
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, storage, } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection, getDocs, getDoc, setDoc} from "firebase/firestore"

import Card from '../components/Card'
import pic from '../images/shoe.png'
import ssd from '../images/ssd.png'

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

const auth = getAuth();

export default function Checkout() {

    const [userCartItem, setUserCartItem] = useState([]);

    const [cartedItem, setCartedItem] = useState([]);

    const { products, itemInCart, fetchUserCart } = useContext(ProductContext);

    

    //    // Fetch Current User If he have saved any items previousely in The CART
    //    const fetchCurrentUser = async () => {

    //         let user = auth.currentUser;
    //         if(user){
    //             const docRef = doc(db, 'users', user.uid);
                
    //             const docSnap = await getDocs(collection(docRef, 'userCart'));

    //             let items = []
    //             if(docSnap){
    //                 docSnap.docs.forEach(element => {
    //                     let thisisdata = element.data();

    //                     let itemdObj = {
    //                         productId : thisisdata.itemId,
    //                         itemId : element.id
    //                     }

    //                     items.push(itemdObj);
    //                 });
    //                 setUserCartItem(items);
                    
    //             }else{
    //                 console.log('No Such Document');
    //             }
    //         }else{
    //             console.log('User Not Logged IN...');
    //         }
            
    //     };

        const filterProducts = () => {
            const filteredItems = products.filter((item) => {
                console.log(itemInCart);
                // console.log(userCartItem);
               
                let count = 0;

                itemInCart.forEach((checkItem) => {
                    if(checkItem.productId === item.itemId){
                        count += 1;
                    }
                })

                item.count = count

                console.log(item.count);

                return itemInCart.some(cartItem => cartItem.productId === item.itemId);
            })

            console.log(filteredItems);
            setCartedItem(filteredItems);
        }

    useEffect(()=>{
        // fetchCurrentUser();
        fetchUserCart();
        filterProducts();
    },[])

        return (            
            <CartContext.Consumer>
            {
                context => {
                    if(context.itemCount === 0){
                        return(
                            <div className='checkout'>
                                <div className='noitemsincart'>
                                    <h2>You haven't selected any items.</h2>
                                    <Link to="/">
                                        <button>Go For Shopping 🛒</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="checkout">
                                <div className="cart-summary">
                                    {
                                        cartedItem.map((item) => {
                                            console.log(item)
                                            return <Card key={item.itemId} docId={item.itemId} count={item.count} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice}/>
                                        })
                                    }
                                </div>
                                <div className="payment-summary">
                                    <h3>Payments summary</h3>
                                    <p>No of Items Added : {context.itemCount}</p>
                                    <table className="checkout-list">
                                        <tbody>
                                            <tr className="checkout-item">
                                                <td>Items cost</td>
                                                <td>₹ 14298.00</td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>GST/Tax (11%)</td>
                                                <td>₹ 1572.78</td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>Discount/Coupon</td>
                                                <td>5% + FLAT150OFF</td>
                                            </tr>
                                            <tr className="checkout-item total">
                                                <th>Total</th>
                                                <th>₹ 14927.24</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                <div className="big-orange-btn">
                                        <Button variant="contained" size="small" endIcon={<SendIcon/>}>Proceed to Pay</Button>
                                </div>
                                </div>
                            </div>
                        )
                    }
                }
            }
            </CartContext.Consumer>
        )
        
}
