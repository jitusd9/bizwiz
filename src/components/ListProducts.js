import React, { useState, useEffect, useContext} from 'react';
import { CartContext } from './context/ContextProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db , logout, storage} from "../firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Card from "./Card"

import style from "../styles/products.module.css"
import ssd from "../images/ssd.png"

export default function ListProducts() {

    const [user, loading] = useAuthState(auth);
    const [items, setItems] = useState([]);

    // get logged in user 
    const fetchProducts = async () => {
        
        console.log('fetching Products...');
        try{
            //get data 
            const querySnapshot = await getDocs(collection(db, "products"));

            querySnapshot.forEach((doc) => {
                // console.log(doc.id, "=>", doc.data());
                items.push(doc.data());
            })
            
        }catch(err){
            console.error(err);
        }
    };

    useEffect(
        ()=> {
         fetchProducts();
        },
        [items]
    )

    return(
            <div className={style["products"]}>
                {
                    items.map((item) => {
                        return(
                            <Card photo={item.itemThumbURL} title={item.itemName} item={item.itemCategory} price={item.itemPrice} seller={item.itemSeller} controls="true"/>
                        )
                    })
                }
            </div>  
    );
}
