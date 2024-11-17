import { createSlice } from '@reduxjs/toolkit';

type CommonState = {
    cartItemsList: [],
};

const initialState: CommonState = {
    cartItemsList: [],
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setCartItemsList: (state, action) => {
            state.cartItemsList = action.payload;
        },
    },
});

export const { setCartItemsList } = commonSlice.actions;
export default commonSlice.reducer;
