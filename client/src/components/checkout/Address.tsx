import React from 'react';
import { Grid, Typography, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

const Address = () => {
    const classes = useStyles();

    return (
        <>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3} component="form" id="addressForm">
            <Grid item xs={12} sm={6}>
              <TextField required id="firstName" name="firstName" label="First name" type="string" fullWidth autoComplete="given-name" />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField required id="lastName" name="lastName" label="Last name" type="string" fullWidth autoComplete="family-name" />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address1" name="address1" label="Address line 1" type="string" fullWidth autoComplete="shipping address-line1" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="address2" name="address2" label="Address line 2" type="string" fullWidth autoComplete="shipping address-line2" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="city" name="city" label="City" type="string" fullWidth autoComplete="shipping address-level2" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" type="string" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="zip" name="zip" label="Zip / Postal code" type="number" fullWidth autoComplete="shipping postal-code" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="country" name="country" label="Country" type="string" fullWidth autoComplete="shipping country" />
            </Grid>
          </Grid>
        </>
    );
}

export default Address
