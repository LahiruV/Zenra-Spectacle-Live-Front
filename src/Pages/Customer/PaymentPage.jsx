import { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import visaIcon from '../../assets/visa.svg';
import masterCardIcon from '../../assets/mastercard.svg';
import axios from 'axios';
import configs from '../../config.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItemsList } from '../../Redux/common-slice.ts';

const PaymentPage = () => {
    const { orderContent, userMail } = useSelector((state) => state.common);
    const token = sessionStorage.getItem('token');
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        expDate: '',
        cvv: '',
        holderName: ''
    });
    const [errors, setErrors] = useState({
        cardNumber: false,
        expDate: false,
        cvv: false,
        holderName: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: false
        });
    };

    const validate = () => {
        let tempErrors = { ...errors };
        tempErrors.cardNumber = formValues.cardNumber.length !== 16 || !/^\d+$/.test(formValues.cardNumber);
        tempErrors.expDate = !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formValues.expDate);
        tempErrors.cvv = formValues.cvv.length !== 3 || !/^\d+$/.test(formValues.cvv);
        tempErrors.holderName = formValues.holderName === '';
        setErrors(tempErrors);

        return Object.values(tempErrors).every((x) => x === false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const itemNames = orderContent.items.map(item => item.name).join(', ');
            const emailData = {
                email: userMail,
                header: `Order Created ${orderContent.orderID}`,
                content: `Your order has been created successfully. Your order ID is ${orderContent.orderID}. Full Amount: ${orderContent.totalPrice} LKR. Items: ${itemNames}.`,
            };
            axios.post(`${configs.apiUrl}/mail/mail`, emailData, { headers: { 'Authorization': `Bearer ${token}` } });
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your payment was successful!',
            }).then(() => {
                dispatch(setCartItemsList([]));
                window.location.href = '/home';
            });
        }
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 400,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Typography variant="h5" sx={{ mb: 1, color: `#ff6a4b`, fontSize: '20px', fontWeight: 'bolder' }}>
                    Payment Details
                </Typography>

                {/* Visa and MasterCard icons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <img src={visaIcon} alt="Visa" style={{ width: 40, marginRight: 10 }} />
                    <img src={masterCardIcon} alt="MasterCard" style={{ width: 30 }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 0, color: `black`, fontSize: '14px' }}>
                    <b>Way Bill No -</b> {orderContent.orderID}
                </Typography>
                <Typography variant="h6" sx={{ mb: 0, color: `black`, fontSize: '14px' }}>
                    <b>Email -</b> {userMail}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, color: `black`, fontSize: '14px' }}>
                    <b>Amount -</b> {orderContent.totalPrice} LKR
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Card Number"
                            name="cardNumber"
                            value={formValues.cardNumber}
                            onChange={handleChange}
                            error={errors.cardNumber}
                            helperText={errors.cardNumber && 'Card number must be 16 digits and numeric'}
                            fullWidth
                            required
                            inputProps={{ maxLength: 16 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Expiry Date (MM/YY)"
                            name="expDate"
                            value={formValues.expDate}
                            onChange={handleChange}
                            error={errors.expDate}
                            helperText={errors.expDate && 'Enter valid date (MM/YY)'}
                            fullWidth
                            required
                            inputProps={{ maxLength: 5 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CVV"
                            name="cvv"
                            value={formValues.cvv}
                            onChange={handleChange}
                            error={errors.cvv}
                            helperText={errors.cvv && 'CVV must be 3 digits and numeric'}
                            fullWidth
                            required
                            inputProps={{ maxLength: 3 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Card Holder Name"
                            name="holderName"
                            value={formValues.holderName}
                            onChange={handleChange}
                            error={errors.holderName}
                            helperText={errors.holderName && 'Card holder name is required'}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontSize: '12px' }}>
                    Submit Payment
                </Button>
            </Box>
        </div>
    );
};

export default PaymentPage;
