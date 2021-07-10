import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Cart = () => {
    const { items: cartItems } = useSelector((state: RootState) => state.cart);
    const { products } = useSelector((state: RootState) => state.products);

    const itemsMap = new Map();
    for(let i in cartItems) {
        if(itemsMap.has(cartItems[i]._id)){
            let amount = itemsMap.get(cartItems[i]._id);
            itemsMap.set(cartItems[i]._id, ++amount);
            continue;
        };
        itemsMap.set(cartItems[i]._id, 1);
    };
    for (let [key, value] of itemsMap) {
        const { name, price, image } = products.find(product => product._id === key);
        console.log(name, '=', price, '=', value);
    };

    return (
        <div>
            
        </div>
    )
};

export default Cart;
