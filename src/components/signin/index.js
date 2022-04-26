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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { signin as signinCall } from '../../services';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { Navigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

function Signin() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('AR');
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [goToLogin, setGoToLogin] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  async function createUser() {
    signinCall(firstname, lastname, email, password, phoneNumber, country, (data) => {
      if (!data || !data.id) {
        let errors = Object.keys(data);
        if (errors.length === 1) {
          setError("El campo " + Object.keys(data).join() + " no es válido");
        } else {
          setError("Los campos " + Object.keys(data).join() + " no son válidos");
        }
        setOpen(true);
      } else {
        // Se registro correctamente y lo llevo a login
        setGoToLogin(true);
      }
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

  function handleRepeatedPasswordChange(event) {
    setRepeatPassword(event.target.value);
  }

  function handlePhoneNumber(event) {
    const re = /^[0-9,\-,+, ]+$/g;
    if (event.target.value === '' || re.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  }

  function handleCountry(event) {
    setCountry(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (password.length >= 6 && password === repeatPassword) {
      createUser();
    } else if (!(password === repeatPassword)) {
      setError("El campo Contraseña y Repetir Contraseña no coinciden");
      setOpen(true);
    } else if (password.length <= 6) {
      setError("La contraseña debe tener por lo menos seis caracteres");
      setOpen(true);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (goToLogin) {
    return <Navigate to="/login"/>
  }

  return (
    <main className={'mig-classes-main'}>
      <Paper className={'mig-classes-paper'}>
        <Avatar className={'mig-classes-avatar'}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={'mig-classes-form'} onSubmit={handleFormSubmit}>
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
              onChange={handlePhoneNumber}
              value={phoneNumber}
              rows="number"
            />
            </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="country">País</InputLabel>
            <Select name="country"
                    type="country"
                    id="country"
                    input={<Input />}
                    autoComplete="country"
                    onChange={handleCountry}
                    value={country}
            >
              <MenuItem value="AF">Afganistán</MenuItem>
              <MenuItem value="AL">Albania</MenuItem>
              <MenuItem value="DE">Alemania</MenuItem>
              <MenuItem value="AD">Andorra</MenuItem>
              <MenuItem value="AO">Angola</MenuItem>
              <MenuItem value="AI">Anguilla</MenuItem>
              <MenuItem value="AQ">Antártida</MenuItem>
              <MenuItem value="AG">Antigua y Barbuda</MenuItem>
              <MenuItem value="AN">Antillas Holandesas</MenuItem>
              <MenuItem value="SA">Arabia Saudí</MenuItem>
              <MenuItem value="DZ">Argelia</MenuItem>
              <MenuItem value="AR">Argentina</MenuItem>
              <MenuItem value="AM">Armenia</MenuItem>
              <MenuItem value="AW">Aruba</MenuItem>
              <MenuItem value="AU">Australia</MenuItem>
              <MenuItem value="AT">Austria</MenuItem>
              <MenuItem value="AZ">Azerbaiyán</MenuItem>
              <MenuItem value="BS">Bahamas</MenuItem>
              <MenuItem value="BH">Bahrein</MenuItem>
              <MenuItem value="BD">Bangladesh</MenuItem>
              <MenuItem value="BB">Barbados</MenuItem>
              <MenuItem value="BE">Bélgica</MenuItem>
              <MenuItem value="BZ">Belice</MenuItem>
              <MenuItem value="BJ">Benin</MenuItem>
              <MenuItem value="BM">Bermudas</MenuItem>
              <MenuItem value="BY">Bielorrusia</MenuItem>
              <MenuItem value="MM">Birmania</MenuItem>
              <MenuItem value="BO">Bolivia</MenuItem>
              <MenuItem value="BA">Bosnia y Herzegovina</MenuItem>
              <MenuItem value="BW">Botswana</MenuItem>
              <MenuItem value="BR">Brasil</MenuItem>
              <MenuItem value="BN">Brunei</MenuItem>
              <MenuItem value="BG">Bulgaria</MenuItem>
              <MenuItem value="BF">Burkina Faso</MenuItem>
              <MenuItem value="BI">Burundi</MenuItem>
              <MenuItem value="BT">Bután</MenuItem>
              <MenuItem value="CV">Cabo Verde</MenuItem>
              <MenuItem value="KH">Camboya</MenuItem>
              <MenuItem value="CM">Camerún</MenuItem>
              <MenuItem value="CA">Canadá</MenuItem>
              <MenuItem value="TD">Chad</MenuItem>
              <MenuItem value="CL">Chile</MenuItem>
              <MenuItem value="CN">China</MenuItem>
              <MenuItem value="CY">Chipre</MenuItem>
              <MenuItem value="VA">Ciudad del Vaticano (Santa Sede)</MenuItem>
              <MenuItem value="CO">Colombia</MenuItem>
              <MenuItem value="KM">Comores</MenuItem>
              <MenuItem value="CG">Congo</MenuItem>
              <MenuItem value="CD">Congo, República Democrática del</MenuItem>
              <MenuItem value="KR">Corea</MenuItem>
              <MenuItem value="KP">Corea del Norte</MenuItem>
              <MenuItem value="CI">Costa de Marfíl</MenuItem>
              <MenuItem value="CR">Costa Rica</MenuItem>
              <MenuItem value="HR">Croacia (Hrvatska)</MenuItem>
              <MenuItem value="CU">Cuba</MenuItem>
              <MenuItem value="DK">Dinamarca</MenuItem>
              <MenuItem value="DJ">Djibouti</MenuItem>
              <MenuItem value="DM">Dominica</MenuItem>
              <MenuItem value="EC">Ecuador</MenuItem>
              <MenuItem value="EG">Egipto</MenuItem>
              <MenuItem value="SV">El Salvador</MenuItem>
              <MenuItem value="AE">Emiratos Árabes Unidos</MenuItem>
              <MenuItem value="ER">Eritrea</MenuItem>
              <MenuItem value="SI">Eslovenia</MenuItem>
              <MenuItem value="ES" selected>España</MenuItem>
              <MenuItem value="US">Estados Unidos</MenuItem>
              <MenuItem value="EE">Estonia</MenuItem>
              <MenuItem value="ET">Etiopía</MenuItem>
              <MenuItem value="FJ">Fiji</MenuItem>
              <MenuItem value="PH">Filipinas</MenuItem>
              <MenuItem value="FI">Finlandia</MenuItem>
              <MenuItem value="FR">Francia</MenuItem>
              <MenuItem value="GA">Gabón</MenuItem>
              <MenuItem value="GM">Gambia</MenuItem>
              <MenuItem value="GE">Georgia</MenuItem>
              <MenuItem value="GH">Ghana</MenuItem>
              <MenuItem value="GI">Gibraltar</MenuItem>
              <MenuItem value="GD">Granada</MenuItem>
              <MenuItem value="GR">Grecia</MenuItem>
              <MenuItem value="GL">Groenlandia</MenuItem>
              <MenuItem value="GP">Guadalupe</MenuItem>
              <MenuItem value="GU">Guam</MenuItem>
              <MenuItem value="GT">Guatemala</MenuItem>
              <MenuItem value="GY">Guayana</MenuItem>
              <MenuItem value="GF">Guayana Francesa</MenuItem>
              <MenuItem value="GN">Guinea</MenuItem>
              <MenuItem value="GQ">Guinea Ecuatorial</MenuItem>
              <MenuItem value="GW">Guinea-Bissau</MenuItem>
              <MenuItem value="HT">Haití</MenuItem>
              <MenuItem value="HN">Honduras</MenuItem>
              <MenuItem value="HU">Hungría</MenuItem>
              <MenuItem value="IN">India</MenuItem>
              <MenuItem value="ID">Indonesia</MenuItem>
              <MenuItem value="IQ">Irak</MenuItem>
              <MenuItem value="IR">Irán</MenuItem>
              <MenuItem value="IE">Irlanda</MenuItem>
              <MenuItem value="BV">Isla Bouvet</MenuItem>
              <MenuItem value="CX">Isla de Christmas</MenuItem>
              <MenuItem value="IS">Islandia</MenuItem>
              <MenuItem value="KY">Islas Caimán</MenuItem>
              <MenuItem value="CK">Islas Cook</MenuItem>
              <MenuItem value="CC">Islas de Cocos o Keeling</MenuItem>
              <MenuItem value="FO">Islas Faroe</MenuItem>
              <MenuItem value="HM">Islas Heard y McDonald</MenuItem>
              <MenuItem value="FK">Islas Malvinas</MenuItem>
              <MenuItem value="MP">Islas Marianas del Norte</MenuItem>
              <MenuItem value="MH">Islas Marshall</MenuItem>
              <MenuItem value="UM">Islas menores de Estados Unidos</MenuItem>
              <MenuItem value="PW">Islas Palau</MenuItem>
              <MenuItem value="SB">Islas Salomón</MenuItem>
              <MenuItem value="SJ">Islas Svalbard y Jan Mayen</MenuItem>
              <MenuItem value="TK">Islas Tokelau</MenuItem>
              <MenuItem value="TC">Islas Turks y Caicos</MenuItem>
              <MenuItem value="VI">Islas Vírgenes (EEUU)</MenuItem>
              <MenuItem value="VG">Islas Vírgenes (Reino Unido)</MenuItem>
              <MenuItem value="WF">Islas Wallis y Futuna</MenuItem>
              <MenuItem value="IL">Israel</MenuItem>
              <MenuItem value="IT">Italia</MenuItem>
              <MenuItem value="JM">Jamaica</MenuItem>
              <MenuItem value="JP">Japón</MenuItem>
              <MenuItem value="JO">Jordania</MenuItem>
              <MenuItem value="KZ">Kazajistán</MenuItem>
              <MenuItem value="KE">Kenia</MenuItem>
              <MenuItem value="KG">Kirguizistán</MenuItem>
              <MenuItem value="KI">Kiribati</MenuItem>
              <MenuItem value="KW">Kuwait</MenuItem>
              <MenuItem value="LA">Laos</MenuItem>
              <MenuItem value="LS">Lesotho</MenuItem>
              <MenuItem value="LV">Letonia</MenuItem>
              <MenuItem value="LB">Líbano</MenuItem>
              <MenuItem value="LR">Liberia</MenuItem>
              <MenuItem value="LY">Libia</MenuItem>
              <MenuItem value="LI">Liechtenstein</MenuItem>
              <MenuItem value="LT">Lituania</MenuItem>
              <MenuItem value="LU">Luxemburgo</MenuItem>
              <MenuItem value="MK">Macedonia, Ex-República Yugoslava de</MenuItem>
              <MenuItem value="MG">Madagascar</MenuItem>
              <MenuItem value="MY">Malasia</MenuItem>
              <MenuItem value="MW">Malawi</MenuItem>
              <MenuItem value="MV">Maldivas</MenuItem>
              <MenuItem value="ML">Malí</MenuItem>
              <MenuItem value="MT">Malta</MenuItem>
              <MenuItem value="MA">Marruecos</MenuItem>
              <MenuItem value="MQ">Martinica</MenuItem>
              <MenuItem value="MU">Mauricio</MenuItem>
              <MenuItem value="MR">Mauritania</MenuItem>
              <MenuItem value="YT">Mayotte</MenuItem>
              <MenuItem value="MX">México</MenuItem>
              <MenuItem value="FM">Micronesia</MenuItem>
              <MenuItem value="MD">Moldavia</MenuItem>
              <MenuItem value="MC">Mónaco</MenuItem>
              <MenuItem value="MN">Mongolia</MenuItem>
              <MenuItem value="MS">Montserrat</MenuItem>
              <MenuItem value="MZ">Mozambique</MenuItem>
              <MenuItem value="NA">Namibia</MenuItem>
              <MenuItem value="NR">Nauru</MenuItem>
              <MenuItem value="NP">Nepal</MenuItem>
              <MenuItem value="NI">Nicaragua</MenuItem>
              <MenuItem value="NE">Níger</MenuItem>
              <MenuItem value="NG">Nigeria</MenuItem>
              <MenuItem value="NU">Niue</MenuItem>
              <MenuItem value="NF">Norfolk</MenuItem>
              <MenuItem value="NO">Noruega</MenuItem>
              <MenuItem value="NC">Nueva Caledonia</MenuItem>
              <MenuItem value="NZ">Nueva Zelanda</MenuItem>
              <MenuItem value="OM">Omán</MenuItem>
              <MenuItem value="NL">Países Bajos</MenuItem>
              <MenuItem value="PA">Panamá</MenuItem>
              <MenuItem value="PG">Papúa Nueva Guinea</MenuItem>
              <MenuItem value="PK">Paquistán</MenuItem>
              <MenuItem value="PY">Paraguay</MenuItem>
              <MenuItem value="PE">Perú</MenuItem>
              <MenuItem value="PN">Pitcairn</MenuItem>
              <MenuItem value="PF">Polinesia Francesa</MenuItem>
              <MenuItem value="PL">Polonia</MenuItem>
              <MenuItem value="PT">Portugal</MenuItem>
              <MenuItem value="PR">Puerto Rico</MenuItem>
              <MenuItem value="QA">Qatar</MenuItem>
              <MenuItem value="UK">Reino Unido</MenuItem>
              <MenuItem value="CF">República Centroafricana</MenuItem>
              <MenuItem value="CZ">República Checa</MenuItem>
              <MenuItem value="ZA">República de Sudáfrica</MenuItem>
              <MenuItem value="DO">República Dominicana</MenuItem>
              <MenuItem value="SK">República Eslovaca</MenuItem>
              <MenuItem value="RE">Reunión</MenuItem>
              <MenuItem value="RW">Ruanda</MenuItem>
              <MenuItem value="RO">Rumania</MenuItem>
              <MenuItem value="RU">Rusia</MenuItem>
              <MenuItem value="EH">Sahara Occidental</MenuItem>
              <MenuItem value="KN">Saint Kitts y Nevis</MenuItem>
              <MenuItem value="WS">Samoa</MenuItem>
              <MenuItem value="AS">Samoa Americana</MenuItem>
              <MenuItem value="SM">San Marino</MenuItem>
              <MenuItem value="VC">San Vicente y Granadinas</MenuItem>
              <MenuItem value="SH">Santa Helena</MenuItem>
              <MenuItem value="LC">Santa Lucía</MenuItem>
              <MenuItem value="ST">Santo Tomé y Príncipe</MenuItem>
              <MenuItem value="SN">Senegal</MenuItem>
              <MenuItem value="SC">Seychelles</MenuItem>
              <MenuItem value="SL">Sierra Leona</MenuItem>
              <MenuItem value="SG">Singapur</MenuItem>
              <MenuItem value="SY">Siria</MenuItem>
              <MenuItem value="SO">Somalia</MenuItem>
              <MenuItem value="LK">Sri Lanka</MenuItem>
              <MenuItem value="PM">St Pierre y Miquelon</MenuItem>
              <MenuItem value="SZ">Suazilandia</MenuItem>
              <MenuItem value="SD">Sudán</MenuItem>
              <MenuItem value="SE">Suecia</MenuItem>
              <MenuItem value="CH">Suiza</MenuItem>
              <MenuItem value="SR">Surinam</MenuItem>
              <MenuItem value="TH">Tailandia</MenuItem>
              <MenuItem value="TW">Taiwán</MenuItem>
              <MenuItem value="TZ">Tanzania</MenuItem>
              <MenuItem value="TJ">Tayikistán</MenuItem>
              <MenuItem value="TF">Territorios franceses del Sur</MenuItem>
              <MenuItem value="TP">Timor Oriental</MenuItem>
              <MenuItem value="TG">Togo</MenuItem>
              <MenuItem value="TO">Tonga</MenuItem>
              <MenuItem value="TT">Trinidad y Tobago</MenuItem>
              <MenuItem value="TN">Túnez</MenuItem>
              <MenuItem value="TM">Turkmenistán</MenuItem>
              <MenuItem value="TR">Turquía</MenuItem>
              <MenuItem value="TV">Tuvalu</MenuItem>
              <MenuItem value="UA">Ucrania</MenuItem>
              <MenuItem value="UG">Uganda</MenuItem>
              <MenuItem value="UY">Uruguay</MenuItem>
              <MenuItem value="UZ">Uzbekistán</MenuItem>
              <MenuItem value="VU">Vanuatu</MenuItem>
              <MenuItem value="VE">Venezuela</MenuItem>
              <MenuItem value="VN">Vietnam</MenuItem>
              <MenuItem value="YE">Yemen</MenuItem>
              <MenuItem value="YU">Yugoslavia</MenuItem>
              <MenuItem value="ZM">Zambia</MenuItem>
              <MenuItem value="ZW">Zimbabue</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="repeat-password">Repetir Contraseña</InputLabel>
            <Input
                error={(repeatPassword !== password)}
                name="repeat-password"
                type={showPassword ? 'text' : 'password'}
                id="repeat-password"
                autoComplete="password"
                onChange={handleRepeatedPasswordChange}
                value={repeatPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={'mig-classes-submit login__principal-buton'}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={'dialog-title'} id="alert-dialog-title">{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText className={'dialog-content'}  id="alert-dialog-description">
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
 
export default Signin;