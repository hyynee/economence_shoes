import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

const initialState = {
    cartItems: [],
    Items: [],
    paymentUrl: null, // URL checkout trả về từ Stripe
    paymentStatus: null, // Trạng thái thanh toán
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        addToCartAction: (state, action) => {
            state.cartItems.push(action.payload);
        },
        getItemsAction: (state, action) => {
            state.Items = action.payload;
        },
        removeItemsAction: (state, action) => {
            state.Items = state.Items.filter(item => item.product_id !== action.payload);
        },
        changeQuantityAction: (state, action) => {
            const { product_id, quantity, total_price } = action.payload;
            const productIndex = state.Items.findIndex(item => item.product_id === product_id);
            if (productIndex !== -1) {
                state.Items[productIndex].quantity = quantity;
                state.Items[productIndex].total_price = total_price;
            }
        },
        setPaymentUrl: (state, action) => {
            state.paymentUrl = action.payload;
        },
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
    }
});

export const { addToCartAction, getItemsAction, removeItemsAction, changeQuantityAction, setPaymentUrl, setPaymentStatus } = cartReducer.actions

export default cartReducer.reducer

export const getItemsActionApi = () => {
    return async (dispatch, getState) => {
        try {
            const { userLogin } = getState().userReducer;
            const token = userLogin?.token;
            if (!token) {
                toast.error("Please log in to see items in the cart.");
                return;
            }
            const reslut = await axios.get('http://localhost:8080/cart/getAllItemsCart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const action = getItemsAction(reslut.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}

// Async action to add a product to the cart
export const addProductToCartActionApi = (productId, quantity = 1) => {
    return async (dispatch, getState) => {
        try {
            const { userLogin } = getState().userReducer;
            const token = userLogin?.token;
            if (!token) {
                toast.error("Please log in to add items to the cart.");
                return;
            }
            const response = await axios.post('http://localhost:8080/cart/addProductToCart', { product_id: productId, quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 201) {
                const action = addToCartAction(response.data);
                dispatch(action);
                toast.success('Product added to cart!');
            }
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data.message);
            toast.error("Please Login First");
        }
    };
};

// Async action to remove a product from the cart
export const removeProductFromCartActionApi = (productId) => {
    return async (dispatch, getState) => {
        try {
            const { userLogin } = getState().userReducer;
            const token = userLogin?.token;
            if (!token) {
                toast.error("Please log in to remove items from the cart.");
                return;
            }
            const response = await axios.delete(`http://localhost:8080/cart/delProductToCart`, {
                data: { product_id: productId },
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("res", response)
            if (response.status === 201) {
                const action = removeItemsAction(productId);
                dispatch(action);
                toast.warning("Item removed from cart!");
            }
        } catch (error) {
            console.error("Error removing from cart:", error.response?.data.message);
            toast.error("Failed to remove item from cart.");
        }
    };
};
// Async action to clear all products from the cart
export const clearCartActionApi = () => {
    return async (dispatch, getState) => {
        try {
            const { userLogin } = getState().userReducer;
            const token = userLogin?.token;
            if (!token) {
                toast.error("Please log in to clear items from the cart.");
                return;
            }
            const response = await axios.delete('http://localhost:8080/cart/clearItemsFromCart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 201) {
                dispatch(getItemsAction([]));
                toast.success("All items removed from cart!");
            }
        } catch (error) {
            console.error("Error clearing cart:", error.response?.data.message);
            toast.error("Failed to clear items from cart.");
        }
    };
};

export const changeQuantityActionApi = (productId, action) => {
    return async (dispatch, getState) => {
        try {
            const { userLogin } = getState().userReducer;
            const token = userLogin?.token;
            if (!token) {
                toast.error("Please log in to modify item quantity.");
                return;
            }
            const response = await axios.post('http://localhost:8080/cart/changeQuantity', {
                product_id: productId,
                action
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                const action = changeQuantityAction(response.data.data);
                dispatch(action);
            }
        } catch (error) {
            console.error("Error changing quantity:", error.response?.data.message);
            toast.error("Failed to update quantity.");
        }
    };
};

export const createCheckoutSessionActionApi = (cartItems) => {
    return async (dispatch, getState) => {
        try {
            const { userLogin } = getState().userReducer;
            const token = userLogin?.token;
            console.log("tokenpayment", token)
            if (!token) {
                toast.error("Please log in to proceed with payment.");
                return;
            }
            // Gọi API tạo session thanh toán
            const response = await axios.post('http://localhost:8080/payments/create-checkout-session', cartItems, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("cartcehck", cartItems)
            console.log("Response from backend:", response);
            if (response.status === 201) {
                const paymentUrl = response.data.url;
                console.log("Payment URL:", paymentUrl);
                dispatch(setPaymentUrl(paymentUrl));
                toast.success("Redirecting to payment gateway...");
                history.push(paymentUrl); // Chuyển hướng đến trang thanh toán Stripe paymentUrl;
            }
        } catch (error) {
            console.error("Error creating payment session:", error.response?.data.message);
            toast.error("Failed to initiate payment.");
        }
    };
};


