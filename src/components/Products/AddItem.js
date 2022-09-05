import { useState } from "react";
// firebase imports 
import { db, storage, } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection} from "firebase/firestore"

function AddItem() {

	const [itemName, setitemName] = useState("");
	const [itemCategory, setitemCategory] = useState("");
	const [itemPrice, setitemPrice] = useState(0);
	const [itemSeller, setitemSeller] = useState("");
	const [imageFile, setimageFile] = useState(null);

	const [uploaded, setUploaded] = useState(false);
    
  const handleChange = (e) => {
      console.log('handling change');
      console.log(e.target.name);
		switch (e.target.name) {
			case "itemName":
				setitemName(e.target.value)
				break;
			case "itemCategory":
				setitemCategory(e.target.value)
				break;
			case "itemPrice":
				setitemPrice(e.target.value)
				break;
			case "itemSeller":
				setitemSeller(e.target.value)
				break;
			case "imageFile":
				setimageFile(e.target.files[0])
				break;
			default:
				break;
    }
  }

  // upload product to firebase 
  const upload = () => {
		if(imageFile === null){
			return;
		};
		console.log(imageFile);
		setUploaded(true);
		
		console.log('uploading...');

		// upload image 
		let metadata = {
			contentType : imageFile.type
		}
		console.log(imageFile);
		// upload file and metadata to the object 'images/FILE_NAME.jpg'
		const storageRef = ref(storage, 'products/' + imageFile.name);
		const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

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
										itemName: itemName,
										itemCategory: itemCategory,
										itemPrice : itemPrice,
										itemSeller: itemSeller,
										itemThumbURL : downloadURL
								});
						}).then(()=>{
								setimageFile(null);
								setUploaded(false);
						}).catch(err => {
								console.log('ohh god some errors', err);
						})
				}
		)

    }

  return(
		<div>
			<p>Fill Item Details and Upload</p>

			<input type="text" onChange={handleChange} name="itemName" value={itemName} placeholder='Item Name'/>
				
			<input type="text" onChange={handleChange} name="itemCategory" value={itemCategory} placeholder='Item Category i.e. shoes, t-shirt, watch etc.'/>
			<input type="file" onChange={handleChange} name="imageFile" accept="image/png, image/jpeg"/>
				
			<input type="number" onChange={handleChange} name="itemPrice" value={itemPrice} placeholder='item price in Indian Rupees'/>
				
			<input type="text" onChange={handleChange} name="itemSeller" value={itemSeller} placeholder='seller Name'/>
			<button onClick={upload}>Upload</button>
		</div>
  )
}

export default AddItem;