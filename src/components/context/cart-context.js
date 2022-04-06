// firebase imports 
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase'
import { doc, addDoc, collection, query, where, getDocs, deleteDoc} from "firebase/firestore"

const auth = getAuth();

// add item to cart in firebase userCart 
async function addItemToCart(item){
let user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
                
  const docSnap = await addDoc(collection(docRef, 'userCart'), item);

  console.log('item added to user cart', docSnap.id);
}

// remove item from userCart 
async function removeItemFromCart(itemId){

  const user = auth.currentUser;
  const docRef = doc(db, 'users', user.uid);

  const q = query(collection(docRef, 'userCart'), where("itemId", "==", itemId));

  const querySnapshot = await getDocs(q);
  let deleteThem = [];
  querySnapshot.forEach((doc) => {
    deleteThem.push(doc.id);
    console.log(doc.id, '=>', doc.data());
  });

  deleteThem.forEach(async (deleteIt) => {
    console.log('Deleting...', deleteIt);

    await deleteDoc(doc(docRef, 'userCart', deleteIt))

  })


  console.log('item removed from cart');
}

// export default function CartContext() {
//   return (
//     <div>CartContext</div>
//   )
// }


export {addItemToCart, removeItemFromCart};