import React, {useState} from 'react';
import axios from 'axios';
import { Typography, Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: '#587D9F',
    },
  },
}));

type ErrorMessage = {
  error: boolean;
  message: string;
};

const generateErrorMessage = (setter:  React.Dispatch<React.SetStateAction<ErrorMessage>>, message: string) => {
  setter({error: true, message});
};


const Login = (props: any) => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({error: false, message: ''});
  const classes = useStyles();
  const history = props.history;

  const handleLoginRequest = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;
    
    if(username === '' || password === '')
    { generateErrorMessage(setErrorMessage, 'Fields are requried'); return; };
    
    
    axios.post('http://localhost:5000/authentication/login', {username, password})
      .then(res => {
        // alert(res.data.message);
        history.push("/");
      })
      .catch(error => {
        if(error.response) {
          generateErrorMessage(setErrorMessage, error.response.data.message);
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        };
      });
  };


  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMessage.error && <Typography color="error" align="center" variant="body1">{errorMessage.message}</Typography>}
        <form className={classes.form} noValidate onSubmit={handleLoginRequest}>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" type="text" name="username" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="#" className={classes.link}>
                <Typography variant="body2">Forgot password?</Typography>
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/authentication/register" className={classes.link}>
                <Typography variant="body2">Don't have an account? Sign Up</Typography>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;