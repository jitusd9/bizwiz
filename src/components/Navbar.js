import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Button from '@mui/material/Button'

import style from "../styles/navbar.module.css"
import ThemeContext from "./context/Theme-context"

export default class Navbar extends Component {
    
    constructor(props){
        super(props)
        this.state={
            theme : true,
            menuIcon : false
        }
    }
    
    // static contextType = ThemeContext;
    
    handleNav = () => {
        const {theme} = this.props

        if(theme.theme === 'theme-light'){
            console.log('new');
            theme.setTheme("theme-dark")
        }else{
            console.log('old');
            theme.setTheme("theme-light")
        }

        
        this.setState({
            theme : !this.state.theme
        });
    }

    toggleMenu = () => {
        this.setState({
            menuIcon : !this.state.menuIcon
        })
    }

    componentDidMount(){
        const navbarLinks = document.querySelectorAll(`.${style["item-link"]} a`);
        navbarLinks.forEach(e => {
            e.addEventListener('click', () => {
                this.setState({
                    menuIcon : !this.state.menuIcon
                })
            })
        })

    }

    render() {
        const { menuIcon } = this.state;


        
        
        // console.log(theme, setTheme);

        // LEARN LIFTING THE STATE UP SO THAT YOU CAN LIFT THEME BUTTON PROPS TO CONTEXT OR WHOLE APP 

        return (
            <ThemeContext.Consumer>
            {
                themecontext => {
                    const { theme, setTheme } = themecontext;
                    
                    return(
                        <AuthContext.Consumer>
                            {
                                /* () instead of {} indicates the arrow function is returning whatever inside ()  */
                                context => (
                                    <header>
                                        <nav className={menuIcon ? `${style["navbar"]} ${style["activeNavbar"]}` : style["navbar"]}>
                                                {/* grid area brand */}
                                                <div className={style["brand"]}>
                                                    <Link to="/">
                                                        <h1>BizWiz</h1>
                                                    </Link>
                                                </div>
                                                {/* grid area menu icon  */}
                                                <div onClick={this.toggleMenu} className={`${style["toggle-menu"]} ${style["active"]}`}>
                                                    <div className={style.bar}></div>
                                                </div>
                                                {/* grid area menu  */}
                                                <div className={menuIcon ? `${style["menu"]} ${style["activeMenu"]}` : style["menu"]}>
                                                    <ul className={style["menu-items"]}>
                                                        <li className={`${style["item-link"]} ${style["search"]}`}> <input type="text" placeholder="search items..."/> </li>
                                                        
                                                        {
                                                        !context.userEmail ? <li className={style["item-link"]}> <Link to="/signup"><Button >Sign In</Button></Link> </li>
                                                                                : null
                                                        }
                                                        {
                                                        context.userEmail ? 
                                                                <li className={style["item-link"]}> <Link to="/dashboard"><Button >{context.userEmail}</Button></Link> </li>
                                                                : null
                                                        }
                                                        <li className={style["item-link"]}> <Link to="/checkout"><Button >{themecontext.theme}</Button></Link> </li>
                                                        <li className={`${style["item-link"]} ${style["theme-btn"]}`}> <a href="#"><Button onClick={this.handleNav}> <span role="img">{this.state.theme ? 'light' : 'dark'}</span> </Button></a> </li>
                                                    </ul>
                                                </div>
                                        </nav>
                                    </header>
                                )
                            }   
                        </AuthContext.Consumer>
                    )
                }
            }
            </ThemeContext.Consumer>
        )
    }
}

