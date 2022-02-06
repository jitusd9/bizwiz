import React, { Component } from 'react'
import Card from '../components/Card'
import pic from '../images/shoe.png'
import ssd from '../images/ssd.png'
import * as LottiePlayer from "@lottiefiles/lottie-player";

import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';

export default class Checkout extends Component {
    render() {

        let sum = 14927.24;
         
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
                <p>line of embarresment</p>
                <div>

                {/* <LottiePlayer
                autoplay
                controls
                loop
                mode="normal"
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{"width: 320px"}}
                >
                </LottiePlayer> */}

                </div>
            </div>
        )
    }
}
