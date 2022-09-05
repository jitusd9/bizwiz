import React, { useContext } from 'react'
import { ProductContext, CartContext } from '../context/ContextProvider'
import Card from "../Utils/Card"

import style from "../../styles/products.module.css"


export default function Products() {

    const productContext = useContext(ProductContext)
    const cartContext = useContext(CartContext);

    return(
    <div className={style["listOfItems"]}> 
        <div className={style["search-bar"]}>
            <input className={style["search-input"]} type="text" placeholder="search products..."/>
        </div>
        <div className={style["products"]}>   
        {
            productContext.products.map((item) => {
                let carted = false;
                let found = cartContext.itemInCart.find(itemObj => itemObj.id === item.itemId)
                if(found){
                    console.log(found.quantity)
                    carted = true;
                }
                return  <Card key={item.itemId} added={carted} qty={found ? found.quantity : 0} id={item.itemId} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice} seller={item.itemData.itemSeller} controls="true"/>
            })
        }
        </div>
    </div>
    )
    
}

