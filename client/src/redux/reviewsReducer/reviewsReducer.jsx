import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';

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
    return async (dispatch) => {
        try {
            const response = await http.get(`/reviews/getAllCommentByProductId/${product_id}`);
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
    return async (dispatch) => {
        try {
            const response = await http.post(`/reviews/createComment/${product_id}`, payload);
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