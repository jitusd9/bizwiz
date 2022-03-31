import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './context/ContextProvider'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import style from "../styles/products.module.css"

export default function Card(props){

    const [button, setButton] = useState(false);
    const [itemQty, setItemQty] = useState(props.count);
    const [productQty, setProductQty] = useState(1);

    const handleQty = (e) => {
        if(e.target.dataset.plus){
            setItemQty(itemQty + 1);
            setProductQty(productQty + 1)
            console.log('increase');
        }else{
            if(itemQty === 1 || productQty === 1){
                setItemQty(1);
                setProductQty(1);
            }else{
                setItemQty(itemQty - 1);
                setProductQty(productQty - 1);
            }
            console.log('decrease');
        }
    }

    const handleBtn = (e) => {
        setButton(!button);
        console.log(e.target.dataset.state);
    }
    
        return (
            <CartContext.Consumer>
            {
                context => (
                    <div className={style["card"]}>
                        <div className={style["card-image"]}>
                            <img src={props.photo} alt="product thumbnail" />
                        </div>
                        
                        <div className={style["card-details"]}>
                            <h3>{props.title}</h3>
                            <p className={style["item-name"]}>{props.item}</p>
                            <p className={style["item-price"]}><span className={style["rupee-sign"]}>₹</span> {props.price}/-</p>
                            {
                                props.seller ? 
                                <p className={style["item-seller"]} >sold by  <span> <a href="http://localhost:3000/barat-store">{props.seller}</a></span> </p>
                                : ""
                            }
                            
                            {   
                                props.controls ? <div className={style["card-btns"]}>
                                        
                                        {
                                            props.thisIsInCart ? 
                                            <div className={style["quantity"]}><span className={`${style["btn"]} ${style["minus"]}`} data-minus onClick={handleQty}>-</span> <span>{productQty}</span>  <span className={`${style["btn"]} ${style["plus"]}`} data-plus onClick={(e) => { context.addToCart(props.id); handleQty(e);}}>+</span></div>
                                             : 
                                             <div>
                                            <Button data-state="add" data-itemid={props.id} onClick={(e) => { context.addToCart(props.id); handleBtn(e); }} style={{backgroundColor: '#ffa919', color: '#FFFFFF'}} variant="contained" size="small" startIcon={<AddShoppingCartIcon/>}>
                                            Add
                                            </Button>
                                             </div>
                                            
                                        }
                                        
                                        <Link to="/checkout">
                                            <Button  style={{backgroundColor: '#ff6347', color: '#FFFFFF'}} variant="contained" size="small" >
                                            Buy Now
                                            </Button>
                                        </Link>
                                    </div> : <Stack spacing={1} direction="column" m={1}>
                                        <div className={style["quantity"]}>Quantity <span className={`${style["btn"]} ${style["minus"]}`} data-minus onClick={handleQty}>-</span> <span>{itemQty}</span>  <span className={`${style["btn"]} ${style["plus"]}`} data-plus onClick={handleQty}>+</span></div>
                                        <Button style={{backgroundColor: '#fd150f', color: '#fff', border: 'none'}} variant="outlined" size="small" startIcon={<DeleteIcon/>} data-itemkey={props.docId} onClick={(e) => { context.removeFromCart(props.docId); }}>Remove</Button>
                                    </Stack>
                            }
                                
                        </div>
                    </div>
                )
            }
            </CartContext.Consumer>
        )
}


{/* <Button data-state="remove" data-itemid={props.id} onClick={(e) => {  context.removeFromCart(props.id); handleBtn(e); }} style={{backgroundColor: '#fd1a1a', color: '#FFFFFF'}} variant="contained" size="small" startIcon={<DeleteIcon/>}>
                                            Remove
                                            </Button> */}