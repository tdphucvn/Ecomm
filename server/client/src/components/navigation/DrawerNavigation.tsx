import React, {useState, useEffect} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, Button, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '50vw'
    }
}));

type Props = {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: any;
};

type Auth = {
    logged: boolean;
    link: string;
    text: string;
};


const DrawerNavigation = (props: Props) => {
    const classes = useStyles();
    const [drawer, setDrawer] = [props.drawer, props.setDrawer];
    const [auth, setAuth] = useState<Auth>({logged: false, link: '/login', text: 'Login'});
    const [adminState, setAdminState] = useState<boolean>(false);
    const { authenticated, admin } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(authenticated) { setAuth({logged: true, link: '/logout', text: 'Log Out'}); return };
        setAuth({logged: false, link: '/login', text: 'Login'});
    }, [authenticated]);

    useEffect(() => {
        if(admin) { setAdminState(true); return; };
        setAdminState(false);
    }, [admin]);

    const toggleDrawer = (open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) return;

        setDrawer(open);
    };

    const list = () => (
        <div role="presentation" onKeyDown={toggleDrawer(false)} onClick={toggleDrawer(false)} className={classes.drawer}>
            <List>
                <ListItem button component={RouterLink} to={'/collection'}>
                    <ListItemText primary='COLLECTION'/>
                </ListItem>
                {adminState ?
                    <ListItem button component={RouterLink} to={'/manage'}>
                        <ListItemText primary='MANAGE PRODUCTS'/>
                    </ListItem>
                :
                    <ListItem button component={RouterLink} to={'/products'}>
                        <ListItemText primary='PRODUCTS'/>
                    </ListItem>
                }

                <ListItem button component={RouterLink} to={'/contact'}>
                    <ListItemText primary='CONTACT US'/>
                </ListItem>
                <ListItem button component={RouterLink} to={'/orders'}>
                    <ListItemText primary='YOUR ORDERS'/>
                </ListItem>
                <Divider></Divider>
                {auth.logged ? 
                    <ListItem button onClick={props.handleLogout}>
                        <ListItemText primary='LOG OUT'/>
                    </ListItem>            
                : 
                    <ListItem button component={RouterLink} to={'/authentication/login'}>
                        <ListItemText primary='LOGIN'/>
                    </ListItem>
                }
            </List>
        </div>
    )

    return (
        <div>
          <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
    )
};

export default DrawerNavigation;
