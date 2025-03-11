import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItemsActionApi } from '../redux/cartReducer/cartReducer';
import { getAllProdActionApi, searchProductActionAPI } from '../redux/productReducer/productsReducer';
import { loginAction } from '../redux/userReducer/userReducer';
import { clearStorageJSON, USERLOGIN } from '../util/config';

const useNavbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLogin } = useSelector(state => state.userReducer);
    const cart = useSelector(state => state.cartReducer);
    const isAdmin = userLogin.role_id === "1";
    const [searchProd, setSearchProd] = useState("");

    useEffect(() => {
        if (userLogin.token) {
            dispatch(getItemsActionApi());
        }
    }, [userLogin?.token, cart?.cartItems?.length, dispatch]);

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
        clearStorageJSON(USERLOGIN);
        dispatch(loginAction({}));
        navigate("/");
    };

    return {
        location,
        cart,
        userLogin,
        isAdmin,
        searchProd,
        setSearchProd,
        handleLogout
    };
};

export default useNavbar;
