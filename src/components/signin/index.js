import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useUser } from '../../hooks/use-user';
import { signin as signinCall } from '../../services';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


function Signin(props) {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const { setAccessToken } = useUser();
  const { classes } = props;
 
  async function createUser() {
    signinCall(firstname, lastname, email, password, phoneNumber, country, (data) => {

    });
  };


  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleFirstname(event) {
    setFirstname(event.target.value);
  }

  function handleLastname(event) {
    setLastname(event.target.value);
  }
 
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
 
  function handlePhoneNumbere(event) {
    setPhoneNumber(event.target.value);
  }
 
  function handleCountry(event) {
    setCountry(event.target.value);
  }
 
  function handleFormSubmit(event) {
    event.preventDefault();
    createUser();
  } 
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstname">Nombre</InputLabel>
            <Input
            id="firstname"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            onChange={handleFirstname}
            value={firstname}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastname">Apellido</InputLabel>
            <Input
            id="lastname"
            name="lastname"
            autoComplete="lastname"
            autoFocus
            onChange={handleLastname}
            value={lastname}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            value={email}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="phoneNumber">Teléfono</InputLabel>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              autoComplete="phoneNumber"
              autoFocus
              onChange={handlePhoneNumbere}
              value={phoneNumber}
              rows="number"
            />
            </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="country">País</InputLabel>
            <Input
              name="country"
              type="country"
              id="country"
              autoComplete="country"
              onChange={handleCountry}
              value={country}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} login__principal-buton`}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
    </main>
  );
}
 
export default withStyles(styles)(Signin);