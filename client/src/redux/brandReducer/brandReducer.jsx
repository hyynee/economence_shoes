import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';

const initialState = {
    arrBrand: [],
}

const brandReducer = createSlice({
    name: "brandReducer",
    initialState,
    reducers: {
        getAllBrandAction: (state, action) => {
            state.arrBrand = action.payload;
        },
    }
});

export const { getAllBrandAction } = brandReducer.actions

export default brandReducer.reducer

export const getAllBrandActionAPI = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/brand/get-all-brand');
            const action = getAllBrandAction(result.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
};