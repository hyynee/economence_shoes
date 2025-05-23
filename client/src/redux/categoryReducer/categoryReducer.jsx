import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';

const initialState = {
    categories: [],
}

const categoryReducer = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {
        getAllCategoriesAction: (state, action) => {
            state.categories = action.payload;
        },
    }
});

export const { getAllCategoriesAction } = categoryReducer.actions

export default categoryReducer.reducer

export const getAllCategoriesApi = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/category/get-all-category');
            const action = getAllCategoriesAction(result.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
};
