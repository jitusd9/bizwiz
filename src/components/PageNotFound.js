import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className="pageNotFound">
            <div className="sorryImage">
                <h1>404</h1>
            </div>
            <div className="errorText">
                <p className="errorMessage">💔 Oops! Unfortunately, Page Not Found.</p>
                <p className="errorMessage">or you might have mispelled the url. Check again</p>
                <Link className="homeBtn" to="/">Go To Homepage</Link>
            </div>
        </div>
    )
}
