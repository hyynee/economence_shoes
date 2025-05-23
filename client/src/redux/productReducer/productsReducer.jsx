import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { http } from '../../util/config';

const initialState = {
    arrProd: [],
    loading: false,
}

const productsReducer = createSlice({
    name: 'productsReducer',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        getAllProdAction: (state, action) => {
            state.arrProd = action.payload;
        },
        AdminAddProdAction: (state, action) => {
            state.arrProd.push(action.payload);
        },
        AdminDeleteProdAction: (state, action) => {
            state.arrProd = state.arrProd.filter(item => item.product_id !== action.payload);
        },
        AdminUpdateProdAction: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.arrProd.findIndex(item => item.product_id === updatedProduct.product_id);
            if (index !== -1) {
                state.arrProd[index] = updatedProduct;
            }
        }
    }
});

export const { setLoading, getAllProdAction, AdminAddProdAction, AdminDeleteProdAction, AdminUpdateProdAction } = productsReducer.actions
export default productsReducer.reducer

export const getAllProdActionApi = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/products/getAllProducts');
            const action = getAllProdAction(result.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}
export const AdminAddProdActionApi = (newProduct) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await http.post('/products/themSanPham', newProduct);
            const action = AdminAddProdAction(result.data);
            dispatch(action);
            return result.data;
        } catch (err) {
            console.log("err", err.response?.data.message);
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
export const AdminDeleteProdActionApi = (productId) => {
    return async (dispatch) => {
        try {
            const result = await http.delete(`/products/deleteProduct/${productId}`);
            const action = AdminDeleteProdAction(productId);
            dispatch(action);
            toast.success(result.data.message);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}

export const AdminUpdateProdActionApi = (updatedProduct) => {
    return async (dispatch) => {
        try {
            const result = await http.put(`/products/updateProductById/${updatedProduct.product_id}`, updatedProduct);
            const action = AdminUpdateProdAction(result.data);
            dispatch(action);
            toast.success("Cập nhật sản phẩm thành công!");
        } catch (err) {
            console.log("err", err.response?.data.message);
            toast.error("Cập nhật sản phẩm thất bại!");
        }
    }
}

export const searchProductActionAPI = (nameProd) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/products/getProductsByName/${nameProd}`);
            console.log("result", result.data);
            dispatch(getAllProdAction(result.data));
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}

