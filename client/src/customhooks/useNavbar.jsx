import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItemsActionApi } from '../redux/cartReducer/cartReducer';
import { getAllProdActionApi, searchProductActionAPI } from '../redux/productReducer/productsReducer';
import { clearSessions } from '../redux/userReducer/userReducer';
import { sessionStorageUtils } from '../util/config';

const useNavbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { activeSession } = useSelector(state => state.userReducer);
    const cart = useSelector(state => state.cartReducer);
    const isAdmin = activeSession?.role_id === "1";
    const [searchProd, setSearchProd] = useState("");

    useEffect(() => {
        if (activeSession?.token && activeSession?.role_id !== "1") {
            dispatch(getItemsActionApi());
        }
    }, [activeSession?.token, activeSession?.role_id, cart?.cartItems?.length, dispatch]);

    const handleSearch = useCallback(debounce((value) => {
        if (value.trim() !== "") {
            dispatch(searchProductActionAPI(value));
        } else {
            dispatch(getAllProdActionApi());
        }
    }, 500));
    useEffect(() => {
        handleSearch(searchProd);
    }, [searchProd]);

    const handleLogout = () => {
        sessionStorageUtils.clearAllSessions();
        dispatch(clearSessions());
        navigate("/");
    };

    return {
        location,
        cart,
        userLogin: activeSession,
        isAdmin,
        searchProd,
        setSearchProd,
        handleLogout
    };
};

export default useNavbar;
