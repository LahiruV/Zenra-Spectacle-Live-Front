import { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardList from '../../Components/CardList';
import axios from 'axios';
import configs from '../../config.js';
import Footer from '../../Components/Footer/Footer.jsx';

const defaultTheme = createTheme();
const productsCategory = ['All Universities', 'Sunglasses', 'Classic Spectacles'];

export default function Products() {
    const [selectedUni, setSelectedUni] = useState('All Universities');
    const [post, setPost] = useState([]);
    const token = sessionStorage.getItem('token');

    const handleChange = (event) => {
        setSelectedUni(event.target.value);
    };
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${configs.apiUrl}/properties/properties`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const postWithId = response.data.map((post, index) => ({
                id: index + 1,
                ...post
            }));

            setPost(postWithId);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    useEffect(() => {
        fetchDetails();
        localStorage.setItem('bookingProperty', null);
    }, []);

    const filteredAccommodations = selectedUni === 'All Universities'
        ? post
        : post.filter(post => post.area === selectedUni);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <br />
            <br />
            <br />
            <Container>
                <FormControl variant="filled" margin="normal" sx={{ backgroundColor: 'white', width: '180px', fontSize: '13px', borderRadius: '5px' }}>
                    <InputLabel>Category Area</InputLabel>
                    <Select
                        value={selectedUni}
                        onChange={handleChange}
                        label="University Area"
                        sx={{ fontSize: '13px' }}
                    >
                        {productsCategory.map(item => (
                            <MenuItem key={item} value={item} sx={{ fontSize: '13px' }}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <CardList props={filteredAccommodations} />
            </Container>
            <br />
            <br />
            <br />
            <Footer />
        </ThemeProvider>
    );
}
