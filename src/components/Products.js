import React, { Component } from 'react'
import Card from './Card'
import { CartContext } from './context/ContextProvider'

import shoe from "../images/shoe.png"
import heals from "../images/diamond.png"
import deo from "../images/deodrant.png"
import ssd from "../images/ssd.png"
import img from '../images/placeholder_banner.png'
import style from "../styles/products.module.css"

// firebase imports 
import { db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection } from "firebase/firestore"

export default class Products extends Component {

    constructor(props){
        super(props);

        this.state = {
            items : [],
            DataIsLoaded : false,
            err : false,
            errName : null,
            uploadClass : false,
            imageFile : "",
            itemName : "",
            itemCategory : "",
            price : 0,
            seller : ""
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

    handleChange = (e) => {
        // console.log(e.target.name);
        if(e.target.name === "image"){
            this.setState({
                imageFile : e.target.files[0]
            })
        }else{
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    }

    upload = () => {
        if(this.state.imageFile === "") return console.log("Can't update coz of no Image.");;
        console.log('uploading...');

        // upload image 
        let metadata = {
            contentType : this.state.imageFile.type
        }

        // upload file and metadata to the object 'images/FILE_NAME.jpg'
        const storageRef = ref(storage, 'images/' + this.state.imageFile.name);
        const uploadTask = uploadBytesResumable(storageRef, this.state.imageFile, metadata);

        // listen for state changes, errors, and completion of the upload. 
        uploadTask.on('state_changed', 
        (snapshot) => {
            // get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded 
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done.');
                switch (snapshot.state) {
                    case 'paused' : 
                    console.log('Upload is paused');
                    break;
                    case 'running' : 
                    console.log('Upload is running');
                    
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User does not have permission to access the object');
                        break;
                    case 'storage/canceled' :
                        console.log('User blocked the upload');
                        break;
                    case 'storage/unknown':
                        console.log('Unknown error occurred');
                        
                }
            },
            () => {
                this.setState({
                    imageFile : ""
                })
                // upload completed successfully, now we can get the download URL 
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('photo uploaded at ', downloadURL);
                    // add other data after photoURL is available 
                    addDoc(collection(db, "products"), {
                        itemName: this.state.itemName,
                        itemCategory: this.state.itemCategory,
                        itemPrice : this.state.price,
                        itemSeller: this.state.seller,
                        itemThumbURL : downloadURL
                    });

                }).catch(err => {
                    console.log('ohh god some errors', err);
                })
            }
        )

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
                        
                            <button className={style["uploadBtn"]} onClick={this.uploadForm}>Upload Products</button>
                                           
                            
                            <div className={`${style["uploadData"]} ${style[uploadClass ? "collapse" : ""]}`}>
                            <button className={style["cross-btn"]} onClick={this.uploadForm}>❌</button>
                                
                                <p>Fill Item Details and Upload</p>

                                    <input type="text" onChange={this.handleChange} name="itemName" placeholder='Item Name'/>
                                    
                                    <input type="text" onChange={this.handleChange} name="itemCategory" placeholder='Item Category i.e. shoes, t-shirt, watch etc.'/>
                                    <input type="file" onChange={this.handleChange} name="imageFile" accept="image/png, image/jpeg"/>
                                    
                                    <input type="number" onChange={this.handleChange} name="price" placeholder='item price in Indian Rupees'/>
                                    
                                    <input type="text" onChange={this.handleChange} name="seller" placeholder='seller Name'/>
                                    <button onClick={this.upload}>Upload</button>
                                
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

