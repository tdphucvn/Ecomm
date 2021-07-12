import React from 'react';
import { Typography, makeStyles, Grid, Paper, Button } from '@material-ui/core';
import chair from '../../images/chair.png';
import grocery from '../../images/grocery.png';
import macbook from '../../images/macbook.png';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        margin: 'auto', 
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    collectionContainer: {
        background: '#F2FBFF',
        display: 'flex',
        height: '30vh',
        alignItems: 'center',
        maxHeight: '350px',
        minHeight: '200px',
    },
    collectionImage: {
        flex: 1,
        '& img': {
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
        },
    },
    collectionDescription: {
        padding: 5,
        flex: 1.5,
    },
    collectionShopNowBtn: {
        borderBottom: '3px solid #587D9F',
    }
}));

const TrendingProducts = () => {
    const classes = useStyles();
    const { admin } = useSelector((state: RootState) => state.auth);

    return (
        <div className={classes.container}>
            <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                    <Paper className={classes.collectionContainer}>
                        <div className={classes.collectionImage}>
                            <img src={chair} alt="" />
                        </div>
                        <div className={classes.collectionDescription}>
                            <Typography variant="h5">Home Decor</Typography>
                            <Typography paragraph color="textSecondary">Complete your space with modern decor</Typography>
                            <Button className={classes.collectionShopNowBtn} style={{borderRadius: 0}} component={RouterLink} to={admin ? '/manage?filter=homeDecor' : '/products?filter=homeDecor'}>Shop Now</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Paper className={classes.collectionContainer}>
                        <div className={classes.collectionImage}>
                            <img src={macbook} alt="" />
                        </div>
                        <div className={classes.collectionDescription}>
                            <Typography variant="h5">Electronics</Typography>
                            <Typography paragraph color="textSecondary">Ramp up your wardrobe with the latest trend</Typography>
                            <Button className={classes.collectionShopNowBtn} style={{borderRadius: 0}} component={RouterLink} to={admin ? '/manage?filter=electronics' : '/products?filter=electronics'}>Shop Now</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Paper className={classes.collectionContainer}>
                        <div className={classes.collectionImage}>
                            <img src={grocery} alt="" />
                        </div>
                        <div className={classes.collectionDescription}>
                            <Typography variant="h5">Shop Grocery</Typography>
                            <Typography paragraph color="textSecondary">Ramp up your wardrobe with the latest trend</Typography>
                            <Button className={classes.collectionShopNowBtn} style={{borderRadius: 0}} component={RouterLink} to={admin ? '/manage?filter=grocery' : '/products?filter=grocery'}>Shop Now</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default TrendingProducts
