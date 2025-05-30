import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordActionAPI, getProfileActionApi } from "../redux/userReducer/userReducer";

const roleMap = {
    1: "Admin",
    2: "Khách hàng",
};

const useProfile = () => {
    const dispatch = useDispatch();
    const { userProfile, loading } = useSelector(state => state.userReducer);
    const { full_name, email, role_id } = userProfile?.data || {};
    const [isOpen, setIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(getProfileActionApi());
    }, [dispatch]);

    const validatePassword = useCallback(() => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            return "Vui lòng nhập đầy đủ thông tin!";
        }
        if (newPassword !== confirmPassword) {
            return "Mật khẩu xác nhận không khớp!";
        }
        return "";
    }, [oldPassword, newPassword, confirmPassword]);

    // ChangePassword
    const handleChangePassword = useCallback(async () => {
        const error = validatePassword();
        if (error) {
            setErrorMessage(error);
            return;
        }
        try {
            const result = await dispatch(changePasswordActionAPI({ oldPassword, newPassword }));
            if (result?.success) {
                resetValue();
            }
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error);
            setErrorMessage(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    }, [dispatch, oldPassword, newPassword, validatePassword]);

    // Reset form
    const resetValue = useCallback(() => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
        setIsOpen(false);
    }, []);

    return {
        full_name,
        email,
        role: roleMap[role_id],
        loading,
        isOpen,
        setIsOpen,
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        errorMessage,
        handleChangePassword,
    };
};

export default useProfile;
