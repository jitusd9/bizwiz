import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext, ProductContext } from '../components/context/ContextProvider'


import Card from '../components/Utils/Card'

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';


export default function Checkout() {


    const { itemInCart, calculateInvoice } = useContext(ProductContext);


    useEffect(()=>{

        calculateInvoice();
        
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
                                        context.itemInCart.map((item) => {
                                            console.log(item)
                                            return <Card key={item.id} id={item.id} count={item.quantity} photo={item.data.itemThumbURL} title={item.data.itemName} item={item.data.itemCategory} price={item.data.itemPrice} />
                                        })
                                    }
                                </div>
                                {
                                    context.invoice !== null ?
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
                                                <td>₹ <span>{context.invoice.itemCost}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>Base price</td>
                                                <td>₹ <span>{context.invoice.basePrice}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>GST/Tax (inluded)</td>
                                                <td>₹ <span>{context.invoice.totalTAX}</span></td>
                                            </tr>
                                            <tr className="checkout-item">
                                                <td>Discount(5%)/Coupon</td>
                                                <td>₹ <span>{context.invoice.discount}</span> + FLAT199OFF</td>
                                            </tr>
                                            <tr className="checkout-item total">
                                                <th>Total</th>
                                                <th>₹ <span>{context.invoice.payableAmount}</span></th>
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
