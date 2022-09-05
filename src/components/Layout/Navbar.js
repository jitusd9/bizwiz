import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, CartContext } from "../context/ContextProvider"

import style from "../../styles/navbar.module.css"

export default class Navbar extends Component {
    
	constructor(props){
		super(props)
		this.state={
			theme : true,
			menuIcon : false
		}
	}
    
    
  handleNav = () => {
    // Inheriting theme state and method from context as props from layout component which renders
    // Navbar for every children component 
    const {theme} = this.props

    if(theme.theme === 'theme-light'){
      theme.setTheme("theme-dark")
    }else{
            
      theme.setTheme("theme-light")
    }
		this.setState({
			theme : !this.state.theme
		});
  }

	toggleMenu = () => {
		// this appears on smaller screen devices 
		this.setState({
			menuIcon : !this.state.menuIcon
		})
	}

  componentDidMount(){
    //User click any link navbar collapse applicable on smaller devices
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
                    
	return(
		<AuthContext.Consumer>
			{
					/* () instead of {} indicates the arrow function is returning whatever inside ()  */
				userContext => (
					<CartContext.Consumer>
						{
							cartContext => (
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
												!userContext.user ? <li className={style["item-link"]}> <Link to="/signup"><button >Sign In</button></Link> </li>
																								: null
												}
												{
												userContext.user ? 
													<li className={`${style["item-link"]} ${style["user-link"]}`}> <Link to="/dashboard"><button >{userContext.user.email ? userContext.user.email : "_Name"}</button></Link> </li>
													: null
												}
												<li className={`${style["item-link"]} ${style["cart"]}`}> <Link to="/checkout"><button>Cart {cartContext.itemCount !== 0 ? <div className={style["itemCount"]}>{cartContext.itemCount}</div> : ""} </button></Link> </li>
												<li className={`${style["item-link"]} ${style["theme-btn"]}`}>
													<Link to="#">
													<button title={this.state.theme ? "Dark Mode" : "Light Mode"} onClick={this.handleNav}> {this.state.theme ? '🌑' : '☀️'} </button>
													</Link>
												</li>
											</ul>
										</div>
									</nav>
								</header>
							)
						}
					</CartContext.Consumer>
				)
			}   
		</AuthContext.Consumer>
	)

    }
}

