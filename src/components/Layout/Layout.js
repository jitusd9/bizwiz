import React, { useContext } from 'react'
import { ThemeContext } from '../context/ContextProvider'

import Navbar from '../Layout/Navbar'
import Footer from './Footer'
import '../../styles/app.css'

export default function Layout(props) {
  const themeContext = useContext(ThemeContext)
  return (
    <div className={`rootdiv ${themeContext.theme}`}>
      <Navbar theme={themeContext}/>
        {props.children}
      <Footer />
    </div>        
  )
}
