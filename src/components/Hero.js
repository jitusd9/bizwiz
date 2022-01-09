import React from 'react'
import Products from "../components/Products"
import style from "../styles/products.module.css"

export default function Hero() {
    return (
        <div>
            <div className={style["dynamic-banner"]}>
                            {/* <img src={img} alt="this is not css Its .png file"/> */}
                            <h4>Things To Do In This Project</h4>
                            <p>1.write data in firebase store as per new firebase v9 </p>
                            <p>2.remove errors of db.collection and user.uid in firebase.js</p>
                            <p>3.checkout MANAGE USERS in firebase docs for users data and read docs for firestore </p>
                            <p>4.Then publish this mvp into Github b'cos then work will be more and you need git branches to deal with all the functionalities</p>
                            <p><strong>Add stripe for payments methods</strong></p>
        
                            <p>1.complete the entire user login/signup includes <strong>storing users data</strong> in firebase</p>
                            <p>2.<strong>web scrap data</strong> from other e-commerce platforms (only if allowed) and fetch into site</p>
                            <p>3.search feature to search wide variety of data <strong>learn how search algos works around internet </strong> </p>
                            <p>4.add payments methods vith stripe or razorpay </p>
                            <p>5.load more button for products or scroll and load </p>
                        </div>
            <Products/>
        </div>
    )
}
