import React, { Component } from 'react'
import Card from './Card'

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
            errName : null
        }
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

        const { DataIsLoaded, items, err, errName} = this.state;

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
                <div>
                    
                    <div className={style["search-bar"]}>
                        <input className={style["search-input"]} type="text" placeholder="search products..."/>
                    </div>
                    <div className={style["products"]}>
                        {   
                            items.map((item )=> {
                                let num = Math.floor(Math.random() * 3);
                                return(
                                    <Card photo={pics[num]} key={item.id} title={item.name} item={"running shoe"} price="₹8,799" controls="true"/>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

