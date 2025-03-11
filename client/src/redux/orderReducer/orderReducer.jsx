import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getStorageJSON, http } from '../../util/config';
const initialState = {
    arrOrder: [],
}

const orderReducer = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        getAllOrderAction: (state, action) => {
            state.arrOrder = action.payload;
        },
        updateOrderAction: (state, action) => {
            state.arrOrder = state.arrOrder.map(item => {
                if (item.order_id === action.payload.order_id) {
                    return action.payload;
                }
                return item;
            });
        },
        getOrderUser: (state, action) => {
            state.arrOrder = action.payload;
        },
    }
});

export const { getAllOrderAction, updateOrderAction, getOrderUser, getTotalProfitAction } = orderReducer.actions

export default orderReducer.reducer

export const getAllOrderActionApi = () => {
    return async (dispatch) => {
        try {
            const reslut = await http.get('/order/getAllOrder');
            const action = getAllOrderAction(reslut.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}

export const updateOrderStatusApi = (id, newStatus) => {
    return async (dispatch) => {
        try {
            console.log(`Updating order ID: ${id} to status: ${newStatus}`);
            const result = await http.put(`/order/updateOrder/${id}`, { delivery_status: newStatus });
            const action = updateOrderAction(result.data);
            dispatch(action);
            toast.success("Update order successful");
        } catch (err) {
            console.error("Error updating order status:", err.response?.data.message);
            toast.error("Failed to update order");
        }
    };
};

export const getOrderUserApi = () => {
    return async (dispatch) => {
        const token = getStorageJSON('token');
        if (!token) {
            toast.error("Please log in to see items of orders.");
            return;
        }
        try {
            const reslut = await http.get(`/order/getOrderWithUser`);
            const action = getOrderUser(reslut.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}

