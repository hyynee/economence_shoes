import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addCommentByProductIdActionApi, getCommentByProductIdActionApi } from '../../redux/reviewsReducer/reviewsReducer';

const Reviews = ({ productId, userId = 123 }) => {
    const dispatch = useDispatch();
    const { CommentByProductId } = useSelector((state) => state.reviewsReducer);
    useEffect(() => {
        dispatch(getCommentByProductIdActionApi(productId));
    }, [dispatch, productId]);

    const handleSubmitReview = async (values) => {
        const payload = {
            product_id: productId,
            user_id: userId,
            rating: values.rating,
            comment: values.comment,
            date: new Date().toISOString(),
        };
        await dispatch(addCommentByProductIdActionApi(productId, payload));
    }

    const formik = useFormik({
        initialValues: {
            comment: '',
            rating: 0,
        },
        validationSchema: Yup.object({
            comment: Yup.string()
                .required('Comment is required')
                .min(5, 'Comment must be at least 5 characters'),
            rating: Yup.number()
                .required('Rating is required')
                .min(1, 'Minimum rating is 1')
                .max(5, 'Maximum rating is 5'),
        }),
        onSubmit: async (values, { resetForm }) => {
            await handleSubmitReview(values);
            resetForm();
        },
    });

    const filteredReviews = CommentByProductId.filter((review) => review.product_id === productId);

    return (
        <div className="space-y-6">
            {/* Add Review Form */}
            <form onSubmit={formik.handleSubmit} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Add Your Review</h3>
                <textarea
                    name="comment"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    rows="3"
                    placeholder="Write your comment here..."
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.comment && formik.errors.comment && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.comment}</div>
                )}
                <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 mr-2">Rate:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`text-lg ${formik.values.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => formik.setFieldValue('rating', star)}
                        >
                            ★
                        </button>
                    ))}
                </div>
                {formik.touched.rating && formik.errors.rating && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.rating}</div>
                )}
                <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                    Submit Review
                </button>
            </form>

            {/* Display Reviews */}
            {filteredReviews.map((review) => (
                <div key={review.review_id} className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-base text-gray-800">{review?.account?.full_name}</h4>
                        <span className="text-xs text-gray-500">{new Date(review?.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="text-yellow-500 text-sm">
                            {'★'.repeat(review?.rating)}
                        </span>
                        <span className="text-gray-300 text-sm">
                            {'★'.repeat(5 - review?.rating)}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{review?.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
