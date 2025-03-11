import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';

const initialState = {
    arrGoodsreceipt: [],
}

const goodReducer = createSlice({
    name: 'goodReducer',
    initialState,
    reducers: {
        getAllGoodsreceiptAction: (state, action) => {
            state.arrGoodsreceipt = action.payload
        },
        AddGoodsreceiptAction: (state, action) => {
            state.arrGoodsreceipt.push(action.payload)
        }
    }
});

export const { getAllGoodsreceiptAction, AddGoodsreceiptAction } = goodReducer.actions

export default goodReducer.reducer

export const getAllGoodsreceiptActionAPI = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/goodsreceipt/getAllGoodsreceipt');
            console.log("result", result.data);
            const action = getAllGoodsreceiptAction(result.data)
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}

export const addGoodsReceiptActionAPI = (data) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/goodsreceipt/createGoodsreceipt', data);
            console.log("result", result);
            console.log("result", result.data);
            const action = AddGoodsreceiptAction(result.data)
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}