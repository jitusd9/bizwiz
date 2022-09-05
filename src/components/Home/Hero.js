import React from 'react'
import Products from "../Products/Products"
import style from "../../styles/products.module.css"
import shopping_girl from "../../images/shopping.png"


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
			<div >
					<Products />
			</div>
		</div>
	)
}
