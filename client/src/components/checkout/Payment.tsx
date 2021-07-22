import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const Payment = () => {
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3} id="paymentForm" component="form">
          <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Name on card" name="cardName" fullWidth autoComplete="cc-name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="cardNumber" label="Card number" name="cardNumber" fullWidth autoComplete="cc-number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="expDate" label="Expiry date" name="expDate" fullWidth autoComplete="cc-exp" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="cvv" label="CVV" name="cvv" helperText="Last three digits on signature strip" fullWidth autoComplete="cc-csc" />
          </Grid>
        </Grid>
      </React.Fragment>
    )
}

export default Payment
