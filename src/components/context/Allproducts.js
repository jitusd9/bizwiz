// firebase imports 
import { db } from '../../firebase'
import { doc, addDoc, updateDoc, collection, getDocs, getDoc} from "firebase/firestore"

async function FetchAllProducts() {  
    var itemData = [];
    try{
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
           console.log(doc.id);
           itemData.push(doc);
        })
        
    }catch(err){
        console.error(err);
        return err;
    }
    return itemData;
}

function test() {
    return 'just a test func'
}


export { FetchAllProducts, test }