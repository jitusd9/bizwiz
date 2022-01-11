import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import style from "../styles/Signup.module.css"
import AuthContext from '../components/context/AuthContext'

import login from "../images/login.svg"
import signup from "../images/signup.svg"
import twitter from "../images/twitter.png"
import facebook from "../images/facebook.png"
import google from "../images/google.png"

import Button from '@mui/material/Button'

import { loginWithEmail , signInWithGoogle, registerWithEmailAndPassword } from "../firebase"

export default class Signup extends Component {

    constructor(props){
        super(props)

        this.state = {
            classState : true,
            containerClass : "signup-page-container",
            name : "",
            password : "",
            email : "",
            anyError : null,
            registrationResponse : null
        }
    }

    handleClick = () => {
        const { classState } = this.state
        
        this.setState({
            classState : !classState,
        })         
    }

    handleChange = (field, value) => {
        // console.log(field, value);
        this.setState({[field]: value})
    }

    handleSignup = async (e) => {
        e.preventDefault();
        console.log('handleSignup triggered!');

        console.log(this.state.name);
        console.log(this.state.email);
        console.log(this.state.password);

        const registrationResponse = await registerWithEmailAndPassword(this.state.name, this.state.email, this.state.password);

        console.log('registrationResponse', registrationResponse);

        this.setState({
            name : "",
            email : "",
            password : "",
            registrationResponse
        })
    }

    handleLogin = async (e) =>{

        let start = Date.now()

        const loginStatus = await loginWithEmail(this.state.email, this.state.password);
        // DO SOMETHING FOR ERR_INTERNET_DISCONNECTED 200 error when users internet is not connected
        
        let last = Date.now() - start; 
        console.log(loginStatus, last);

        this.setState({
            name : "",
            email : "",
            password : "",
            anyError : loginStatus
        })
    }

    render() {

        const { classState} = this.state;

        let containerClass = "";

        if(classState){
            containerClass = "signup-page-container right-panel-active";
        }else{
            containerClass = "signup-page-container"
        }

        return (
            <AuthContext.Consumer>
            {
                context => (
                        context.userEmail ? <Redirect to="/dashboard" /> :
                            <div className="signup-page">
                            <div className={containerClass}>
                                <div className="form-container sign-up-container">
                                    <form>
                                        <h2 className={style['form-title']}>Signup with</h2>
                                        <div className="contact-me">
                                            <nav className="social-container">
                                            <div className="social">
                                                <img className={style['social-icon']} src={twitter} alt="twitter link" />
                                            </div>
                                            <div className="social">
                                                <img className={style['social-icon']} src={facebook} alt="twitter link" />
                                            </div>
                                            <div className="social">
                                                <img className={style['social-icon']} src={google} alt="twitter link" onClick={signInWithGoogle}/>
                                            </div>
                                            </nav>
                                        </div>
                                        <span>OR</span>
                                        <input  type="text" placeholder="Name" name="name" value={this.state.name} onChange={ e => this.handleChange(e.target.name, e.target.value)}/>
                                        <input  type="email" placeholder="Email" name="email" value={this.state.email} onChange={e => this.handleChange(e.target.name, e.target.value)} />
                                        <input  type="password" placeholder="Password" name="password" value={this.state.password} onChange={e => this.handleChange(e.target.name, e.target.value)} />
                                        <div className="big-orange-btn">
                                            <Button  variant="contained" size="small" value="submit" onClick={this.handleSignup} >Signup</Button>
                                        </div>
                                        {
                                            this.state.registrationResponse ? <div className="floating-alert">
                                                <p>😞 Ouch! : {this.state.registrationResponse}</p>
                                            </div> : null
                                        }
                                    </form>
                                </div>
                                <div className="form-container sign-in-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <h1 className={style['form-title']}>Login with</h1>
                                        <div className="contact-me">
                                            <nav className="social-container">
                                            <div className="social">
                                                <img className={style['social-icon']} src={twitter} alt="twitter link" />
                                            </div>
                                            <div className="social">
                                            <img className={style['social-icon']} src={facebook} alt="facebook link" />
                                            </div>
                                            <div className="social">
                                            <img className={style['social-icon']} src={google} alt="google link" />
                                            </div>
                                            </nav>
                                        </div>
                                        <span>OR</span>
                                        <input type="email" placeholder="Email" required name="email" value={this.state.email} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                        <input type="password" placeholder="Password" required name="password" value={this.state.password} onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                                        
                                        <div className="big-orange-btn">
                                            <Button variant="contained" size="small" onClick={this.handleLogin}>Login</Button>
                                        </div> 

                                        <Link to="/reset">forgot password</Link>
                                        {
                                            this.state.anyError && this.state.anyError !== 200 ? <div className="floating-alert">
                                                <p>😞 Ouch! : incorrect credentials </p>
                                            </div> : null
                                        }

                                    </form>
                                </div>
                                <div className="overlay-container">
                                    <div className="overlay">
                                        <div className="overlay-panel overlay-left">
                                            <div className={style['svg-image']}>
                                                <img src={login} alt="login illustration" />
                                            </div>
                                            <p> <strong>Login here</strong> to access all features of the site</p>
                                            <p>New to the site? click below to Signup</p>
                                            <button className="ghost" onClick={this.handleClick}>Signup</button>
                                        </div>
                                        <div className="overlay-panel overlay-right">
                                        <div className={style['svg-image']}>
                                                <img src={signup} alt="signup illustration" />
                                            </div>
                                            <p>If you're already the member of BizWiz, click below to login</p>
                                            <button className="ghost" onClick={this.handleClick} >Log In</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )
            }
            
            </AuthContext.Consumer>
        )
    }
}

// Signup.contextType = AuthContext;
