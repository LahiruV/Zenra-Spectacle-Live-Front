import { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CardList from '../../Components/CardList';
import Footer from '../../Components/Footer/Footer.jsx';

const defaultTheme = createTheme();
const productsCategory = ['All', 'Unisex', 'Men', 'Women'];
const dataList = [
    {
        name: 'Arnette AN4321 278677',
        price: '33,500',
        description: 'The Arnette AN4321_278677 sunglasses feature a medium-sized design in red.These sunglasses are tailored for men. They are not prescription-compatible and do not belong to a new collection.',
        picture: 'https://shop.visioncare.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/n/an4321-removebg-preview_1.png',
        gender: 'Men'
    },
    {
        name: 'Coach HC7134 93318Z',
        price: '57,000',
        description: 'The Coach HC7134_93318Z sunglasses offer a medium-sized, full-frame design in brown. Made from metal, these stylish sunglasses are tailored for women. They are not prescription-compatible and not part of a new collection.',
        picture: 'https://shop.visioncare.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/u/n/untitled_design_30_.png',
        gender: 'Women'
    },
    {
        name: 'Polarized PL584 C4',
        price: '5,000',
        description: 'The Polarized PL584_C4 sunglasses feature a medium-sized, full-frame design in grey. Made from plastic, these unisex sunglasses provide stylish, durable wear. Not prescription-compatible or from a new collection.',
        picture: 'https://shop.visioncare.lk/media/catalog/product/cache/1/small_image/9df78eab33525d08d6e5fb8d27136e95/u/n/untitled_design_58_.png',
        gender: 'Unisex'
    },
    {
        name: 'Polarsun PL-5594P C4 G2',
        price: '7,000',
        description: 'The Polarsun PL-5594P C4/G2 sunglasses offer a medium-sized, full-frame design in red. Made from plastic, these stylish sunglasses are tailored for women. They are not prescription-compatible.',
        picture: 'https://shop.visioncare.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/_/a_5_1.jpg',
        gender: 'Women'

    },
    {
        name: 'Prada 09VS Pro',
        price: '51,000',
        description: 'The Prada 09VS sunglasses feature a medium-sized, full-frame design made from acetate. Tailored for women, these sunglasses offer luxury and style. They are not prescription-compatible.',
        picture: 'https://shop.visioncare.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_0255.jpg',
        gender: 'Women'

    },
    {
        name: 'RayBan RB3025 002 48',
        price: '97,000',
        description: 'The Ray-Ban RB3025_002_48 sunglasses feature a medium-sized design in black, crafted from metal. Designed for men, they combine classic style with durability.',
        picture: 'https://shop.visioncare.lk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/b/rb3025.png',
        gender: 'Men'

    },
];

export default function Products() {
    const [selectedUni, setSelectedUni] = useState('All');

    const handleChange = (event) => {
        setSelectedUni(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem('bookingProperty', null);
    }, []);

    const filteredAccommodations = selectedUni === 'All'
        ? dataList
        : dataList.filter(data => data.gender === selectedUni);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <br />
            <br />
            <br />
            <Container>
                <FormControl variant="filled" margin="normal" sx={{ backgroundColor: 'white', width: '180px', fontSize: '13px', borderRadius: '5px' }}>
                    <InputLabel>Category By Gender</InputLabel>
                    <Select
                        value={selectedUni}
                        onChange={handleChange}
                        label="Category By Gender"
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
