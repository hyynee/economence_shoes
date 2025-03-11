import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { http } from '../../util/config';

const initialState = {
    arrSupplier: [],

}

const supplierReducer = createSlice({
    name: "supplierReducer",
    initialState,
    reducers: {
        getAllSupplierAction: (state, action) => {
            state.arrSupplier = action.payload;
        },
        addSupplierAction: (state, action) => {
            state.arrSupplier.push(action.payload);
        },
        deleteSupplierAction: (state, action) => {
            state.arrSupplier = state.arrSupplier.filter(item => item.supplier_id !== action.payload);
        },
        updateSupplierAction: (state, action) => {
            const updatedSupplier = action.payload;
            const index = state.arrSupplier.findIndex(item => item.supplier_id === updatedSupplier.supplier_id);
            if (index !== -1) {
                state.arrSupplier[index] = updatedSupplier;
            }
        }
    }
});

export const { getAllSupplierAction, addSupplierAction, deleteSupplierAction, updateSupplierAction } = supplierReducer.actions

export default supplierReducer.reducer


export const getAllSupplierActionAPI = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/supplier/getAllSupplier');
            const action = getAllSupplierAction(result.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}

export const addSupplierActionAPI = (data) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/supplier/createSupplier', data);
            const action = addSupplierAction(result.data);
            dispatch(action);
            toast.success(result.data.message);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}

export const deleteSupplierActionAPI = (supplier_id) => {
    return async (dispatch) => {
        try {
            const result = await http.delete(`/supplier/deleteSupplier/${supplier_id}`);
            const action = deleteSupplierAction(supplier_id);
            dispatch(action);
            toast.success(result.data.message);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}


export const updateSupplierActionAPI = (data) => {
    return async (dispatch) => {
        try {
            const result = await http.put(`/supplier/updateSupplier/${data.supplier_id}`, data);
            const action = updateSupplierAction(result.data);
            dispatch(action);
            toast.success("Update supplier successful");
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}