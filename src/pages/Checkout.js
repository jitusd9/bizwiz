import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import pic from '../images/shoe.png'
import ssd from '../images/ssd.png'

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

export default function Checkout() {

    const [items , setItems] = useState(0);
    
    const sum = 14927.24;

    if(items === 0){
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
        return (
            <div className="checkout">
                <div className="cart-summary">
                    <Card photo={pic} title="Nike" item="running shoe" price="₹8,799"/>
                    <Card photo={ssd} title="SandDisk" item="500 GB SSD" price="₹5,499"/>
                </div>
                <div className="payment-summary">
                    <h3>Payments summary</h3>
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
                                <th>₹ {sum}</th>
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
