/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer';
import MainNavbar from '../../Components/NavBar/MainNavbar';
import configs from '../../config.js';

const defaultTheme = createTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        paddingTop: '130px'
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 200,
    },
    carousel: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '700px',
    },
    arrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: theme.spacing(1),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
    },
    prevArrow: {
        left: theme.spacing(2),
    },
    nextArrow: {
        right: theme.spacing(2),
    },
    description: {
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: theme.spacing(6.5),
        width: '85%',
    },
}));

const MainHome = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handlePrevSlide = () => {
        setActiveStep((prevStep) => (prevStep === 0 ? carouselImages.length - 1 : prevStep - 1));
    };

    const handleNextSlide = () => {
        setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
    };

    const carouselImages = [
        'https://plus.unsplash.com/premium_photo-1692340973720-3e82f5dc22ea?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/27347004/pexels-photo-27347004/free-photo-of-sunglasse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1311541/pexels-photo-1311541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get(`${configs.apiUrl}/auth/me`, config);
                localStorage.setItem("user", JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <MainNavbar />
            <div className={classes.root}>
                <Typography variant="h4" align="center" className={classes.title} style={{ fontWeight: 'bold', marginTop: '-40px', marginBottom: '-20px', fontSize: '22px' }}>
                    Welcome To Finder<span style={{ color: '#0080FF' }}> Spectacles</span>
                    <hr style={{ width: '200px', border: '0.3px solid white' }} />
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12} lg={'auto'} >
                        <div className={classes.carousel}>
                            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
                                {carouselImages.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`Carousel Image ${index + 1}`} className={classes.carouselImage} />
                                    </div>
                                ))}
                            </SwipeableViews>
                            <Typography variant="body1" className={classes.description} align="center">
                                <Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'lighter' }}>
                                    Welcome to Finder-Spectacles! We're excited to help you discover the perfect eyewear that enhances both your vision and style. Explore our wide selection of trendy and classic frames, and enjoy our virtual try-on feature for a seamless shopping experience. Thank you for choosing Finder-Spectacles where fashion meets function!
                                </Typography>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <hr style={{ border: '0.3px solid white', width: '80%' }} />
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    title="Emily Ross"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        Emily Ross
                                    </Typography>
                                    <Typography variant="body2" component="p" style={{ fontSize: '12px' }}>
                                        "Finder-Spectacles made finding my perfect pair of glasses so easy! The virtual try-on feature was a game-changer, and I couldn’t be happier with my stylish new frames."
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    title="James Patel"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        James Patel
                                    </Typography>
                                    <Typography variant="body2" component="p" style={{ fontSize: '12px' }}>
                                        "Amazing service and an incredible selection of eyewear! I found exactly what I was looking for and loved how seamless the entire process was. Highly recommend Finder-Spectacles!"
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    title="Norway"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        Sophia Tran
                                    </Typography>
                                    <Typography variant="body2" component="p" style={{ fontSize: '12px' }}>
                                        "I’ve never had such an enjoyable online shopping experience for glasses. The variety and quality exceeded my expectations, and the website’s user-friendly design made everything."
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </ThemeProvider>
    );
};

export default MainHome;
