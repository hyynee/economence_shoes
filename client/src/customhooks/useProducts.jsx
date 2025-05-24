import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartActionApi } from '../redux/cartReducer/cartReducer';
import { getAllProdActionApi } from '../redux/productReducer/productsReducer';

const useProducts = () => {
    const dispatch = useDispatch();
    const { arrProd } = useSelector(state => state.productsReducer);

    const [filterKey, setFilterKey] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('*');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(99999);
    const [sortOrder, setSortOrder] = useState('');
    const [bestSellers, setBestSellers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllProdActionApi());
    }, [dispatch]);
    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products/best-sellers');
                setBestSellers(response.data);
            } catch (error) {
                console.error('Error fetching best sellers:', error);
            }
        };
        fetchBestSellers();
    }, []);
    const brandsList = ["Nike", "Converse", "Van", "Adidas", "Jodan"];

    // Lọc nâng cao
    const filteredProducts = useMemo(() => {
        if (!Array.isArray(arrProd)) return [];
        return arrProd.filter(item => {
            const matchesName = filterKey === '' || filterKey === '*' || item.product_name.toLowerCase().includes(filterKey.toLowerCase());
            const matchesBrand = selectedBrands.length === 0 ||
                selectedBrands.some(brand => item.product_name.toLowerCase().includes(brand.toLowerCase()));
            const matchesPrice = item.output_price >= minPrice && item.output_price <= maxPrice;
            return matchesName && matchesBrand && matchesPrice;
        });
    }, [arrProd, filterKey, selectedBrands, minPrice, maxPrice]);

    // Sắp xếp
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) =>
            sortOrder === 'asc' ? a.output_price - b.output_price :
                sortOrder === 'desc' ? b.output_price - a.output_price : 0
        );
    }, [filteredProducts, sortOrder]);

    const handleAddToCart = (product_id) => {
        dispatch(addProductToCartActionApi(product_id, 1));
    };
    const resetFilters = () => {
        setFilterKey("");
        setSelectedBrands([]);
        setMinPrice(0);
        setMaxPrice(99999);
        setSortOrder("");
    };
    return {
        sortedProducts,
        filterKey,
        selectedBrands,
        minPrice,
        maxPrice,
        sortOrder,
        selectedFilter,
        setSelectedFilter,
        open,
        resetFilters,
        bestSellers,
        brandsList,
        setFilterKey,
        setSelectedBrands,
        setMinPrice,
        setMaxPrice,
        setSortOrder,
        setOpen,
        handleAddToCart
    };
};

export default useProducts;
