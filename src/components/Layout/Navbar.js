import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, CartContext } from "../context/ContextProvider"

import style from "../../styles/navbar.module.css"

import profileIcon from "../../images/icon/profile.svg"
import darkIcon from "../../images/icon/moon.svg"
import lightIcon from "../../images/icon/sun.svg"
import loginIcon from "../../images/icon/login.svg"
import cartIcon from "../../images/icon/cart2.svg"
import searchIcon from "../../images/icon/search.svg"

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
  	const navbarLinks = document.querySelectorAll(`.${style["menu-item"]}`);
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
											<ul className={style["menu-bar"]}>
												<li className={`${style["menu-item"]} ${style["search"]}`}> 
													<div className={style["icon"]}>
														<img src={searchIcon} alt="" />
													</div>
													<input type="text" placeholder="search items..."/> 
												</li>
												
												{
												!userContext.user ? 
												<li className={style["menu-item"]}> 
													<Link to="/signup" className={style["menu-link"]}>
														<button >
														<div className={style["icon"]}>
															<img src={loginIcon} alt="" />
														</div>
														Sign In
														</button>
													</Link> 
												</li>
													: null
												}
												{
												userContext.user ? 
													<li className={`${style["menu-item"]} ${style["user-link"]}`}> 
														<Link to="/dashboard" className={style["menu-link"]}>
															<div className={style["icon"]}>
																<img src={profileIcon} alt="" />
															</div>
															<div className={style["text"]}>
																{userContext.user.email ? userContext.user.email : "_Name"}
															</div>
														</Link> 
													</li>
													: null
												}
												<li className={`${style["menu-item"]} ${style["cart"]}`}> 
													<Link title='your cart' to="/checkout" className={style["menu-link"]}>
															<div className={style["icon"]}>
																<img src={cartIcon} alt="" />
															</div>
														 	{cartContext.itemCount !== 0 ? 
															<div className={style["text"]}>
																<div className={style["itemCount"]}>{cartContext.itemCount}</div>
															</div>
															 : null}
													</Link>
												</li>
												<li className={`${style["menu-item"]} ${style["theme-btn"]}`}>
													
													<button className={style["icon"]} title={this.state.theme ? "Dark Mode" : "Light Mode"} onClick={this.handleNav}> 
													
													{this.state.theme ? 
													 <img src={darkIcon} alt="dark icon" />
													 : 
													 <img src={lightIcon} alt="light icon" />
													 } 
													
													</button>
											
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

