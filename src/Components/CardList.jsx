/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import configs from '../config';
import Swal from 'sweetalert2';


export default function PropertyCardList({ props }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selecteditem, setSelecteditem] = useState(null);
    const token = sessionStorage.getItem('token');
    const loguser = localStorage.getItem('user');


    const handleClickOpen = (props) => {
        setSelecteditem(props);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelecteditem(null);
    };

    const bookingProperty = async (data) => {
        localStorage.setItem('bookingProperty', JSON.stringify(data));
        navigate('/bookingForm')
    }


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
                                        <button variant="contained" color="primary" style={{ marginTop: '5px', backgroundColor: '#0080FF', fontSize: '12px', borderRadius: '5px', marginRight: '10px' }} onClick={() => bookingProperty(data)}>
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
                    <Typography variant="body2" color="text.secondary">
                        <b>Price : </b> {selecteditem?.price} LKR
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Adderss : </b> {selecteditem?.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Contact : </b> {selecteditem?.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Campus Area : </b> {selecteditem?.area}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Email : </b> {selecteditem?.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Description : </b> {selecteditem?.description}
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 0 }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={selecteditem?.picture2}
                            alt={selecteditem?.name}
                            sx={{ marginLeft: '10px', padding: '25px', radius: '10px' }}
                        />
                        <CardMedia
                            component="img"
                            height="200"
                            image={selecteditem?.picture3}
                            alt={selecteditem?.name}
                            sx={{ padding: '25px', radius: '10px' }}
                        />
                        <CardMedia
                            component="img"
                            height="200"
                            image={selecteditem?.picture4}
                            alt={selecteditem?.name}
                            sx={{ marginRight: '10px', padding: '25px', radius: '10px' }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

