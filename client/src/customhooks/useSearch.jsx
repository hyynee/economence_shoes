import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProdActionApi } from "../redux/productReducer/productsReducer";

const useSearch = (searchApi) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearch();
            } else {
                dispatch(getAllProdActionApi());
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);


    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await dispatch(searchApi(searchTerm));
            setSearchResults(response || []);
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        searchResults,
        loading,
    };
};

export default useSearch;
