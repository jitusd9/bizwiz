import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, updateProfile} from '@firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuyOwsLttyCQ2-4csnXQ2FhEPgCLabzWk",
  authDomain: "bizwiz-3d98c.firebaseapp.com",
  projectId: "bizwiz-3d98c",
  storageBucket: "bizwiz-3d98c.appspot.com",
  messagingSenderId: "606677032471",
  appId: "1:606677032471:web:5955719e1ab5dc3e0bc652",
  measurementId: "G-2CDND1SCRZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);



// Monitoring Authentication State

const checkAuthState = () => {
    try{
        let res;
        onAuthStateChanged(auth,(user) => {
            if(user){
                console.log('checkAuthState Response : ', user);
                res = user.uid;
            }else{
                console.log("User not signed In firebase");
                return 'nothing'
            }
        })
        return res;
    }catch(err){
        console.log('checkAuthState Error : ', err);
    }
}


// SIGNIN FROM GOOGLE AUTHENTICATION FIREBASE 
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try{
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        // const query = await db
        // .collection("users")
        // .where("uid", "==", user.uid)
        // .get();

        // const querySnapshot = await getDocs(collection(db, "users"));
        // console.log(querySnapshot);

        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoURL : user.photoURL,
        });

        // querySnapshot.forEach((doc) => {
        //     console.log(`${doc.data()}`);
        // })
        
        // if (querySnapshot.docs.length === 0) {
        //     await db.collection("users").add({
        //       uid: user.uid,
        //       name: user.displayName,
        //       authProvider: "google",
        //       email: user.email,
        //     });
        //   }

    }catch(err){
        console.error(err);
        // alert(err.message);
    }
}

// SIGNIN WITH EMAIL AND PASSWORD 

const loginWithEmail = async (email, password) => {
    try{
        console.log('auth-before login : ' , auth.currentUser);
        const res = await signInWithEmailAndPassword(auth, email, password)
                .then(data => {
                    console.log('loginWithEmail ::', data);
                })
        return res;
    }catch(err){
        console.log(err);
        return err; 
    }
}


// SIGNUP OR REGISTER NEW USER WITH EMAIL AND PASSWORD 
const registerWithEmailAndPassword = async (username, email, password) => {
    let message;
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.dir(user);
            setDoc(doc(db, "users", user.uid), {
                displayName: username,
                email: user.email,
                photoURL : user.photoURL,
            });
            
            console.log("user : ", user.displayName);

        })
        return res;
    }catch(err){
        console.error(err);
        console.log(err.message);
        message = err.message;
    }
    return message;
}

// PASSWORD RESET LINK TO EMAIL ID 
const sendPasswordResetEmail = async (email) => {
    try{
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    }catch(err){
        console.error(err);
        // alert(err.message);
    }
};

// LOGOUT BUTTON 
const logout = () => {
    auth.signOut();
}

// EXPORT ALL THE FUNCTIONS 
export{
    auth,
    db,
    checkAuthState,
    signInWithGoogle,
    loginWithEmail,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
    storage,
}
