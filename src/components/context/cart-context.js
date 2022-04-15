// firebase imports 
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase'
import { doc, setDoc, addDoc, collection, query, where, getDocs, deleteDoc} from "firebase/firestore"

const auth = getAuth();

// add item to cart in firebase userCart 
async function addItemToCart(product, count=1){
  
  // adding item first time 

  console.log(product);

  if(count === 0) count = 1;

  let user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
                
  const docSnap = await setDoc(doc(docRef, 'userCart', product.itemId), {
    data : product.itemData,
    quantity : count ,
    id : product.itemId
  });

  // updating item count 
  // await updateDoc(docRef, {
  //   quantity: quantity + 1;
  // });

  console.log('item added to user cart');
}

// remove item from userCart 
async function removeItemFromCart(itemId){

  console.log(itemId);

  const user = auth.currentUser;
  const docRef = doc(db, 'users', user.uid);

  // if Items are removed via minus button 

  // const q = query(doc(docRef, 'userCart', itemId));

  // const querySnapshot = await getDocs(q);
  // let deleteThem = [];
  // querySnapshot.forEach((doc) => {
  //   deleteThem.push(doc.id);
  //   console.log(doc.id, '=>', doc.data());
  // });

  // deleteThem.forEach(async (deleteIt) => {
  //   console.log('Deleting...', deleteIt);

  //   await deleteDoc(doc(docRef, 'userCart', deleteIt))

  // })


  // if entire Item card if removed 
  console.log('deleting...');

  // const snap = await getDocs(doc(docRef, 'userCart', itemId));

  // snap.forEach(q => {
  //   console.log(q.data());
  // })

  await deleteDoc(doc(docRef, 'userCart', itemId));

  console.log('item removed from cart', );
}

// export default function CartContext() {
//   return (
//     <div>CartContext</div>
//   )
// }


export {addItemToCart, removeItemFromCart};