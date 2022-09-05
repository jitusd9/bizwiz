import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/ContextProvider'
import style from "../../styles/products.module.css"

export default function Card(props){

	const cartContext = useContext(CartContext);

	const [disable, setDisable] = useState(false);

	function increase(click){
		setDisable(true);
		var addPromise;

		if(click === "+"){
			addPromise = cartContext.addToCart(props.id, props.qty + 1);
		}else{
			addPromise = cartContext.addToCart(props.id, props.qty - 1);
		}

		addPromise.then(()=>{
			setDisable(false);
		} , (err) => {
			console.log('failed: error', err)
			setDisable(false);
		})
	}

	function decrease(){

	}

	return (
		<div className={`${style["card"]} ${disable ? style["disabled"] : ""}`}>
			<div className={style["card-image"]}>
				<img src={props.photo} alt="product thumbnail" />
			</div>
			<div className={style["card-details"]}>
				<h3>{props.title}</h3>
				<p className={style["item-name"]}>{props.item}</p>
				<p className={style["item-price"]}><span className={style["rupee-sign"]}>₹</span> {props.price}/-</p>
				{
					props.seller ? 
					<p className={style["item-seller"]} >sold by {props.seller}</p>
					: ""
				}
				{   
					props.controls && !props.added? 
					<div className={style["card-btns"]}>							
						<div>
								<button className={style["add-btn"]} onClick={() => increase('+')}> 🛒 Add</button>
						</div>		
						<Link to="/checkout">
								<button className={style["buy-btn"]} onClick={() => increase('+')}> 🤑 Buy Now</button>
						</Link>
					</div> : 
					<div className={style["card-btns"]}>
						<div className={style["quantity"]}>
								<button title='Decrease Quantity' className={`${style["btn"]} ${style["minus"]}`}
								onClick={() => increase('-')}
								>-</button>
									<p>{props.qty}</p> 
								<button title='Increase Quantity' className={`${style["btn"]} ${style["plus"]}`}
									onClick={() => increase('+')}
								>+</button>
						</div>
					<button className={style["remove-btn"]}> 🗑️ Remove</button>
					</div>
					}   
				</div>
		</div>

	)
}
