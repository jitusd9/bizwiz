import React, { Component } from 'react'
import Layout from '../components/Layout'
import Checkout from './Checkout'
import Hero from "../components/Hero"
import Signup from '../pages/Signup'
import Login from './Login'
import Register from './Register'
import Reset from './Reset'
import Dashboard from './Dashboard'
import ContextProvider from '../components/context/ContextProvider'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <ContextProvider>
                <Router>
                    <Layout>
                        <main className="container">
                            <Switch>
                                <Route exact path="/">
                                    <Hero/>
                                </Route>
                                <Route path="/checkout">
                                    <Checkout/>
                                </Route>
                                <Route path="/signup">
                                    <Signup />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/reset">
                                    <Reset />
                                </Route>
                                <Route path="/dashboard">
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </main>
                    </Layout>
                </Router>
            </ContextProvider>
        )
    }
}
