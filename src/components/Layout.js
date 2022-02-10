import React from 'react'
import { ThemeContext } from './context/ContextProvider'

import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/app.css'

export default function Layout(props) {
    return (
        <ThemeContext.Consumer>
        {
            themeContext => (
                <div className={`rootdiv ${themeContext.theme}`}>
                    <Navbar theme={themeContext}/>
                        {props.children}
                    <Footer />
                </div>
            )
        }
        </ThemeContext.Consumer>
        
    )
}
