import React, { Component } from 'react'
import { CartContext, AuthContext } from './context/ContextProvider'
import Loader from './Loader'
import Card from "./Card"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import style from "../styles/products.module.css"


// firebase imports 
import { db, storage, } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection, getDocs, getDoc} from "firebase/firestore"


const auth = getAuth();


export default class Products extends Component {

    static contextType = CartContext;

    constructor(props){
        super(props);

        this.state = {
            items : [],
            DataIsLoaded : true,
            DataUploaded : false,
            err : false,
            errName : null,
            uploadClass : false,
            imageFile : null,
            itemName : "",
            itemCategory : "",
            price : 0,
            seller : "",
            flagAdded : false,
            idFromUser : []
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
                    let { idFromUser } = this.state; 
                    docSnap.docs.forEach(element => {
                        // console.log(element.data().itemID);
                        let thisisdata = element.data()
                        // let againObj = {
                        //     itemId : element.data().itemID
                        // }
                        idFromUser.push(thisisdata);
                    });

                    this.setState({
                        idFromUser : idFromUser
                    })

                }else{
                    console.log('No Such Document');
                }
                }else{
                    console.log('User Not Logged IN...');
                }
       
    };

    fetchProducts = async () => {
        
        console.log('fetching user carts...', this.state.idFromUser);
        try{
            //get data 
            const querySnapshot = await getDocs(collection(db, "products"));

            const {items, idFromUser} = this.state;
            // console.log(idFromUser);
            querySnapshot.forEach((doc) => {

                // PSEUDOCODE check if no of IDs user has give 
                console.log('pseudocode should work');
                
                // console.log(idFromUser[0].itemId);

                if(idFromUser.includes(doc.id)){
                    console.log('yes');
                }

                console.log('no it din');
                

                let itemObj = {
                    itemId : doc.id,
                    itemData : doc.data(),
                    flagAdded : this.state.flagAdded
                }
                items.push(itemObj);
                // this.setState({
                //     flagItem : false
                // })
            })

            this.setState({
                items : items,
                DataIsLoaded : false
            })

            
        }catch(err){
            console.error(err);
        }
    };

    componentDidMount(){
        console.log('fetching');
        this.fetchCurrentUser();
        this.fetchProducts();
    }

    render() {
        
        const { DataIsLoaded, DataUploaded, items, uploadClass } = this.state;
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
                <div className={style["listOfItems"]}> 
                    <p className="comment"> <span> shift upload item button to Dashboard page</span></p>
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
                        items.map((item) => {
                            
                            return  <Card key={item.itemId} thisIsInCart={this.context.added} id={item.itemId} photo={item.itemData.itemThumbURL} title={item.itemData.itemName} item={item.itemData.itemCategory} price={item.itemData.itemPrice} seller={item.itemData.itemSeller} controls="true"/>
                        })
                    }
                    </div>
                </div>
            )
        }
    }
}

