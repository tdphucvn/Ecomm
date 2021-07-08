import React from 'react';
import { useParams } from 'react-router';

type Params = {
    id: string;
};

const Product = () => {
    const { id } = useParams<Params>();
    console.log(id);

    return (
        <div>
            
        </div>
    )
}

export default Product
