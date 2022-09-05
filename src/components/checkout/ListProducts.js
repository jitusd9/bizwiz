import { CartContext } from '../context/ContextProvider';

import Card from "../Utils/Card"

import style from "../styles/products.module.css"


function ListProducts() {

    return(
			<CartContext.Consumer>{
				cartContext => {
					<div className={style["products"]}>
					{
						cartContext.itemInCart.map((item) => {
							return(
								<Card photo={item.itemThumbURL} title={item.itemName} item={item.itemCategory} price={item.itemPrice} seller={item.itemSeller} controls="true"/>
							)
						})
					}
					</div>
				}
			} 
			</CartContext.Consumer> 
    );
}

export default ListProducts