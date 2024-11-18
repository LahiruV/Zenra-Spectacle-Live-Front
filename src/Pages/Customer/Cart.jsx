import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItemsList, setOrderContent } from '../../Redux/common-slice';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
    Grid,
    IconButton,
    Card,
    CardContent,
    CardMedia,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Navbar from '../../Components/NavBar/Navbar';
import Footer from '../../Components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '22px',
    },
    card: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        marginLeft: '300px',
        marginRight: '300px'
    },
    cardDetails: {
        flex: 1,
        marginTop: '35px',
        marginBottom: '-36px',
    },
    cardMedia: {
        width: 160,
    },
    buttonGroup: {
        marginLeft: 'auto',
    },
    totalAmount: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontSize: '16px'
    },
}));

const Cart = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItemsList: cartItems } = useSelector((state) => state.common);

    const handleRemoveFromCart = (name) => {
        dispatch(setCartItemsList(cartItems.filter((item) => item.name !== name)));
    };

    const handleChangeQuantity = (name, qty) => {
        const updatedCartItems = cartItems.map((item) =>
            item.name === name ? { ...item, qty } : item
        );
        dispatch(setCartItemsList(updatedCartItems));
    };

    const handleClearCart = () => {
        dispatch(setCartItemsList([]));
        navigate('/products');
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    };

    const handleCheckout = () => {
        const checkoutItems = {
            items: cartItems,
            totalPrice: calculateTotal(),
            orderID: Math.floor(Math.random() * 1000000) + 1,
        };
        dispatch(setOrderContent(checkoutItems))
        navigate('/paymentPage');
    };

    return (
        <>
            <Navbar />
            <div className={classes.root}>
                <br />
                <br />
                <Typography variant="h4" className={classes.title}>
                    Cart
                </Typography>
                <hr style={{ width: '20px', border: '0.5px solid white', marginBottom: '20px', marginTop: '0px' }} />
                {cartItems.map((item) => (
                    <Card key={item.id} className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={item.picture}
                            title={item.name}
                            style={{ height: 160, width: 160 }}
                        />
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Typography>
                                        <Typography variant="subtitle2" style={{ fontSize: '12px' }}>
                                            Price: {item.price} LKR
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: '12px' }}>
                                            Quantity:
                                            <input
                                                type="number"
                                                style={{ width: 50, marginLeft: 10, fontSize: '12px' }}
                                                value={item.qty}
                                                onChange={(e) => handleChangeQuantity(item.name, parseInt(e.target.value))}
                                                min={1}
                                            />
                                        </Typography>
                                    </div>
                                    <div>
                                        <IconButton aria-label="remove" onClick={() => handleRemoveFromCart(item.name)}>
                                            <DeleteIcon color='error' style={{ fontSize: '22px', }} />
                                        </IconButton>
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
                {cartItems.length === 0 && (
                    <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '12px', color: 'white', paddingBottom: '60vh', textAlign: 'center' }}>
                        Your cart is empty.
                    </Typography>
                )}
                {cartItems.length > 0 && (
                    <div style={{ textAlign: 'right', paddingRight: '300px' }}>
                        <Typography variant="h6" gutterBottom className={classes.totalAmount}>
                            Total Price: {calculateTotal()} LKR
                        </Typography>
                        <Grid container spacing={2} justify="flex-end">
                            <Grid item>
                                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', fontSize: '12px' }} onClick={handleClearCart}>
                                    Clear
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" color="primary" style={{ fontSize: '12px' }} onClick={handleCheckout}>
                                    Check Out
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;