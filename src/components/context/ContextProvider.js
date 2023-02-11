import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import Loader from "../Utils/Loader";

const ThemeContext = React.createContext();
const AuthContext = React.createContext();
const CartContext = React.createContext();

const ProductContext = React.createContext();


function ContextProvider(props) {
    
	const [theme, setTheme] = useState('theme-dark');
	const [user, loading] = useAuthState(auth);
	// all products 
	const [products, setProducts] = useState([]);
	// userCart products
	const [itemInCart, setItemInCart] = useState([]);

	const [invoice ,setInvoice] = useState(null);
	// context for cart 
	const [itemCount, setItemCount] = useState(0);

	let itemData = {
		key : false
	}

	async function addToCart(id,quantity){

		if(user && quantity > 0){
			const docRef = doc(db, 'users', user.uid);							
			const docSnap = await setDoc(doc(docRef, 'userCart', id), {
				quantity : quantity,
			});
			fetchCartFromUser(user.uid);
			return docSnap;
		}else if(user){
			removeFromCart(id);
			fetchCartFromUser(user.uid);
		}else{
			alert('You need to login first');
		}
	}
    
	async function removeFromCart(id){   
		if(user){ 
			const user = auth.currentUser;
  		const docRef = doc(db, 'users', user.uid);
  		await deleteDoc(doc(docRef, 'userCart', id));
			fetchCartFromUser(user.uid);
		}else{
			alert('You need to login first');
		}
	}

	// CALCULATE THE BILL OF ADDED ITEMS 
	const calculateInvoice = function() {  
		console.log(itemInCart);
		let basePrice = 0;
		let totalTAX = 0;
		let itemCost = 0;
		itemInCart.forEach(item => {
		let itemPrice = Number(item.itemPrice);


		let tax = Math.floor((itemPrice * 12) / 100);
		let withoutTAX = itemPrice - tax;

		totalTAX = totalTAX + tax;

		itemCost += (itemPrice * item.quantity)
			basePrice = basePrice + (withoutTAX * item.quantity)
		});

		let afterTAX = basePrice + totalTAX;

		let discount = Math.floor((afterTAX * 5) / 100); 
		let afterDiscount = afterTAX - discount;

		let payableAmount = afterDiscount - 199;
		
		setInvoice({payableAmount,itemCost, basePrice, totalTAX, discount});
	}


	async function fetchCartFromUser(userid){
		let count = 0;
		const userCartInUser = collection(db, `users/${userid}/userCart`);

		const snapshot = await getDocs(userCartInUser);
	
		if(snapshot){
			let newArr = [];
			snapshot.docs.forEach(doc => {
				let newObj = findItemInProducts(doc.id, doc.data().quantity);
				newArr.push(newObj);
				count += doc.data().quantity;
			});
			setItemInCart(newArr)
			setItemCount(count);
		}
	}
 
	function FetchAllProducts(snapshot) {  
			var itemData = [];
			try{
					snapshot.forEach((doc) => { 
						let itemObj = {
						itemId : doc.id,
						itemData : doc.data()
					}
					itemData.push(itemObj);
				})
				setProducts(itemData);
			}catch(err){
				console.error(err);
				return err;
			}
	}

	function findItemInProducts(id,quantity){
		let foundObj = products.find(itemObj => itemObj.itemId === id);
		console.log('found:',foundObj);
		if(foundObj){
			let dataObj = foundObj.itemData;
			dataObj.id = id;
			dataObj.quantity = quantity;
			return dataObj;
		}else{
			console.log('item not found in products fetched might be deleted!')
		}

	}


	useEffect(() => {
		const unsub = onSnapshot(collection(db, "products"), (querySnapshot) => {  
			FetchAllProducts(querySnapshot);
		});

		return(() => {
			unsub();
		})

	},[])

	useEffect(() => {
		if(user && products.length > 0){
			console.log('now call cart items')
			fetchCartFromUser(user.uid);
		}else{
			console.log('loading...')
		}

	},[user, products])

    if(loading){
			return(
				<div>
					<Loader />
				</div>
			)
    }else{
      return (
				<ThemeContext.Provider value={{theme, setTheme}}>
					<AuthContext.Provider value={{user}}>
						<ProductContext.Provider value={{products, itemInCart, calculateInvoice}}>
							<CartContext.Provider value={{itemCount ,addToCart, invoice, calculateInvoice, itemData, itemInCart, removeFromCart}}>
								{props.children}
							</CartContext.Provider>
						</ProductContext.Provider>
					</AuthContext.Provider>
				</ThemeContext.Provider>
      )
    }

}

export {
    ContextProvider,
    ThemeContext,
    AuthContext,
    CartContext,
    ProductContext,
}
