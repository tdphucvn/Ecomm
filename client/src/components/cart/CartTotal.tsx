import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Typography, Button } from '@material-ui/core';

const CartTotal = () => {
    const { total } = useSelector((state: RootState) => state.cart);

    return (
        <div style={{width: '80%', margin: 'auto', padding: '15px 0', display: 'flex', justifyContent: 'flex-end'}}>
            <Typography variant="h6">Total: ${total}</Typography>
            <Button color="primary" variant="contained" style={{marginLeft: 10}}>Checkout</Button>
        </div>
    )
}

export default CartTotal;