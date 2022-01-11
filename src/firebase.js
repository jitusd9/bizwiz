import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, updateProfile} from '@firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuyOwsLttyCQ2-4csnXQ2FhEPgCLabzWk",
  authDomain: "bizwiz-3d98c.firebaseapp.com",
  projectId: "bizwiz-3d98c",
  storageBucket: "bizwiz-3d98c.appspot.com",
  messagingSenderId: "606677032471",
  appId: "1:606677032471:web:5955719e1ab5dc3e0bc652"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

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
        const query = await db
            .collection("users")
            .where("uid", "==", user.id)
            .get();
        if(query.docs.length === 0){
            await db.collection("users").add({
                uid: user.id,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    }catch(err){
        console.error(err);
        // alert(err.message);
    }
}

// SIGNIN WITH EMAIL AND PASSWORD 

const loginWithEmail = async (email, password) => {
    try{
        console.log('auth-before login : ' , auth.currentUser);
        const response = signInWithEmailAndPassword(auth, email, password);
        console.log('auth-after login : ' , response);
        return 200;
    }catch(err){
        console.log(err);
        return 500; 
    }
}


// SIGNUP OR REGISTER NEW USER WITH EMAIL AND PASSWORD 
const registerWithEmailAndPassword = async (username, email, password) => {
    let message;
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user != null){
                updateProfile(auth.currentUser, {
                    displayName : username
                })
            }
            
            console.log("user : ", user.displayName);

            // db.collection("users").add({
            //     uid: user.uid,
            //     displayName : name,
            //     authProvider: "local",
            //     email,
            // });
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
    logout
}
