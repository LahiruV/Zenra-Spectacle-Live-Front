import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, MenuItem, Menu, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useSelector } from 'react-redux';

const defaultTheme = createTheme();
const Navbar = () => {
  const { cartItemsCount } = useSelector((state) => state.common);
  const handleLogout = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('user', '');
    window.location.href = '/';
  };

  const clickHome = () => {
    window.location.href = '/home';
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '12px',
  };

  const activeStyle = {
    color: '#0080FF',
    fontSize: '12px',
  };

  const getLinkStyle = ({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle);

  useEffect(() => {
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === '') {
      window.location.href = '/';
    }
  }
    , []);


  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between', backgroundColor: '#282828' }}>
          <Typography variant="h6" component={NavLink} to="/" style={{ ...linkStyle, flexGrow: 1, fontWeight: 'bolder', fontSize: '16px' }}>
            Finder<span style={{ color: '#0080FF' }}>-Spectacles</span>
          </Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <MenuItem component={NavLink} to="/home" style={getLinkStyle} onClick={clickHome}>
              Home
            </MenuItem>
            <MenuItem component={NavLink} to="/products" style={getLinkStyle}>
              Products
            </MenuItem>
            <MenuItem component={NavLink} to="/cart" style={getLinkStyle}>
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingBagIcon style={{ color: 'white' }} />
              </Badge>
            </MenuItem>
            <Button variant="contained" color="primary" component={NavLink} onClick={handleLogout} style={{ fontSize: '12px' }}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
