import React, { Component } from 'react'
import Card from './Card'
import { CartContext } from './context/ContextProvider'

import shoe from "../images/shoe.png"
import heals from "../images/diamond.png"
import deo from "../images/deodrant.png"
import ssd from "../images/ssd.png"
import img from '../images/placeholder_banner.png'
import style from "../styles/products.module.css"

export default class Products extends Component {

    constructor(props){
        super(props);

        this.state = {
            items : [],
            DataIsLoaded : false,
            err : false,
            errName : null,
            imageFile : "",
            uploadClass : false
        }
    }

    executeScroll = () => {
        this.myRef.current.scrollIntoView()
    }

    uploadForm = () => {
        this.setState({
            uploadClass : !this.state.uploadClass
        })
    }

    handleFile = (e) => {
        console.log('file handled', e.target.files[0]);
        this.setState({
            imageFile : e.target.files[0]
        })
    }

    upload = () => {
        console.log('data uploaded');
        this.setState({
            uploadClass : !this.state.uploadClass
        })
    }

    componentDidMount(){
            fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) =>{ 
                // console.log(res);
                if(res.ok){
                    return res.json()
                }else{
                    this.setState({
                        err : true,
                        DataIsLoaded : false,
                        errName : res.status
                    })
                    // console.log(res);
                    throw res.status
                }
            })
            .then((json) => {
                this.setState({
                    items : json,
                    DataIsLoaded: true,
                    err: false
                });
            })
            .catch((err) => {
                this.setState({
                    err : true,
                    DataIsLoaded : false,
                    errName : err.toString()
                })
                console.log('She told you not to worry about that error, The ERROR :' ,  err);
            })
    }

    render() {

        const { DataIsLoaded, items, err, errName, uploadClass} = this.state;

        const pics = [shoe, heals, deo, ssd];

        if(!DataIsLoaded && !err){
            return (
                <div>
                    <h1>please wait products are loading...</h1>
                </div>
            )
        }else if(err){
            console.log('this executed now err');
            return(
                <div className="error-block">
                    <h2>She told you not to worry about errors.</h2>
                    <h1><span> 😬 </span>{errName}</h1>
                </div>
            )
        }else if(DataIsLoaded){
            // console.log("items :" + items);
            // console.log("data :" + DataIsLoaded);
            // console.log("err :" + err);
            return (
                <CartContext.Consumer>{
                    context => (
                        <div ref={this.props.scrollRef}> 
                        <center>
                            <button onClick={this.uploadForm}>Upload Products</button>
                        </center>                   
                            
                            <div className={`${style["uploadData"]} ${style[uploadClass ? "collapse" : ""]}`}>
                            <button className={style["cross-btn"]} onClick={this.uploadForm}>❌</button>
                                <center>
                                <p>Fill Item Details and Upload</p>

                                    <input type="text" name="itemName" placeholder='Item Name'/>
                                    
                                    <input type="text" name="itemCategory" placeholder='Item Category i.e. shoes, t-shirt, watch etc.'/>
                                    <input type="file" onChange={this.handleFile} />
                                    
                                    <input type="number" name="price" placeholder='item price in Indian Rupees'/>
                                    
                                    <input type="text" name="seller" placeholder='seller Name'/>
                                    <button onClick={this.upload}>Upload</button>
                                </center>
                            </div>
                            <div className={style["search-bar"]}>
                                <input className={style["search-input"]} type="text" placeholder="search products..."/>
                            </div>
                            <div className={style["products"]}>
                                {   
                                    items.map((item )=> {
                                        let num = Math.floor(Math.random() * 3);
                                        return(
                                            <Card theguy={context.addToCart} isAdded={context.itemData.key} photo={pics[num]} key={item.id} title={item.name} item={"running shoe"} price="₹8,799" controls="true"/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                </CartContext.Consumer>
            )
        }
    }
}

