import React, { Component } from 'react'
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

    constructor(props){
        super(props);

        this.state = {
            DataIsLoaded : true,
            idFromUser : []
        }
    }

    executeScroll = () => {
        this.myRef.current.scrollIntoView();
    }

    // Fetch Current User If he have saved any items previousely in The CART
    fetchCurrentUser = async () => {
        console.log('fetching current User...');
            let user = auth.currentUser;
            // console.log(user.uid);
            if(user){
                const docRef = doc(db, 'users', user.uid);
                
                const docSnap = await getDocs(collection(docRef, 'userCart'));

                if(docSnap){
                    // find the list of products User added to cart
                    // PUSH THIS LOGIN IN CONTEXT COMPONENT SO THAT AVAILABLE IN CHECKOUT PAGE AS WELL
                    let { idFromUser } = this.state; 
                    docSnap.docs.forEach(element => {
                        // console.log(element.data().itemID);
                        let thisisdata = element.data()
                        let itemdObj = {
                            productId : thisisdata.itemId,
                            itemId : element.id
                        }
                        idFromUser.push(itemdObj);
                    });

                    this.setState({
                        idFromUser : idFromUser,
                        DataIsLoaded : false
                    })

                }else{
                    console.log('No Such Document');
                }
                }else{
                    console.log('User Not Logged IN...');
                }
       
    };

    componentDidMount(){
        this.fetchCurrentUser();
    }

    render() {
        
        const { DataIsLoaded } = this.state;
        // console.log(items);
        if(DataIsLoaded){
            console.log('laoding.....');
            return(
                <div className={style["products"]}>
                    <Loader loading={DataIsLoaded}/>
                </div>
            )
        }else{
            // console.log('painting ', items);
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
                                    let carted = this.context.added;
                                    console.log(this.state.idFromUser)

                                    carted = this.state.idFromUser.some(cartItem => cartItem.productId === item.itemId);

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
}

