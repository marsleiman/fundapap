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
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link} from '@mui/material';
import {login} from '../../services';

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
 
function Login(props) {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const { setAccessToken } = useUser();
  const { setUser } = useUser();
  const { classes } = props;

  const handleClose = () => {
    setOpen(false);
  };

  function ingresar() {
    login(email, password, (data) => {
      if(data.status === "success"){
        setAccessToken(data.api_key);
        let userLog = {
          name: `${data.firstname} ${data.lastname}`,
        }
        setUser(userLog);
        setError(undefined);
      } else if (data.status === "fail") {
        setError("El email y/o el password ingresado es incorrecto");
        setOpen(true);
      } else {
        setError("Por favor ingrese un email válido");
        setOpen(true);
      }
    });
  }
 
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
 
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
 
  function handleFormSubmit(event) {
    event.preventDefault();
    ingresar();
  } 
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
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
            className={`${classes.submit} login__principal-buton`}
          >
            Ingresar
          </Button>
        </form>
        {/* <Link className="login__link" href="/donde?" underline="always">
          {'¿Olvidaste tu contraseña?'}
        </Link> */}
        <Link className="login__link" href="signin" underline="always">
          {'Crear cuenta'}
        </Link>
      </Paper>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${error}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
 
export default withStyles(styles)(Login);