import React, {useState} from 'react';
import { Typography, makeStyles, Button } from '@material-ui/core';
import hero1 from '../../images/hero1.png';


const useStyles = makeStyles((theme) => ({
    heroContainer: {
        height: '60vh',
        background: '#CEE7FD',
        position: 'relative',
    },
    heroTextContainer: {
        width: '80%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 5,
    },
    btnShopNow: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    slider: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 3,
        '& img': {
            height: '100%',
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(0%,-50%)' 
        }
    },
}));

const Hero = () => {
    const [activeImage, setActiveImage] = useState<number>(0);

    const classes = useStyles();

    return (
        <div className={classes.heroContainer}>
            <div className={classes.heroTextContainer}>
                <Typography variant="h4" gutterBottom={true} style={{width: '40%'}}>Shop all brands and essentials, Now with huge discounts.</Typography>
                <Typography variant="body1">Coming to your doorstep with a huge discount.</Typography>
                <div className={classes.btnShopNow}>
                    <Button color="primary" variant="contained" component="a" href="/products">Shop Now</Button>
                </div>
            </div>
            <div className={classes.slider}>
                <img src={hero1} alt="" />
            </div>
        </div>
    )
}

export default Hero
