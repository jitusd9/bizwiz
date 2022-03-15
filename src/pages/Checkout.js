import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext, ProductContext } from '../components/context/ContextProvider'
// firebase imports 
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, storage, } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection, getDocs, getDoc, setDoc} from "firebase/firestore"

import Card from '../components/Card'
import pic from '../images/icon/cart.svg'
import ssd from '../images/ssd.png'

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

const auth = getAuth();

export default function Checkout() {

    const [cartedItem, setCartedItem] = useState([]);

    const [invoice, setInvoice] = useState(null);

    const { products, itemInCart, fetchUserCart, calculateInvoice } = useContext(ProductContext);


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
        let invoiceData = calculateInvoice(filteredItems);
        console.log(invoiceData);
        setInvoice(invoiceData);
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
                                            return <Card key={item.itemId} docId={item.itemId} count={item.count} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice} />
                                        })
                                    }
                                </div>
                                {
                                    invoice !== null ?
                                    <div className="payment-summary">
                                    <h3>Payments summary</h3>
                                    <p>(for convenience numbers are rounded)</p>
                                    <table className="checkout-list">
                                        <tbody>
                                            <tr className="checkout-item">
                                                <td>No of Items</td>
                                                <td>{context.itemCount}</td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>Items cost</td>
                                                <td>₹ <span>{invoice.basePrice}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>GST/Tax (12%)</td>
                                                <td>₹ <span>{invoice.tax}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>Discount(5%)/Coupon</td>
                                                <td>₹ <span>{invoice.discount}</span> + FLAT199OFF</td>
                                            </tr>
                                            <tr className="checkout-item total">
                                                <th>Total</th>
                                                <th>₹ <span>{invoice.payableAmount}</span></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="big-orange-btn">
                                            <Button variant="contained" size="small" endIcon={<SendIcon/>}>Proceed to Pay</Button>
                                    </div>
                                    </div> : "lol"
                                }
                                
                            </div>
                        )
                    }
                }
            }
            </CartContext.Consumer>
        )
        
}
