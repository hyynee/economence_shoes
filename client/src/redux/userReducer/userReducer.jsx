import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { history } from '../..';
import { getStorageJSON, http, saveStorageJSON, USERLOGIN } from '../../util/config';

const initialStateUserLogin = () => {
    let userLoginInit = {
        email: '',
        token: '',
        role_id: '',
    }
    if (getStorageJSON(USERLOGIN)) {
        userLoginInit = getStorageJSON(USERLOGIN)
    }
    return userLoginInit;
}

const initialState = {
    userLogin: initialStateUserLogin(),
    userProfile: {},
    isForgotPasswordSuccess: false,
    arrUser: [],
    loading: false,
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        loginAction: (state, action) => {
            const userLogin = action.payload;
            state.userLogin = userLogin;
        },
        signUpAdminAction: (state, action) => {
            state.arrUser.push(action.payload);
        },
        changePasswordAction: (state, action) => {
            state.isForgotPasswordSuccess = action.payload;
        },
        forGotPasswordAction: (state, action) => {
            state.isForgotPasswordSuccess = action.payload;
        },
        getProfileAction: (state, action) => {
            const userProfile = action.payload;
            state.userProfile = userProfile;
        },
        AdminGetAllUserAction: (state, action) => {
            state.arrUser = action.payload;
        },
        AdminDeleteAccountAction: (state, action) => {
            state.arrUser = state.arrUser.filter(item => item.user_id !== action.payload);
        },
        AdminUpdateAccountAction: (state, action) => {
            const updatedAccount = action.payload;
            const index = state.arrUser.findIndex(item => item.user_id === updatedAccount.user_id);
            if (index !== -1) {
                state.arrUser[index] = updatedAccount;
            }
        }
    }
});

export const { setLoading, loginAction, getProfileAction, AdminGetAllUserAction, signUpAdminAction, AdminDeleteAccountAction, AdminUpdateAccountAction, changePasswordAction, forGotPasswordAction } = userReducer.actions

export default userReducer.reducer

export const loginActionApi = (userLogin) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await http.post('/auth/login', userLogin);
            if (result.data.status === 200) {
                const { token, email } = result.data;
                const { role_id } = jwtDecode(token).data;
                const userLoginData = { email, token, role_id };
                saveStorageJSON(USERLOGIN, userLoginData);
                dispatch(loginAction(userLoginData));
                history.push(role_id === '1' ? '/admin' : '/');
                toast.success("Login successful");
            } else {
                toast.error("Login failed");
            }
        } catch (err) {
            toast.error(err.response?.data.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    };
};
export const signUpActionApi = (userLogin) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await http.post('/auth/signup', userLogin);

            if (!result.data.success) {
                throw new Error(result.data.message);
            }
            dispatch(signUpAdminAction(result.data));
            toast.success("Register successful");
            return { success: true };
        } catch (err) {
            console.error("errsignup", err.message);
            toast.error(err.message || "Register failed");
            return { success: false, error: err.message };
        } finally {
            dispatch(setLoading(false));
        }
    };
};
export const getProfileActionApi = () => {
    return async (dispatch, getState) => {
        const token = getState().userReducer.userLogin.token
        try {
            const result = await http.get('/account/currentUser', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const action = getProfileAction(result.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }

}
export const changePasswordActionAPI = (data) => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try {
            const token = getState().userReducer.userLogin?.token;
            if (!token) throw new Error("Bạn chưa đăng nhập!");

            const result = await http.post(`/auth/changePassword`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(changePasswordAction(result.data));
            toast.success("Đổi mật khẩu thành công");
        } catch (err) {
            console.error("Lỗi API:", err.response?.status, err.response?.data);
            if (err.response?.status === 400) {
                throw new Error("Mật khẩu cũ không đúng!");
            }
            throw new Error("Có lỗi xảy ra, vui lòng thử lại!");
        }
        finally {
            dispatch(setLoading(false));
        }
    };
};
export const AdminGetAllUserActionAPI = () => {
    return async (dispatch) => {
        try {
            const result = await http.get('/account/getAllUser');
            const action = AdminGetAllUserAction(result.data);
            dispatch(action);
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}

export const AdminDeleteAccountActionAPI = (user_id) => {
    return async (dispatch) => {
        try {
            const result = await http.delete(`/account/deleteAccountByID/${user_id}`);
            const action = AdminDeleteAccountAction(user_id);
            dispatch(action);
            toast.success("Delete account successful");
        } catch (err) {
            console.log("err", err.response?.data.message)
            toast.error("Delete account failed");
        }
    }
}
export const AdminUpdateAccountActionAPI = (updatedAccount) => {
    return async (dispatch) => {
        try {
            const result = await http.put(`/account/updateUserByID/${updatedAccount.account_id}`, updatedAccount);
            const action = AdminUpdateAccountAction(result.data);
            dispatch(action);
            toast.success("Update account successful");
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}
export const ResetPasswordActionAPI = (token, newPassword) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await http.put('/auth/resetPassword', { token, newPassword });
            const action = changePasswordAction(result.data);
            dispatch(action);
            toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại!.");
            history.push("/login");
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
        finally {
            dispatch(setLoading(false));
        }
    }
}

export const forGotPasswordActionAPI = (email) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/auth/forgotPassword', email);
            const action = forGotPasswordAction(result.data);
            dispatch(action);
            toast.success("Vui lòng check email để đặt lại mật khẩu!");
        } catch (err) {
            console.log("err", err.response?.data.message)
        }
    }
}

export const searchUserByNameActionAPI = (nameUser) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/account/getUserByName/${nameUser}`);
            dispatch(AdminGetAllUserAction(result.data));
        } catch (err) {
            console.log("err", err.response?.data.message);
        }
    }
}