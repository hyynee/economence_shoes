import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ResetPasswordActionAPI } from "../redux/userReducer/userReducer";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const loading = useSelector(state => state.userReducer.loading);


    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("Mật khẩu xác nhận không khớp!");
            return;
        }
        dispatch(ResetPasswordActionAPI(token, newPassword));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold text-gray-900">Đặt lại mật khẩu</h2>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                    <input
                        type="password"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                    <input
                        type="password"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Xác nhận"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
