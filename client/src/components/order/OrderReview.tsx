import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../api/order';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateAccessToken } from '../../redux/reducers/authenticate';

type Params = {
    id: string;
}

type Item = {
    category: string;
    date: string;
    name: string;
    price: number;
    image: {
        url: string;
        public_id: string;
    };
    description: string;
    _id: string;
};

type ItemSummary = {
    id: string;
    name: string;
    price: number;
    image: {
        url: string;
        public_id: string;
    };
    amount: string;
}

type OrderType = {
    date: string;
    items: Array<Item>;
    price: number;
    _id: string;
}

const createHashmapFromPurchasedItems = (purchasedItems: Array<Item>, allProducts: Array<Item>) => {
    const itemsMap = new Map();
    let itemsSummary: Array<ItemSummary> = [];
    for(let i in purchasedItems) {
        if(itemsMap.has(purchasedItems[i]._id)){
            let amount = itemsMap.get(purchasedItems[i]._id);
            itemsMap.set(purchasedItems[i]._id, ++amount);
            continue;
        };
        itemsMap.set(purchasedItems[i]._id, 1);
    };
    
    for(let [key, value] of itemsMap) {
        const findedProduct = allProducts.find(product => product._id === key);
        if(findedProduct === undefined) continue;
        const {name, price, image} = findedProduct;
        const item: ItemSummary = {
            id: key,
            name,
            price,
            image,
            amount: value,
        };
        itemsSummary.push(item);
    }

    return itemsSummary;
};

const OrderReview = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<Params>();
    const [order, setOrder] = useState<OrderType>();
    const [items, setItems] = useState<Array<ItemSummary>>();
    
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        getOrder(id, accessToken)
            .then((data: OrderType) => {
                setOrder(data);
                setItems(createHashmapFromPurchasedItems(data.items, products));
                console.log(createHashmapFromPurchasedItems(data.items, products));
                console.log(data);
            })
            .catch(err => console.log(err));
    }, [id, accessToken, products]);

    return (
        <div>
            
        </div>
    )
}

export default OrderReview
