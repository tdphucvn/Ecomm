import React from 'react';
import axios from 'axios';
import { Typography, makeStyles, Divider, Button, TextField, Container, InputAdornment  } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { getEmailNewsletter } from '../../api/contact';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '10vh',
    },
    collectionContainer: {
        flex: 1,
        '& ul':{
            listStyle: 'none', 
            padding: 0,
            '& li': {
                margin: '5px 0',
            }, 
            '& a': {
                textDecoration: 'none',
                color: 'black',
                '&:hover': {
                    color: '#587D9F'
                }, 
            },
        }
    },
    productsContainer: {
        flex: 1,
        '& ul':{
            listStyle: 'none', 
            padding: 0,
            '& li': {
                margin: '5px 0',
            }, 
            '& a': {
                textDecoration: 'none',
                color: 'black',
                '&:hover': {
                    color: '#587D9F'
                }, 
            },
        }
    },
    contactContainer: {
        flex: 1,
        '& ul':{
            listStyle: 'none', 
            padding: 0,
            '& li': {
                margin: '5px 0',
            }, 
            '& a': {
                textDecoration: 'none',
                color: 'black',
                '&:hover': {
                    color: '#587D9F'
                }, 
            },
        }
    },
    newsletterContainer: {
        flex: 2,
        '& ul':{
            listStyle: 'none', 
            padding: 0,
            '& li': {
                margin: '5px 0',
            }, 
            '& form': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                '& button': {
                    marginTop: theme.spacing(2)
                }
            },
        },
    },
    divGrow: {
        flexGrow: 1,
    }
}));

const Footer = () => {
    const classes = useStyles();

    const handleSubscribe = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
        };
        const email = target.email.value;

        const response = await getEmailNewsletter(email);
        if(response) alert(response);
        target.email.value = '';
    };

    return (
        <div style={{background: '#F2FBFF'}}>
            <div style={{width: '80%', margin: 'auto'}}>
                <div className={classes.container} style={{padding: '30px 0'}}>
                    <div className={classes.collectionContainer}>
                        <Typography variant="h5" gutterBottom={true}>Collection</Typography>
                        <ul>
                            <li><Typography component="a" href="#" gutterBottom={true}>On the Edge</Typography></li>
                            <li><Typography component="a" href="#" gutterBottom={true}>Master of the Night</Typography></li>
                            <li><Typography component="a" href="#" gutterBottom={true}>Never More</Typography></li>
                        </ul>
                    </div>
                    <div className={classes.productsContainer}>
                        <Typography variant="h5" gutterBottom={true}>Products</Typography>
                        <ul>
                            <li><Typography component="a" href="#" gutterBottom={true}>Home Decor</Typography></li>
                            <li><Typography component="a" href="#" gutterBottom={true}>Electronics</Typography></li>
                            <li><Typography component="a" href="#" gutterBottom={true}>Shop Grocery</Typography></li>
                        </ul>
                    </div>
                    <div className={classes.contactContainer}>
                        <Typography variant="h5" gutterBottom={true}>Contact</Typography>
                        <ul>
                            <li><Typography component="a" href="#">Contact Us</Typography></li>
                            <li>
                                <div style={{opacity: 0.7}}>
                                    <Typography>Philip Tran</Typography>
                                    <Typography>Čapkova 1658/18</Typography>
                                    <Typography>Cheb 350 02, CZ</Typography>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.newsletterContainer}>
                        <Typography variant="h5" gutterBottom={true}>Newsletter</Typography>
                        <ul>
                            <li>
                                <Typography paragraph align="justify">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum numquam in amet, nisi assumenda totam odit! Ratione doloribus perspiciatis quasi porro recusandae autem perferendis expedita nemo temporibus minima. Hic, libero?
                                </Typography>
                            </li>
                            <li>
                                <form onSubmit={handleSubscribe}>
                                    <TextField label="Email" name="email" variant="outlined" InputProps={{startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>)}} />
                                    <Button type="submit" color="primary" variant="contained" size="large">Subscribe</Button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
                <Divider></Divider>
                <div className={classes.container} style={{alignItems: 'center'}}>
                    <div><Typography color="textSecondary" style={{marginRight: 20}}>Privacy Policy</Typography></div>
                    <div><Typography color="textSecondary">Terms and Conditions</Typography></div>
                    <div className={classes.divGrow}></div>
                    <div><Typography color="textSecondary">Philip Tran | 2021</Typography></div>
                </div>
            </div>
        </div>
    )
}

export default Footer
