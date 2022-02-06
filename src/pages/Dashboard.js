import React, {useState ,useEffect, useContext} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router";
import style from "../styles/dashboard.module.css";
import { auth, logout, db } from "../firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore"

import AuthContext from "../components/context/AuthContext";
import cat_pic from "../images/boss.png"
import { Redirect } from 'react-router-dom'

function Dashboard(){
    const [user, loading] = useAuthState(auth);
    const [userData, setUser] = useState(null);

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
                console.log('Document Available :', userData.displayName)
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
                {/* console.log('userContext :', userContext.user); */}
                if(userContext.user === null){
                    console.log('Changing directory...')
                    history.push('/signup');
                }else{
                    return(
                        <div className={style["dashboard"]}>
                            <div className={style["dashboard_container"]}>
                                <div className={style["cover_pic"]}></div>
                                <div className={style["profile"]}>
                                    <div className={style["profile_pic"]}>
                                        <img src={userContext.user.photoURL ? userContext.user.photoURL : cat_pic} alt="profile" />
                                    </div>
                                    <div className={style["user_name"]}>
                                        <h3>{userContext.user.displayName ? userContext.user.displayName : "no_name"}</h3>
                                    </div>
                                    <ul className={style["user_menu"]}>
                                        <li><a href="#">Your History</a></li>
                                        <li><a href="#">Shipping Details</a></li>
                                        <li><a href="#">Account Settings</a></li>
                                    </ul>
                                    <p>add stripe like navigation tabs</p>
                                    <button className={style["dashboard_btn"]} onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                                
                                {/* <div>{user?.displayName}</div> */}
                                
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