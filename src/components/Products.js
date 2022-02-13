import React, { Component } from 'react'
import { CartContext } from './context/ContextProvider'
import ListProducts from './ListProducts'
import Loader from './Loader'
import Card from "./Card"

import style from "../styles/products.module.css"

// firebase imports 
import { db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection, getDocs} from "firebase/firestore"

export default class Products extends Component {

    constructor(props){
        super(props);

        this.state = {
            items : [],
            DataIsLoaded : false,
            DataUploaded : false,
            err : false,
            errName : null,
            uploadClass : false,
            imageFile : null,
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
            uploadClass : !this.state.uploadClass,
            itemName : "",
            itemCategory : "",
            price : 0,
            seller : ""
        })
    }

    handleChange = (e) => {
        // console.log(e.target.name);
        if(e.target.name === "imageFile"){
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
        if(this.state.imageFile === null){
            this.setState({
                itemName : "",
                itemCategory : "",
                price : 0,
                seller : ""
            })
            return;
        };
        
        this.setState({
            DataUploaded : true
        })
        
        console.log('uploading...');

        // upload image 
        let metadata = {
            contentType : this.state.imageFile.type
        }
        console.log(this.state.imageFile);
        // upload file and metadata to the object 'images/FILE_NAME.jpg'
        const storageRef = ref(storage, 'products/' + this.state.imageFile.name);
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
                    break;
                    default :
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
                        break;
                    default :

                }
            },
            () => {
                
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
                }).then(()=>{
                    this.setState({
                        imageFile : null,
                        DataUploaded : false
                    })
                }).catch(err => {
                    console.log('ohh god some errors', err);
                })
            }
        )

    }

    fetchProducts = async () => {
        
        console.log('fetching Products...');
        try{
            //get data 
            const querySnapshot = await getDocs(collection(db, "products"));

            querySnapshot.forEach((doc) => {
                let {items} = this.state;
                items.push(doc.data());
                this.setState({
                    items : items
                })
            })

            this.state.setState({
                DataIsLoaded : false
            })
            
        }catch(err){
            console.error(err);
        }
    };

    componentDidMount(){
        this.fetchProducts();
    }

    render() {
        
        const { DataIsLoaded, DataUploaded, items, uploadClass } = this.state;

        if(DataIsLoaded){
            return(
                <div ref={this.props.scrollRef}>
                    <Loader loading={!DataIsLoaded} />
                </div>
            )
        }else{
            return (     
                <div ref={this.props.scrollRef}> 
                
                    <button className={style["uploadBtn"]} onClick={this.uploadForm}>Upload Products</button>

                    <div className={`${style["uploadData"]} ${style[uploadClass ? "collapse" : ""]}`}>
                    <button className={style["cross-btn"]} onClick={this.uploadForm}>❌</button>

                    {/* <Loader loading={!DataUploaded}/> */}
                    <div>
                        <p>Fill Item Details and Upload</p>

                        <input type="text" onChange={this.handleChange} name="itemName" value={this.state.itemName} placeholder='Item Name'/>
                        
                        <input type="text" onChange={this.handleChange} name="itemCategory" value={this.state.itemCategory} placeholder='Item Category i.e. shoes, t-shirt, watch etc.'/>
                        <input type="file" onChange={this.handleChange} name="imageFile" accept="image/png, image/jpeg"/>
                        
                        <input type="number" onChange={this.handleChange} name="price" value={this.state.itemPrice} placeholder='item price in Indian Rupees'/>
                        
                        <input type="text" onChange={this.handleChange} name="seller" value={this.state.itemSeller} placeholder='seller Name'/>
                        <button onClick={this.upload}>Upload</button>
                    </div>
                                
                    </div>
                    <div className={style["search-bar"]}>
                        <input className={style["search-input"]} type="text" placeholder="search products..."/>
                    </div>
                    <div className={style["products"]}>                                       
                    {
                        items.map((item, i) => {
                            
                            return    <Card key={i} photo={item.itemThumbURL} title={item.itemName} item={item.itemCategory} price={item.itemPrice} seller={item.itemSeller} controls="true"/>
                            
                        })
                    }
                    </div>
                </div>
            )
        }
    }
}

