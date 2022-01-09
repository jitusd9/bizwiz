import React, { Component } from 'react'
import ThemeContext from './context/Theme-context'
import AuthContext from './context/AuthContext'

import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/app.css'


export default class Layout extends Component {


    render() {


        return (
            <ThemeContext.Consumer>
            {
                themesContext => (
                    <div className={`rootdiv ${themesContext.theme}`}>
                        <Navbar theme={themesContext}/>
                            {this.props.children}
                        <Footer />
                    </div>
                )
            }
            </ThemeContext.Consumer>
            
        )
    }
}


// class Child extends Component{
//     render(){
//         return(
//             <div>
//                 <h2>Child Component</h2>
//             </div>
//         )
//     }
// }