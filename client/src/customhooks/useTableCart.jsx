import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeQuantityActionApi, clearCartActionApi, createCheckoutSessionActionApi, getItemsActionApi,
    removeProductFromCartActionApi
} from '../redux/cartReducer/cartReducer';

const useTableCart = () => {
    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.userReducer);
    const cart = useSelector(state => state.cartReducer);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

    useEffect(() => {
        if (!userLogin?.token) return;
        dispatch(getItemsActionApi());
    }, [userLogin?.token, dispatch]);

    const handleChangeQuantity = useCallback(async (productId, action) => {
        if (action === 'decrement') {
            const item = cart.Items.find(item => item.product_id === productId);
            if (item && item.quantity === 1) {
                setSelectedProductId(productId);
                setIsModalOpen(true);
                return;
            }
        }
        try {
            await dispatch(changeQuantityActionApi(productId, action));
        } catch (err) {
            console.error('Error changing quantity:', err);
        }
    }, [cart.Items, dispatch]);

    const handleConfirmRemove = useCallback(async () => {
        if (selectedProductId) {
            try {
                await dispatch(removeProductFromCartActionApi(selectedProductId));
            } catch (error) {
                console.error("Error removing product:", error);
            }
            setIsModalOpen(false);
            setSelectedProductId(null);
        }
    }, [selectedProductId, dispatch]);

    const handleClearCart = () => setIsClearCartModalOpen(true);

    const handleConfirmClearCart = useCallback(async () => {
        try {
            await dispatch(clearCartActionApi());
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
        setIsClearCartModalOpen(false);
    }, [dispatch]);


    const makePayment = async (cartItems) => {
        dispatch(createCheckoutSessionActionApi(cartItems));
    };
    const subtotal = useMemo(() => {
        return cart.Items.reduce((total, item) => total + item.product.output_price * item.quantity, 0);
    }, [cart.Items]);

    return {
        cart,
        isModalOpen,
        isClearCartModalOpen,
        setIsModalOpen,
        setIsClearCartModalOpen,
        setSelectedProductId,
        handleChangeQuantity,
        handleConfirmRemove,
        handleClearCart,
        handleConfirmClearCart,
        makePayment,
        subtotal
    };
};

export default useTableCart;
