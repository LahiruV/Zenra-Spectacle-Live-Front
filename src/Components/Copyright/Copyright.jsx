import { Typography, Link } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" mt={5}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Finder<span style={{ color: '#0080FF' }}>-Spectacles</span>
      </Link> {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;