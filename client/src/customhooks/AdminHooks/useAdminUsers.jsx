import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AdminGetAllUserActionAPI,
    searchUserByNameActionAPI,
    signUpActionApi
} from "../../redux/userReducer/userReducer";
import useSearch from "../useSearch";

const useAdminUsers = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.userReducer.arrUser);
    const { searchTerm, setSearchTerm, searchResults, loading } = useSearch(searchUserByNameActionAPI);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllUsers = () => {
        if (allUsers.length === 0) {
            dispatch(AdminGetAllUserActionAPI());
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            getAllUsers();
        }
    }, [searchTerm]);

    const handleAddAccount = async (account) => {
        await dispatch(signUpActionApi(account));
        getAllUsers();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const userData = (searchResults.length > 0 ? searchResults : allUsers).map(user => ({
        ...user,
        role_id: user.role_id === "1" ? "Admin" : "User",
    }));

    return {
        userData,
        searchTerm,
        setSearchTerm,
        loading,
        handleAddAccount,
        isModalOpen,
        openModal,
        closeModal,
    };
};

export default useAdminUsers;
