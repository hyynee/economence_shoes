import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';

const initialState = {
    totalPrice: [],
    bestSellingProducts: [],
    totalProfit: {},
}

const statisticalReducer = createSlice({
    name: "statisticalReducer",
    initialState,
    reducers: {
        getAllStaAction: (state, action) => {
            state.totalPrice = action.payload;
        },
        getBestSellingProductsAction: (state, action) => {
            state.bestSellingProducts = action.payload;
        },
        getTotalProfitAction: (state, action) => {
            state.totalProfit = action.payload;
        }
    }
});

export const { getAllStaAction, getBestSellingProductsAction, getTotalProfitAction } = statisticalReducer.actions

export default statisticalReducer.reducer

export const getAllStaActionAPI = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/statistical/getTotalDeliveredOrdersPrice`);
            const action = getAllStaAction(result.data);
            dispatch(action);
        }
        catch (error) {
            console.log(error);
        }
    }
}


export const getBestSellingProductsAPI = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/statistical/getBestSellingProducts`);
            dispatch(getBestSellingProductsAction(result.data));
        }
        catch (error) {
            console.log("Error fetching data:", error);
        }
    };
};


export const getTotalProfitActionApi = () => {
    return async (dispatch) => {
        try {
            const reslut = await http.get('/statistical/compare-revenue-cost');
            const action = getTotalProfitAction(reslut.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}