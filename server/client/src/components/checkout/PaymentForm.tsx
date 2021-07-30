import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { Typography } from '@material-ui/core';

const PaymentForm = (props) => {
    const [succeeded, setSucceeded] = [props.succeded, props.setSucceded];
    const [error, setError] = useState(null);
    const [processing, setProcessing] = [props.submit, props.setSubmit];
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { items } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        window
          .fetch("https://ecommercepage.herokuapp.com/payment/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({items, address: props.address})
          })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data);
            setClientSecret(data.clientSecret);
          });
    }, []);

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        };
    };

    const handleChange = async (event) => {
        setError(event.error ? event.error.message : "");
    };

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" onChange={handleChange} />
                <button type="submit" id="paymentSubmitButton" style={{display: 'none'}}></button>
                {error && (
                    <div className="card-error" role="alert">
                    <Typography>
                    {error}
                    </Typography>
                    </div>
                )}
            </form>
        </>
    )
}

export default PaymentForm
