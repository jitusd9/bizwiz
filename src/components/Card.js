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

    const handleBtn = () => {
        setButton(!button);
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
                            <p className={style["item-price"]}>{props.price}</p>
                            <p className={style["item-seller"]} >sold by  <span> <a href="http://localhost:3000/barat-store">{props.seller}</a></span> </p>
                            
                            {   
                                props.controls ? <Stack spacing={1} direction="row" m={1} justifyContent="center">
                                        
                                        {
                                            props.thisIsInCart ? 
                                            <Button data-state="add" data-itemid={props.key} onClick={(e) => {  context.addToCart(e.target.dataset.state, props.id); handleBtn(); }} style={{backgroundColor: '#fd1a1a', color: '#FFFFFF'}} variant="contained" size="small" startIcon={<DeleteIcon/>}>
                                            Remove
                                            </Button> : 
                                            <Button data-state="remove" data-itemid={props.key} onClick={(e) => { context.addToCart(e.target.dataset.state, props.id); handleBtn(); }} style={{backgroundColor: '#ffa919', color: '#FFFFFF'}} variant="contained" size="small" startIcon={<AddShoppingCartIcon/>}>
                                            Add
                                            </Button>
                                        }
                                        
                                        <Link to="/checkout">
                                            <Button  style={{backgroundColor: '#ff6347', color: '#FFFFFF'}} variant="contained" size="small" >
                                            Buy Now
                                            </Button>
                                        </Link>
                                    </Stack> : <Stack spacing={1} direction="column" m={1}>
                                        <label>Quantity <input type="number" min="1" />  </label>
                                        <Button style={{backgroundColor: '#fd150f', color: '#fff', border: 'none'}} variant="outlined" size="small" startIcon={<DeleteIcon/>} data-itemkey={props.docId} onClick={(e) => { context.removeFromCart(e.target.dataset.itemkey); }} >Remove Item</Button>
                                    </Stack>
                            }
                                
                        </div>
                    </div>
                )
            }
            </CartContext.Consumer>
        )
}
