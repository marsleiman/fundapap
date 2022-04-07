import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '../../hooks/use-user';
import { Link } from "react-router-dom";

/**
 * @param {string} name the name to avatar
 */

const ResponsiveAppBar = () => {
  const { user, setAccessToken } = useUser();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLogerMenu = () => {
    setAccessToken(null);
    handleCloseUserMenu();
  };

  const pages = [
    {
      text: 'Home',
      link: '/home',
    },
    {
      text: 'Reunion',
      link: 'meet',
    }
  ];
  const settings = [
    {
      text: 'Usuario',
      func: () => window.location.href = 'http://localhost:3000/user',
    },
    {
      text: 'Salir',
      func: () => handleCloseLogerMenu(),
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
           <Link to={page.link}>
              <Button
                to={page.link}
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
           </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {
                user.name ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(`${user.name}`)} />
                </IconButton>
                ) : (
                  <div>
                    <a className="link-app-bar" href="login" underline="none">
                      {'Ingresar'}
                    </a>
                    <a className="link-app-bar" href="signin" underline="none">
                      {'Registrarse'}
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
