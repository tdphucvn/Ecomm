import React, {useState, useEffect} from 'react';
import { Typography, makeStyles, Link, TextField, Badge, IconButton, Button } from '@material-ui/core';
import logo from '../../images/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { logoutRequest } from '../../redux/reducers/authenticate';

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
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'space-between',  
    },
    growContainer: {
        flexGrow: 3, 
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

type Auth = {
    logged: boolean;
    link: string;
    text: string;
};

const Authentication = (props: Auth) => {
    const {link, text} = props;
    return (
        <RouterLink to={`/authentication${link}`}>
            <Typography>{text}</Typography>
        </RouterLink>
    )
};

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [auth, setAuth] = useState<Auth>({logged: false, link: '/login', text: 'Login'});
    const [adminState, setAdminState] = useState<boolean>(false);
    const { authenticated, admin } = useSelector((state: RootState) => state.auth);
    const { count } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if(authenticated) { setAuth({logged: true, link: '/logout', text: 'Log Out'}); return };
        setAuth({logged: false, link: '/login', text: 'Login'});
    }, [authenticated]);

    useEffect(() => {
        if(admin) { setAdminState(true); return; };
        setAdminState(false);
    }, [admin]);

    const handleLogout = async () => {
        await dispatch(logoutRequest({message: "Logout request"}))
            .then(res => console.log(res));
    };


    return (
        <>
            <div className={classes.sumBar}>
                <div className={classes.contactContainer}>
                    <Typography>+420•123456789</Typography>
                    <Typography> • </Typography>
                    <Typography><a href="mailto:ecomm@gmail.com"> ecomm@gmail.com </a></Typography>
                </div>
                <div className={classes.growContainer}></div>
                <div className={classes.contactContainer}>
                    <Typography component={RouterLink} to="/contact">CONTACT US</Typography>
                    <Typography>•</Typography>
                    <Typography component={RouterLink} to="/orders">YOUR ORDERS</Typography>
                </div>
            </div>
            <div className={classes.heroContainer}>
                <nav className={classes.navBar}>
                    <ul style={{width: '100%'}}>
                        <li style={{flex: 1}}>
                            <Link component={RouterLink} to="/">
                            <img src={logo} alt="" style={{height: 70, width: 70}}/>
                            </Link>
                        </li>
                        <ul style={{flex: 3, justifyContent: 'flex-start'}}>
                            <li style={{marginRight: 20}}>
                                <RouterLink to="/collection">
                                    <Typography>COLLECTION</Typography>
                                </RouterLink>
                            </li>
                            
                            {adminState ? 
                                <li style={{marginRight: 20}}>
                                    <RouterLink to="/manage">
                                        <Typography>MANAGE PRODUCTS</Typography>
                                    </RouterLink>
                                </li>
                                :
                                <li style={{marginRight: 20}}>
                                    <RouterLink to="/products">
                                        <Typography>PRODUCTS</Typography>
                                    </RouterLink>
                                </li>
                            }
                        </ul>
                        <div style={{flex: 2}}></div>
                        <ul style={{flex: 1, justifyContent: 'flex-end'}}>
                            <li style={{marginRight: 20}}>
                                {!auth.logged ? <Authentication {...auth}/> : 
                                    <Button onClick={handleLogout}>Log Out</Button>
                                }
                            </li>
                            <li>
                                <IconButton component={RouterLink} to="/cart">
                                    <Badge color="secondary" badgeContent={count}>
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
