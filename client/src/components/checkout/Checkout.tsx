import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import { makeStyles, Paper, Stepper, Step, StepLabel, Button, Typography, CircularProgress } from '@material-ui/core';
import Address from './Address';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cleanCart } from '../../redux/reducers/cartSlice';
import { getProductsRequest } from '../../redux/reducers/productsSlice';

import { Link as RouterLink } from 'react-router-dom';
 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_sifzp0ZLo4b6A5TLnU1U4o3p00Fg5O3uxB");

const useStyles = makeStyles((theme) => ({
    checkoutContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Shipping address', 'Review your order', 'Payment details'];

interface AddressInterface {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    country: string;
};

const getStepContent = (step: number, address: AddressInterface, submit: boolean, setSubmit: Dispatch<SetStateAction<boolean>>, succeded: boolean, setSucceded: Dispatch<SetStateAction<boolean>>) => {
    switch(step){
        case 0:
            return <Address />;
        case 1:
            return <Review address={address}/>;
        case 2:
            return (
                <div className="CheckoutForm">
                    <Elements stripe={promise}>
                        <PaymentForm address={address} submit={submit} setSubmit={setSubmit} succeded={succeded} setSucceded={setSucceded} />
                    </Elements>
                </div>    
            );
        default:
            throw new Error('Unknown step');
    };
};


const Checkout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [address, setAddress] = useState<AddressInterface>();
    const [submit, setSubmit] = useState<boolean>(false);
    const [succeded, setSucceded] = useState<boolean>(false);

    useEffect(() => {
        if(!succeded) return;
        setActiveStep(activeStep => activeStep + 1);
        dispatch(cleanCart());

        const sortState = 'none';
        const filterState = 'all';
        dispatch(getProductsRequest({sortState, filterState}))
            .then(res => {
                console.log(res);
            })
    }, [succeded, dispatch]);

    const handleNext = () => {
        if(activeStep === 2) {
            const paymentSubmitButton = document.getElementById('paymentSubmitButton') as HTMLButtonElement;
            paymentSubmitButton.click();
            return;
        };

        if(activeStep === 1) {
            const { firstName, lastName, address1, city, country } = address;
            if(firstName === '' ||lastName === '' || address1 === '' || city === '' || country === '') {
                alert('You cannot proceed to payment without fully filled addresses!');
                return;
            }
        };

        if(activeStep === 0){
            const addressForm = document.getElementById('addressForm') as HTMLFormElement;
            const addressFormData = new FormData(addressForm);
            const addressData = {
                firstName: addressFormData.get('firstName') as string,
                lastName: addressFormData.get('lastName') as string,
                address1: addressFormData.get('address1') as string,
                address2: addressFormData.get('address2') as string,
                city: addressFormData.get('city') as string,
                state: addressFormData.get('state') as string,
                zip: addressFormData.get('zip') as unknown as number,
                country: addressFormData.get('country') as string,
            };
            setAddress(addressData);
        };

        setActiveStep(activeStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className={classes.checkoutContainer}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                        We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                        </Typography>
                        <Button component={RouterLink} to="/" variant="contained" color="primary" style={{margin: 'auto'}}>
                            Back to home
                        </Button>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        {getStepContent(activeStep, address, submit, setSubmit, succeded, setSucceded)}
                        <div className={classes.buttons}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} className={classes.button}>
                            Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? (submit ? <CircularProgress style={{color: 'white'}} /> : 'Place Order') : 'Next'}
                        </Button>
                        </div>
                    </React.Fragment>
                    )}
                </React.Fragment>
                </Paper>
            </main>  
        </div>
    )
}

export default Checkout
