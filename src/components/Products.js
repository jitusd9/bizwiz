import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CartContext, AuthContext, ProductContext } from './context/ContextProvider'
import Loader from './Loader'
import Card from "./Card"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import style from "../styles/products.module.css"


// firebase imports 
import { db, storage, } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection, getDocs, getDoc} from "firebase/firestore"

import { FetchAllProducts } from './context/Allproducts'

const auth = getAuth();

export default class Products extends Component {

    static contextType = CartContext;

    // constructor(props){
    //     super(props);

    //     this.state = {
    //         DataIsLoaded : false,
    //         idFromUser : []
    //     }
    // }

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

                                    return  <Card key={item.id} thisIsInCart={carted} id={item.itemId} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice} seller={item.itemData.itemSeller} controls="true"/>
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

