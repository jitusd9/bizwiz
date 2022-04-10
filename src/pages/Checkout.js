import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext, ProductContext } from '../components/context/ContextProvider'


import Card from '../components/Utils/Card'

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';


export default function Checkout() {

    const [cartedItem, setCartedItem] = useState([]);

    const [invoice, setInvoice] = useState(null);

    const { products, itemInCart, fetchUserCart, calculateInvoice } = useContext(ProductContext);


    const filterProducts = () => {
        const filteredItems = products.filter((item) => {

            let count = 0;

            itemInCart.forEach((checkItem) => {
                if(checkItem.productId === item.itemId){
                    count += 1;
                }
            })

            item.count = count

            return itemInCart.some(cartItem => cartItem.productId === item.itemId);
        })


        setCartedItem(filteredItems);
        let invoiceData = calculateInvoice(filteredItems);

        setInvoice(invoiceData);
    }

    useEffect(()=>{
        fetchUserCart();
        filterProducts();

    },[itemInCart])

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
                                            <tr className="checkout-item itemCost">
                                                <td>Items cost</td>
                                                <td>₹ <span>{invoice.itemCost}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>Base price</td>
                                                <td>₹ <span>{invoice.basePrice}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>GST/Tax (inluded)</td>
                                                <td>₹ <span>{invoice.totalTAX}</span></td>
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
