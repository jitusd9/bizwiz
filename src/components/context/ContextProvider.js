import React, {useState, useEffect} from 'react'
import AuthContext from './AuthContext'
import ThemeContext from "./Theme-context"
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function ContextProvider(props) {
    
    const [user, loading] = useAuthState(auth);
    const [theme, setTheme] = useState('theme-light');

    console.log(loading ? "loading...it" : user?.email);  
    const userEmail = user?.email;

    // const theme = 'theme-light';
    console.log('theme provider : ', theme);

    if(loading){
        return(
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
        )
    }else{
        return (
            <ThemeContext.Provider value={{theme, setTheme}}>
                <AuthContext.Provider value={{userEmail: userEmail}}>
                    {props.children}
                </AuthContext.Provider>
            </ThemeContext.Provider>
        )
    }

}

