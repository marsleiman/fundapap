import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { useUser } from '../../hooks/use-user';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link} from '@mui/material';
import {login} from '../../services';
 
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
    <main className={'mig-classes-main'}>
      <Paper className={'mig-classes-paper'}>
        <Avatar className={'mig-classes-avatar'}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form className={'mig-classes-form'} onSubmit={handleFormSubmit}>
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
            className={'mig-classes-submit login__principal-buton'}
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
        <DialogTitle
          className={'dialog-title'}
          id="alert-dialog-title"
          >
            {"Atención"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={'dialog-content'} id="alert-dialog-description">
            {`${error}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={'dialog-button'} onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
 
export default Login;