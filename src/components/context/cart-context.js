import React from 'react'
// firebase imports 
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, storage, } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, addDoc, updateDoc, collection, getDocs, getDoc, setDoc, deleteDoc} from "firebase/firestore"

const auth = getAuth();

// add item to cart in firebase userCart 
async function addItemToCart(item){
let user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
                
  const docSnap = await addDoc(collection(docRef, 'userCart'), item);

  console.log('item added to user cart', docSnap);
}

// remove item from userCart 
async function removeItemFromCart(itemId){
  const user = auth.currentUser;
  const docRef = doc(db, 'users', user.uid);

  const docSnap = await deleteDoc(doc(docRef, 'userCart', itemId))

  console.log('item removed from cart', docSnap);
}

export default function CartContext() {
  return (
    <div>CartContext</div>
  )
}


export {addItemToCart, removeItemFromCart};