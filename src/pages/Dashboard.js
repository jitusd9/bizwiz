import React, {useState ,useEffect, useContext} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router";
import style from "../styles/dashboard.module.css";
import { auth, logout, db, storage } from "../firebase";
import { collection, getDocs, query, doc, getDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import {AuthContext} from "../components/context/ContextProvider";
import cat_pic from "../images/boss.png"
import { Redirect } from 'react-router-dom'
import Loader from "../components/Loader";

function Dashboard(){
    const [user, loading] = useAuthState(auth);
    const [userData, setUser] = useState(null);

    // upload file feature
    const [image, setImage] = useState(' ');

    const upload = () => {
        if(image === ' ')return;

        //create the file metadata 
        const metadata = {
            contentType : 'image/jpeg',
        }

        // upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

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
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User does not have permission to access the object');
                        break;
                    case 'storage/canceled' :
                        console.log('User blocked the upload');
                    case 'storage/unknown':
                        console.log('Unknown error occurred');
                }
            },
            () => {
                setImage(' ');
                // upload completed successfully, now we can get the download URL 
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('will update photoURL');
                    updateDoc(doc(db, 'users', user.uid), {
                        photoURL : downloadURL
                    })
                }).catch(err => {
                    console.log('ohh god some errors', err);
                })
            }
        )
    }

    // const {fetchUserDetails} = useContext(AuthContext);

    const history = useHistory();

    // get logged in user 
    const fetchUserDetails = async () => {
        console.log('fetching...');
        try{
            //  get data 
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                const snapData = docSnap.data();
                setUser(snapData);
                console.log('Document Available :', snapData);
            }else{
                console.log('No Such Document');
            }

        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/signup");
        fetchUserDetails();
        
    }, [user, loading]);

    return(
        <AuthContext.Consumer>
        {
            userContext => {
                if(userContext.user === null){
                    console.log('Changing directory...');
                    history.push('/signup');
                }else{
                    return(
                        <div className={style["dashboard"]}>
                            <div className={style["dashboard_container"]}>
                                <div className={style["cover_pic"]}>
                                    <p className="done">1.done with reading and writing data in firestore</p>
                                    <p className="done">2.upadting profile pic by uploading it in storage and connecting through user.uid.</p>
                                    <p>3.FIX POPUP LOGIN IN MOBILE DEVICES</p>
                                </div>
                                <div className={style["profile"]}>
                                    <div className={style["profile_pic"]}>
                                    {
                                        userData ? <img src={userData ? userData.photoURL : cat_pic} alt="broken pic" /> :
                                        <Loader loading="false" />  
                                    }
                                    </div>
                                    <div className={style["user_name"]}>
                                        <h3>{userData ? userData.displayName : "loading..."}</h3>
                                    </div>
                                    <ul className={style["user_menu"]}>
                                        <li><a href="#">Your History</a></li>
                                        <li><a href="#">Shipping Details</a></li>
                                        <li><a href="#">Account Settings</a></li>
                                    </ul>
                                    <center>
                                    <input type="file" onChange={(e) => {setImage(e.target.files[0]);}}/>
                                    <button onClick={upload}>Upload</button>
                                    </center>
                                    <p>add stripe like navigation tabs</p>
                                    <button className={style["dashboard_btn"]} onClick={logout}>
                                        Logout
                                    </button>
                                    
                                </div>                          
                            </div>
                        </div>
                    
                    )
                }
            }  
        }
        </AuthContext.Consumer>
    );
}

export default Dashboard;