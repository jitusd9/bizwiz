import React, { useRef, useEffect } from 'react'
import Products from "../components/Products"
import style from "../styles/products.module.css"
import Button from '@mui/material/Button'
import shopping_girl from "../images/shopping.png"

const useMountEffect = fun => useEffect(fun, []);

export default function Hero() {

    const myRef = useRef(null);

    const executeScroll = () => {
        
        window.scrollTo(0,window.screen.availHeight);
        // myRef.current.scrollIntoView();

    }

    // useMountEffect(executeScroll);
    // console.log(window.scrollTo(0, 100));

    return (
        <div>
        <div className={style["hero-section"]}>
            <div className={style["left-section"]}>
                <div className={style["hero-content"]}>
                    <h1>Better when it's on </h1>
                    <h1><span className={style["curve-style"]}> one place</span> </h1>
                    <p className={style["tagline"]}>compare variety of products form different sites.</p>
                    <Button variant="contained" size="small" onClick={executeScroll}>Explore</Button>
                </div>
            </div>
            <div className={style["right-section"]}>
                <div className={style["bg-circle"]}>
                    <img src={shopping_girl} alt="shopping girl"/>
                </div>
            </div>
        </div>
            <div className={style["dynamic-banner"]}>
                {/* <img src={img} alt="this is not css Its .png file"/> */}
                <h4>Things To Do In This Project</h4>
                <p className="done">1.write data in firebase store as per new firebase v9 </p>
                <p className="done">2.remove errors of db.collection and user.uid in firebase.js</p>
                <p className='done'>3.checkout MANAGE USERS in firebase docs for users data and read docs for firestore </p>
                <p className="done">4.Then publish this mvp into Github b'cos then work will be more and you need git branches to deal with all the functionalities</p>
                <p><strong>Add stripe for payments methods</strong></p>

                <p className='done'>1.complete the entire user login/signup includes <strong>storing users data</strong> in firebase</p>
                <p>2.<strong>web scrap data</strong> from other e-commerce platforms (only if allowed) and fetch into site</p>
                <p>3.search feature to search wide variety of data <strong>learn how search algos works around internet </strong> </p>
                <p>4.add payments methods vith stripe or razorpay </p>
                <p>5.load more button for products or scroll and load </p>
                </div>
            <Products scrollRef={myRef}/>
        </div>
    )
}
