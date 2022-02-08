import React,{useEffect, useState} from 'react';

export default function Loader(props) {

  const [load, setLoad] = useState(false);
  const [loadingClass, setClass] = useState("authLoader");



  useEffect(() => {
      console.log(props.loading);
    setLoad(props.loading);

    if(load){
        setClass("authLoader loadingstart")
    }else{
        setClass("authLoader")
    }
    
}, [load]);

  return(
    <div className={loadingClass}>
        <svg className="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
    </div>  
    );
}
