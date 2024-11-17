import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { Facebook, Twitter, Instagram, Email, Phone, Print } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Copyright from '../Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#212121',
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(4),
    },
    socialIcons: {
        '& > *': {
            marginRight: theme.spacing(2),
            color: '#0080FF',
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
        marginRight: theme.spacing(2),
    },
    contactGrid: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    contactIcon: {
        marginRight: theme.spacing(1),
    },
    logo: {
        width: '100px',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'right',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px' }}>
                        Finder<span style={{ color: '#0080FF' }}>-Spectacles</span>
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                        At Finder-Spectacles, we’re dedicated to providing a seamless and stylish eyewear shopping experience. We’re here to help you see and look your best.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px' }}>
                        Useful Links
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '12px' }}>
                        <Link to="/home" className={classes.link}>Shop</Link>
                        <br />
                        <Link to="/home" className={classes.link}>Contact Us</Link>
                        <br />
                        <Link to="/home" className={classes.link}>Careers</Link>
                        <br />
                        <Link to="/home" className={classes.link}>Terms & Conditions</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px' }}>
                        Contact
                    </Typography>
                    <div className={classes.contactGrid}>
                        <Email className={classes.contactIcon} style={{ fontSize: '16px' }} />
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                            finderspectacles@gmail.com
                        </Typography>
                    </div>
                    <div className={classes.contactGrid}>
                        <Phone className={classes.contactIcon} style={{ fontSize: '16px' }} />
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                            +94 11 90 2903
                        </Typography>
                    </div>
                    <div className={classes.contactGrid}>
                        <Print className={classes.contactIcon} style={{ fontSize: '16px' }} />
                        <Typography variant="body1" style={{ fontSize: '12px' }}>
                            +94 33 78 9029
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom style={{ fontSize: '16px' }}>
                        Connect with Us
                    </Typography>
                    <div className={classes.socialIcons}>
                        <IconButton>
                            <Facebook style={{ fontSize: '22px' }} />
                        </IconButton>
                        <IconButton>
                            <Twitter style={{ fontSize: '22px' }} />
                        </IconButton>
                        <IconButton>
                            <Instagram style={{ fontSize: '22px' }} />
                        </IconButton>
                    </div>
                    <div className={classes.logoContainer}>
                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlb9JRG0kl627LgiL7oRDJpZC-n_CcLg4zw&s'} alt="Company Logo" className={classes.logo} />
                    </div>
                </Grid>
            </Grid>
            <Typography variant="body1" align="center" >
                <Copyright />
            </Typography>
        </footer>
    );
};

export default Footer;
