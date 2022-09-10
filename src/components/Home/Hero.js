import React from 'react'
import Products from "../Products/Products"
import style from "../../styles/products.module.css"
import shopping_girl from "../../images/shopping.png"
import badgeIcon from "../../images/icon/badge.svg"
import couponIcon from "../../images/icon/coupons.svg"
import deliveryIcon from "../../images/icon/delivery.svg"

export default function Hero() {

	return (
		<div>
			<div className={style["hero-section"]} >
				<div className={style["left-section"]}>
					<div className={style["hero-content"]}>
						<h1>Better when it's on </h1>
						<h1><span className={style["curve-style"]}> one place</span> </h1>
					</div>
				</div>
				<div className={style["right-section"]}>
					<div className={style["bg-circle"]}>
						<img src={shopping_girl} alt="shopping girl"/>
					</div>
				</div>
			</div>
			<div className={style["hero-banner"]}>
				<div>
					<img src={couponIcon} alt="Coupons Icon" />
					<p>Special Coupons</p>
				</div>
				<div>
				<img src={deliveryIcon} alt="Delivery Icon" />
					<p>Free Delivery</p>
				</div>
				<div>
				<img src={badgeIcon} alt="Quality Badge" />
					<p>Premium products</p>
				</div>
			</div>
			<div>
					<Products />
			</div>
		</div>
	)
}
