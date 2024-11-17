import { AppBar, Toolbar, Typography, Button, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const MainNavbar = () => {

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between', backgroundColor: '#282828' }}>
          <Typography variant="h6" component={NavLink} to="/" style={{ ...linkStyle, flexGrow: 1, fontWeight: 'bolder', fontSize: '16px' }}>
            Finder<span style={{ color: '#0080FF' }}>-Spectacles</span>
          </Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="contained" color="primary" component={NavLink} to="/Register" style={{ fontSize: '12px' }}>
              Register
            </Button>
            <Button variant="contained" color="primary" component={NavLink} to="/Login" style={{ fontSize: '12px' }}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default MainNavbar;
