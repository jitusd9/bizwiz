import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../components/context/ContextProvider'
import Card from '../components/Utils/Card'

export default function Checkout() {

	const context = useContext(CartContext);
	const [modal, setModal] = useState(false);

	const [cartItem, setCartItem] = useState([])
	
	function openModal(){
		setModal(!modal);
	}
	

	if(context.itemInCart.length < 1){
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
				{
					modal ? 
					<div className='payment-modal'>
						<div className='option-box'>
							<h3>Choose Your Payment Mode</h3>
							<button onClick={openModal}>❌</button>
							<div>
								<div className="payment-btn">
									<Link to="/payment">
										<button> Snipcart </button>
									</Link>
								</div>
								<div className="payment-btn">
									<Link to="/payment">
										<button> Fakecart </button>
									</Link>
								</div>
							</div>
						</div>
					</div> : null
					}
				<div className="cart-summary">
					{
						context.itemInCart.map((item) => {
							return <Card key={item.id} id={item.id} qty={item.quantity} photo={item.itemThumbURL} title={item.itemName} item={item.itemCategory} price={item.itemPrice} />
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
						<button onClick={openModal}>Proceed to Pay</button>
					</div>
					</div> : null
				}
			</div>
		)
	}

}
