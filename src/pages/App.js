import React, { Component } from 'react'
import Layout from '../components/Layout/Layout'
import Checkout from './Checkout'
import Hero from "../components/Home/Hero"
import Signup from '../pages/Signup'
import Login from './Login'
import Register from './Register'
import Reset from './Reset'
import Dashboard from './Dashboard'
import Payment from './Payment'
import Test from './test'
import { ContextProvider } from '../components/context/ContextProvider'
import PageNotFound from '../components/Utils/PageNotFound'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class App extends Component {
	render() {
		return (
			// both Theme and Auth context are provided in entire app 
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
								<Route path="/payment">
									<Payment />
								</Route>
								<Route path="/test">
									<Test />
								</Route>
								<Route path="*">
									<PageNotFound />
								</Route>
							</Switch>
						</main>
					</Layout>
				</Router>
			</ContextProvider>
		)
	}
}
