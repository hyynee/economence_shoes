import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartActionApi } from '../redux/cartReducer/cartReducer';
import { getAllProdActionApi } from '../redux/productReducer/productsReducer';

const useProducts = () => {
    const dispatch = useDispatch();
    const { arrProd } = useSelector(state => state.productsReducer);

    const [filterKey, setFilterKey] = useState('*');
    const [selectedFilter, setSelectedFilter] = useState('*');
    const [open, setOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        dispatch(getAllProdActionApi());
    }, [dispatch]);

    // Lọc sản phẩm theo tên
    const filteredProducts = useMemo(() => {
        return Array.isArray(arrProd)
            ? (filterKey === '*' ? arrProd : arrProd.filter(item => item.product_name.toLowerCase().includes(filterKey.toLowerCase())))
            : [];
    }, [arrProd, filterKey]);

    // Sắp xếp sản phẩm theo giá
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) =>
            sortOrder === 'asc' ? a.output_price - b.output_price :
                sortOrder === 'desc' ? b.output_price - a.output_price : 0
        );
    }, [filteredProducts, sortOrder]);

    const handleAddToCart = (product_id) => {
        dispatch(addProductToCartActionApi(product_id, 1));
    };

    return {
        sortedProducts,
        filterKey,
        selectedFilter,
        open,
        sortOrder,
        setFilterKey,
        setSelectedFilter,
        setOpen,
        setSortOrder,
        handleAddToCart
    };
};

export default useProducts;
