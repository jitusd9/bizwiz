import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import style from "../styles/dashboard.module.css";
import { auth, db, logout } from "../firebase";
import AuthContext from "../components/context/AuthContext";
import cat_pic from "../images/boss.png"

function Dashboard(){
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();
    const fetchUserName = async () => {
        try{
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
        }catch(err){
            console.error(err);
            // alert("An error accured while fetching user data");
        }
    };
    useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/signup");
        const userName = fetchUserName();
        // console.log('userName injected via Dashboard.js', userName);
    }, [user, loading]);

    

    return(
        <AuthContext.Consumer>
        {
            context => {
                const testContext = context;
                console.log('testContext', testContext.userEmail);
                return(
                    <div className={style["dashboard"]}>
                        <div className={style["dashboard_container"]}>
                            <div className={style["cover_pic"]}></div>
                            <div className={style["profile"]}>
                                <div className={style["profile_pic"]}>
                                    <img src={cat_pic} alt="profile" />
                                </div>
                                <div className={style["user_name"]}>
                                    <h3>{testContext.userEmail}</h3>
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
                            
                            {/* <div>{user?.email}</div> */}
                            
                        </div>
                    </div>
                )
            }

        }
        
        </AuthContext.Consumer>
    );
}

export default Dashboard;