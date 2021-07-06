import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    backButton: {
        position: 'absolute',
        top: '3%',
        left: '3%',
        display: 'flex',
        alignItems:'center'
    }
}));

const AuthHeader = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.backButton}>
            <IconButton onClick={() => {history.push("/", {from: "Authentication"})}}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary">Back</Typography>
        </div>
    )
}

export default AuthHeader
