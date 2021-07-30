import React, {useState, useEffect} from 'react';
import { Typography, makeStyles, Link, Badge, IconButton, Button } from '@material-ui/core';
import logo from '../../images/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { logoutRequest } from '../../redux/reducers/authenticate';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './DrawerNavigation';

const useStyles = makeStyles((theme) => ({
    sumBar: {
        padding: '10px 0',
        display: 'flex',
        width: '80%',
        margin: 'auto',
        justifyContent: 'flex-end',
        '& a': {
            textDecoration: 'none',
            color: 'black',
            '&:hover': {
                color: '#587D9F'
            }, 
        },
        flexWrap: 'wrap',
        opacity: 0.7,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }, 
    },
    navBar: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly', 
        flexWrap: 'wrap',
    },
    navBarLinks: {
        display: 'flex',
        listStyle: 'none',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        flex: 3,
        justifyContent: 'flex-start',
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
    },
    contactContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    growContainer: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }, 
    },
    authentication: {
        flex: 1,
        justifyContent: 'flex-end',
        display: 'flex',
        listStyle: 'none',
        padding: 0,
        alignItems: 'center',
        textDecoration: 'none',
        [theme.breakpoints.down('xs')]: {
            flex: 2
        }
    },
    authLink: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    hamburger: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
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
        <RouterLink to={`/authentication${link}`} style={{textDecoration: 'none', color: 'black'}}>
            <Typography>{text}</Typography>
        </RouterLink>
    )
};

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [auth, setAuth] = useState<Auth>({logged: false, link: '/login', text: 'Login'});
    const [drawer, setDrawer] = useState<boolean>(false);
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
                    <Typography component={RouterLink} to="/contact">CONTACT US</Typography>
                    <Typography style={{margin: '0 20px'}}>•</Typography>
                    <Typography component={RouterLink} to="/orders">YOUR ORDERS</Typography>
                </div>
            </div>
            <div className={classes.heroContainer}>
                <nav className={classes.navBar}>
                    <ul style={{width: '100%', display: 'flex', listStyle: 'none', padding: 0}}>
                        <li style={{flex: 1}}>
                            <Link component={RouterLink} to="/">
                            <img src={logo} alt="" style={{height: 70, width: 70}}/>
                            </Link>
                        </li>
                        <ul className={classes.navBarLinks}>
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
                        <div className={classes.growContainer}></div>
                        <ul className={classes.authentication}>
                            <li style={{marginRight: 20}} className={classes.authLink}>
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
                            <li className={classes.hamburger}>
                                <IconButton onClick={() => setDrawer(previousState => !previousState)}>
                                    <MenuIcon />
                                </IconButton>
                            </li>
                        </ul>
                    </ul>
                </nav>
            </div>
            <Drawer drawer={drawer} setDrawer={setDrawer} handleLogout={handleLogout} />
        </>
    )
}

export default Header
