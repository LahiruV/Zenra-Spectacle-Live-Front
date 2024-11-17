import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, MenuItem, Menu, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const defaultTheme = createTheme();
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

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
            <MenuItem component={NavLink} to="/bodims" style={getLinkStyle}>
              Products
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
