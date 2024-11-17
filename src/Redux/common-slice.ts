import { createSlice } from '@reduxjs/toolkit';

type CommonState = {
    cartItemsList: [],
    cartItemsCount: number,
};

const initialState: CommonState = {
    cartItemsList: [],
    cartItemsCount: 10,
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setCartItemsList: (state, action) => {
            state.cartItemsList = action.payload;
        },
        setCartItemsCount: (state, action) => {
            state.cartItemsCount = action.payload;
        },
    },
});

export const { setCartItemsList, setCartItemsCount } = commonSlice.actions;
export default commonSlice.reducer;
