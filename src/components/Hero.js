import React, { useRef, useEffect } from 'react'
import Products from "../components/Products"
import style from "../styles/products.module.css"
import Button from '@mui/material/Button'
import shopping_girl from "../images/shopping.png"

const useMountEffect = fun => useEffect(fun, []);

export default function Hero() {

    const myRef = useRef(null);

    const executeScroll = () => {
        
        window.scrollTo(myRef);
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
        <p className="comment"><span>1. DO NOT RENDER every products when click on button.</span></p>
        <p className="comment"><span>2. only after this go for fetch data and store added in firestore.</span></p>
        <div ref={myRef}>
            <Products />
        </div>
        </div>
    )
}
