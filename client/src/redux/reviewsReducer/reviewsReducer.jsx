import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    CommentByProductId: [],
}

const reviewsReducer = createSlice({
    name: 'reviewsReducer',
    initialState,
    reducers: {
        getCommentByProductId: (state, action) => {
            state.CommentByProductId = action.payload;
        },
        addCommentByProductId: (state, action) => {
            state.CommentByProductId.push(action.payload);
        },
    }
});

export const { getCommentByProductId, addCommentByProductId } = reviewsReducer.actions

export default reviewsReducer.reducer

export const getCommentByProductIdActionApi = (product_id) => {
    return async (dispatch, getState) => {
        try {
            const { activeSession } = getState().userReducer;
            const token = activeSession?.token;
            if (!token) {
                toast.error("Please log in first.");
                return;
            }
            const response = await axios.get(`http://localhost:8080/reviews/getAllCommentByProductId/${product_id}`);
            const action = getCommentByProductId(response.data);
            if (response.status === 200) {
                dispatch(action);
            } else {
                console.error('Error fetching comments:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
}

export const addCommentByProductIdActionApi = (product_id, payload) => {
    return async (dispatch, getState) => {
        try {
            const { activeSession } = getState().userReducer;
            const token = activeSession?.token;
            if (!token) {
                toast.error("Please log in first.");
                return;
            }
            const response = await axios.post(`http://localhost:8080/reviews/createComment/${product_id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response:', response);
            const action = addCommentByProductId(response.data);
            console.log('Action:', action);
            if (response.status === 201) {
                dispatch(action);
            } else {
                console.error('Error adding comment:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
}