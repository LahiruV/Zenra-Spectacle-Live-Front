/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setCartItemsList } from '../Redux/common-slice';
import { useDispatch, useSelector } from "react-redux";

export default function PropertyCardList({ props }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selecteditem, setSelecteditem] = useState(null);
    const { cartItemsList } = useSelector((state) => state.common);

    const addToCart = (data) => {
        const isExist = cartItemsList.some((item) => item.name === data.name);
        if (isExist) {
            alert("This item is already in the cart");
        } else {
            const cartItems = [data];
            dispatch(setCartItemsList(cartItemsList.concat(cartItems)));
        }
    };

    const handleClickOpen = (props) => {
        setSelecteditem(props);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelecteditem(null);
        window.location.reload();
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {props.map((data) => (
                    <Grid item key={data.id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardMedia
                                component="img"
                                height="200"
                                image={data.picture}
                                alt={data.name}
                            />
                            <CardContent>
                                <Typography variant="h5" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    {data.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }}>
                                    <b>{data.gender}</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }}>
                                    <b>Price : </b> {data.price} LKR
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }}>
                                    {data.description}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '-10px' }}>
                                    <div></div>
                                    <div>
                                        <button variant="contained" color="primary" style={{ marginTop: '5px', backgroundColor: '#0080FF', fontSize: '12px', borderRadius: '5px', marginRight: '10px' }} onClick={() => addToCart(data)}>
                                            Add Cart
                                        </button>
                                        <button variant="contained" color="primary" style={{ marginTop: '5px', backgroundColor: '#7400B6', fontSize: '12px', borderRadius: '5px' }} onClick={() => handleClickOpen(data)}>
                                            Try Me
                                        </button>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="400px">
                <DialogTitle>
                    {selecteditem?.name}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <h1 style={{ fontSize: `16px` }}>Virtual Sunglasses Try-On</h1>
                    <div className="video-container">
                        <img
                            key={selecteditem?.sunglass}
                            src={`http://localhost:8000/stream/?sunglasses=${selecteditem?.sunglass}`}
                            alt="Sunglasses Try-On"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

