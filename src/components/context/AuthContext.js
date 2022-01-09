import React, {Component} from 'react'
import { getAuth } from '@firebase/auth'

const AuthContext = React.createContext();

// export class AuthProvider extends Component{
//     state = {
//         username : "",
//         isAuthenticated : false
//     }

//     logIn = () => {
//         this.setState({username : "Bob", isAuthenticated : true})
//     }
    
//     logOut = () => {
//         this.setState({username : "", isAuthenticated : false})
//     }

//     render(){

//         const {username, isAuthenticated} = this.state;
//         const {logIn, logOut} = this;

//         return(
//             <AuthContext.Provider value={{
//                 username,
//                 isAuthenticated,
//                 logIn,
//                 logOut
//             }}>
//                 {this.props.children}
//             </AuthContext.Provider>
//         )
//     }
// }

export default AuthContext;