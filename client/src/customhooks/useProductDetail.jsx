import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCartActionApi } from '../redux/cartReducer/cartReducer';
import { http } from '../util/config';

const useProductDetail = (productId) => {
    const dispatch = useDispatch();
    const [prodDetail, setProdDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProdDetail = async () => {
            try {
                setLoading(true);
                const result = await http.get(`/products/getProductsById/${productId}`);
                if (result.data.length > 0) {
                    setProdDetail(result.data[0]);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };
        if (productId) {
            getProdDetail();
        }
    }, [productId]);
    // Xử lý thay đổi số lượng sản phẩm
    const handleChangeQuantity = (action) => {
        setQuantity(prev => {
            if (action === 'decrement' && prev > 1) return prev - 1;
            if (action === 'increment' && prev < prodDetail.quantity) return prev + 1;
            return prev;
        });
    };
    // Xử lý thêm vào giỏ hàng
    const handleAddtoCart = useCallback(() => {
        if (prodDetail.quantity === 0) {
            return;
        }
        dispatch(addProductToCartActionApi(prodDetail.product_id, quantity));
    }, [dispatch, prodDetail, quantity]);

    return { prodDetail, loading, error, quantity, handleChangeQuantity, handleAddtoCart };
};

export default useProductDetail;
