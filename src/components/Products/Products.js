import React, { Component } from 'react'
import { CartContext, ProductContext } from '../context/ContextProvider'
import Card from "../Utils/Card"

import style from "../../styles/products.module.css"


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
                            <h2>Products saved in Database</h2>                                    
                            <div className={style["products"]}>   
                            {
                                productContext.products.map((item) => {
                                    
                                   var cartHaveItem = false;
                                   var itemQty = 0;
            
                                    productContext.itemInCart.some(cartItem => {
                                        
                                        if(cartItem.id === item.itemId){
                                            cartHaveItem = true;
                                            itemQty = cartItem.quantity;
                                            return true;
                                        }
                                    })

                                    {/* console.log('cartHaveItem', cartHaveItem, itemQty); */}

                                    return  <Card key={item.itemId} thisIsInCart={cartHaveItem} count={itemQty} id={item.itemId} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice} seller={item.itemData.itemSeller} controls="true"/>
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

