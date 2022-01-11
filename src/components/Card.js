import React, { Component } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import style from "../styles/products.module.css"


export default class Card extends Component {
    
    render() {
        return (
            <div className={style["card"]}>
                <div className={style["card-image"]}>
                    <img src={this.props.photo} alt="just a shoe" />
                </div>
                <div className={style["card-details"]}>
                    <h3>{this.props.title}</h3>
                    <p className={style["item-name"]}>{this.props.item}</p>
                    <p className={style["item-price"]}>{this.props.price}</p>
                    <p className={style["item-seller"]} >sold by  <span> <a href="http://localhost:3000/barat-store">baratStore</a></span> </p>
                    
                    {
                        this.props.controls ? <Stack spacing={1} direction="column" m={1}>
                                <Button  variant="outlined" size="small" startIcon={<AddShoppingCartIcon/>}>
                                Add to Cart
                                </Button>
                                <Button  style={{backgroundColor: '#ff6347', color: '#FFFFFF'}} variant="contained" size="small" >
                                Buy Now
                                </Button>
                            </Stack> : <Stack spacing={1} direction="column" m={1}>
                                <Button style={{backgroundColor: '#fd150f', color: '#fff', border: 'none'}} variant="outlined" size="small" startIcon={<DeleteIcon/>}>Remove Item</Button>
                            </Stack>
                    }
                         
                </div>

                
                
            </div>
        )
    }
}
