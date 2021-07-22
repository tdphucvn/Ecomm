import React, {useState} from 'react';
import { makeStyles, Paper, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import Address from './Address';
import Payment from './Payment';
import Review from './Review';

const useStyles = makeStyles((theme) => ({
    checkoutContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

const steps = ['Shipping address', 'Payment details', 'Review your order'];

interface AddressInterface {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    country: string;
}

interface PaymentInterface {
    name: string;
    cardNum: number;
    expire: string;
    cvv: number;
};

const getStepContent = (step: number, address: AddressInterface, payment: PaymentInterface) => {
    switch(step){
        case 0:
            return <Address />;
        case 1:
            return <Payment />;
        case 2:
            return <Review address={address} payment={payment}/>;
        default:
            throw new Error('Unknown step');
    };
};


const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [address, setAddress] = useState<AddressInterface>();
    const [payment, setPayment] = useState<PaymentInterface>();

    const handleNext = () => {
        switch(activeStep){
            case 0:
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
                break;
            case 1:
                const paymentForm = document.getElementById('paymentForm') as HTMLFormElement;
                const paymentFormData = new FormData(paymentForm);
                const paymentData = {
                    name: paymentFormData.get('cardName') as string,
                    cardNum: paymentFormData.get('cardNumber') as unknown as number,
                    expire: paymentFormData.get('expDate') as string,
                    cvv: paymentFormData.get('cvv') as unknown as number,
                };
                console.log(paymentData);
                setPayment(paymentData);
                break;
            default:
                break;
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
                        <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                        </Typography>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        {getStepContent(activeStep, address, payment)}
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
                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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
