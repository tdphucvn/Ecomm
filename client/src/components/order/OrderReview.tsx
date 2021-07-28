import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
    id: string;
}

const OrderReview = () => {
    const { id } = useParams<Params>();
    

    return (
        <div>
            
        </div>
    )
}

export default OrderReview
