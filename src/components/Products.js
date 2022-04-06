import React, { Component } from 'react'
import { CartContext, ProductContext } from './context/ContextProvider'
import Card from "./Card"

import style from "../styles/products.module.css"


export default class Products extends Component {

    static contextType = CartContext;

    executeScroll = () => {
        this.myRef.current.scrollIntoView();
    }

    render() {
        
            return (  
                <ProductContext.Consumer>  
               {
                   productContext => {
                       return(
                        <div className={style["listOfItems"]}> 
                            <div className={style["search-bar"]}>
                                <input className={style["search-input"]} type="text" placeholder="search products..."/>
                            </div>
                            <div className={style["products"]}>                                       
                            {
                                productContext.products.map((item) => {
                                    let carted = false;
                                    
                                    carted = productContext.itemInCart.some(cartItem => cartItem.productId === item.itemId);

                                    return  <Card key={item.itemId} thisIsInCart={carted} id={item.itemId} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice} seller={item.itemData.itemSeller} controls="true"/>
                                })
                            }
                            </div>
                        </div>
                   )}
               }
                </ProductContext.Consumer> 
            )
    }
}

