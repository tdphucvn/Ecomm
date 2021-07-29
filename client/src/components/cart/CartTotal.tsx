import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const CartTotal = () => {
    const [disabledCheckout, setDisabledCheckout] = useState<boolean>(true);
    const { total } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if(total === 0) {setDisabledCheckout(true); return;};
        setDisabledCheckout(false);
    }, [total])

    return (
        <div style={{width: '80%', margin: 'auto', padding: '15px 0', display: 'flex', justifyContent: 'flex-end'}}>
            <Typography variant="h6">Total: ${total}</Typography>
            <Button component={RouterLink} to="/checkout" color="primary" variant="contained" style={{marginLeft: 10}} disabled={disabledCheckout} >Checkout</Button>
        </div>
    )
}

export default CartTotal;
