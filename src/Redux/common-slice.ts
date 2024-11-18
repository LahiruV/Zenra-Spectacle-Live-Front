import { createSlice } from '@reduxjs/toolkit';

type CommonState = {
    cartItemsList: [],
    userMail: string,
    orderContent: {},
};

const initialState: CommonState = {
    cartItemsList: [],
    userMail: '',
    orderContent: {},
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setCartItemsList: (state, action) => {
            state.cartItemsList = action.payload;
        },
        setUserMail: (state, action) => {
            state.userMail = action.payload;
        },
        setOrderContent: (state, action) => {
            state.orderContent = action.payload;
        },
    },
});

export const { setCartItemsList, setUserMail, setOrderContent } = commonSlice.actions;
export default commonSlice.reducer;
