import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdminAddProdActionApi, AdminDeleteProdActionApi, AdminUpdateProdActionApi, getAllProdActionApi, searchProductActionAPI } from "../../redux/productReducer/productsReducer";
import useSearch from "../useSearch";

const useAdminProducts = () => {
    const dispatch = useDispatch();
    const { arrProd } = useSelector(state => state.productsReducer);
    // Search logic
    const { searchTerm, setSearchTerm, searchResults, loading } = useSearch(searchProductActionAPI);

    // Fetch all products
    useEffect(() => {
        dispatch(getAllProdActionApi());
    }, [dispatch]);

    // Add product
    const addProduct = (newProduct) => {
        dispatch(AdminAddProdActionApi(newProduct));
    };

    // Delete product
    const deleteProduct = (productId) => {
        return dispatch(AdminDeleteProdActionApi(productId)).then(() => {
            dispatch(getAllProdActionApi());
        });
    };

    // Update product
    const updateProduct = async (updatedProduct) => {
        await dispatch(AdminUpdateProdActionApi(updatedProduct));
        dispatch(getAllProdActionApi());
    };

    return {
        arrProd,
        searchTerm,
        setSearchTerm,
        loading,
        addProduct,
        deleteProduct,
        updateProduct,
    };
};

export default useAdminProducts;
