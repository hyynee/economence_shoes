import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProdActionApi } from "../../redux/productReducer/productsReducer";
import { getAllSupplierActionAPI } from "../../redux/supplierReducer/supplierReducer";
import { getProfileActionApi } from "../../redux/userReducer/userReducer";

const useAdminAddGoods = () => {
    const dispatch = useDispatch();

    // Lấy danh sách từ Redux
    const { arrSupplier } = useSelector(state => state.supplierReducer);
    const { userProfile } = useSelector(state => state.userReducer);
    const { arrProd } = useSelector(state => state.productsReducer);

    useEffect(() => {
        dispatch(getAllProdActionApi());
        dispatch(getAllSupplierActionAPI());
        dispatch(getProfileActionApi());
    }, [dispatch]);

    return {
        arrSupplier,
        userProfile,
        arrProd,
    };
};

export default useAdminAddGoods;
