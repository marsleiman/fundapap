import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '../../hooks/use-user';
import {logout} from "../../services";

/**
 * @param {string} name the name to avatar
 */

const ResponsiveAppBar = () => {
  const { user, accessToken, setAccessToken } = useUser();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLogerMenu = () => {
    logout(accessToken, (data) => setAccessToken(null));
    handleCloseUserMenu();
  };

  const settings = [
    {
      text: 'Inicio',
      func: () => window.location.href = '/home',
    },
    {
      text: 'Perfil',
      func: () => window.location.href = '/user',
    },
    {
      text: 'Cerrar sesión',
      func: () => handleCloseLogerMenu(),
    },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           {/*   MOBILE MENÚ  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <a href="/home" className="logo__link-app-bar"></a>
          </Box>
          {/*   DESKTOP MENÚ   */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <a href="/home" className="logo__link-app-bar"></a>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {
                user && user.name ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(`${user.name}`)} />
                </IconButton>
                ) : (
                  <div>
                    <a className="link-app-bar" href="login" underline="none">
                      {'INGRESAR'}
                    </a>
                  </div>
                )
              }
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={setting.func}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
