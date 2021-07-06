import React from 'react';
import { Typography, makeStyles, Link, TextField, Badge, IconButton } from '@material-ui/core';
import logo from '../../images/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    sumBar: {
        padding: '10px 0',
        display: 'flex',
        width: '80%',
        margin: 'auto',
        '& a': {
            textDecoration: 'none',
            color: 'black',
            '&:hover': {
                color: '#587D9F'
            }, 
        },
        
        opacity: 0.7,  
    },
    navBar: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly', 
        '& ul':{
            padding: 0,
            listStyle: 'none', 
            display: 'flex',
            '& a': {
                textDecoration: 'none',
                color: 'black',
                '&:hover': {
                    color: '#587D9F'
                }, 
            },
            '& li':{
                display: 'flex',
                alignItems: 'center',
            },
        }
    },
    contactContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',  
    },
    growContainer: {
        flexGrow: 2, 
    },
    heroContainer: {
        background: '#F2FBFF',
        position: 'sticky',
        top: 0,
        zIndex: 999
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchInput: {
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.sumBar}>
                <div className={classes.contactContainer}>
                    <Typography>+420•123456789</Typography>
                    <Typography>•</Typography>
                    <Typography><a href="mailto:ecomm@gmail.com">ecomm@gmail.com</a></Typography>
                </div>
                <div className={classes.growContainer}></div>
                <div className={classes.contactContainer}>
                    <Typography component="a" href="/contact">CONTACT US</Typography>
                    <Typography>•</Typography>
                    <Typography component="a" href="/track">TRACK ORDER</Typography>
                    <Typography>•</Typography>
                    <Typography component="a" href="/account">ACCOUNT</Typography>
                </div>
            </div>
            <div className={classes.heroContainer}>
                <nav className={classes.navBar}>
                    <ul style={{width: '100%'}}>
                        <li style={{flex: 1}}>
                            <Link component="a" href="/">
                            <img src={logo} alt="" style={{height: 70, width: 70}}/>
                            </Link>
                        </li>
                        <ul style={{flex: 3, justifyContent: 'flex-start'}}>
                            <li style={{marginRight: 20}}>
                                <RouterLink to="/collection">
                                    <Typography>COLLECTION</Typography>
                                </RouterLink>
                            </li>
                            <li style={{marginRight: 20}}>
                                <RouterLink to="/products">
                                    <Typography>PRODUCTS</Typography>
                                </RouterLink>
                            </li>
                            <li style={{marginRight: 20}}>
                                <RouterLink to="/offers">
                                    <Typography>OFFERS</Typography>
                                </RouterLink>
                            </li>
                        </ul>
                        <li style={{flex: 2, justifyContent: 'flex-end'}}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <TextField placeholder="Search" name="searchProduct" className={classes.searchInput}/>
                            </div>
                        </li>
                        <ul style={{flex: 1, justifyContent: 'flex-end'}}>
                            <li style={{marginRight: 20}}>
                                <RouterLink to="/authentication/login">
                                    <Typography>Login</Typography>
                                </RouterLink>
                            </li>
                            <li>
                                <IconButton component="a" href="/cart">
                                    <Badge color="secondary" badgeContent={0}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </li>
                        </ul>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Header
