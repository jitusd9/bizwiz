import React from 'react'


function addItemToCart(item){
  console.log('item added to user cart', item);
}

function removeItemFromCart(item){
  console.log('item removed from cart', item);
}

export default function CartContext() {
  return (
    <div>CartContext</div>
  )
}


export {addItemToCart, removeItemFromCart};