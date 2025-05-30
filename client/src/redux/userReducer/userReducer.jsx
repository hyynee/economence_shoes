import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { history } from '../..';
import { http, sessionStorageUtils } from '../../util/config';

const initialState = {
    activeSession: sessionStorageUtils.getActiveSession() || null,
    allSessions: sessionStorageUtils.getAllSessions() || [],
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
        setActiveSession: (state, action) => {
            state.activeSession = action.payload;
        },
        setAllSessions: (state, action) => {
            state.allSessions = action.payload;
        },
        addSession: (state, action) => {
            state.allSessions.push(action.payload);
            state.activeSession = action.payload;
        },
        removeSession: (state, action) => {
            state.allSessions = state.allSessions.filter(session => session.id !== action.payload);
            if (state.activeSession?.id === action.payload) {
                state.activeSession = state.allSessions[0] || null;
            }
        },
        switchSession: (state, action) => {
            const session = state.allSessions.find(s => s.id === action.payload);
            if (session) {
                state.activeSession = session;
            }
        },
        clearSessions: (state) => {
            state.activeSession = null;
            state.allSessions = [];
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
            state.userProfile = action.payload;
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

export const {
    setLoading,
    setActiveSession,
    setAllSessions,
    addSession,
    removeSession,
    switchSession,
    clearSessions,
    signUpAdminAction,
    changePasswordAction,
    forGotPasswordAction,
    getProfileAction,
    AdminGetAllUserAction,
    AdminDeleteAccountAction,
    AdminUpdateAccountAction
} = userReducer.actions;

export default userReducer.reducer;

export const loginActionApi = (loginInfo) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await http.post('/auth/login', loginInfo);
            if (result.data.status === 200) {
                const { token, email } = result.data;
                const { role_id } = jwtDecode(token).data;
                const sessionData = {
                    token,
                    email,
                    role_id,
                    isActive: true
                };

                sessionStorageUtils.saveSession(sessionData);
                dispatch(addSession(sessionData));

                if (role_id === '1') {
                    history.push('/admin');
                } else {
                    history.push('/');
                }
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
        const { activeSession } = getState().userReducer;
        const token = activeSession?.token;
        try {
            const result = await axios.get('http://localhost:8080/account/currentUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getProfileAction(result.data));
        } catch (err) {
            console.log("err", err.response?.data?.message);
            // If unauthorized, try to switch to another session
            const allSessions = sessionStorageUtils.getAllSessions();
            const otherSession = allSessions.find(session => session.email !== activeSession?.email);
            if (otherSession) {
                sessionStorageUtils.switchSession(otherSession.email);
                dispatch(setActiveSession(otherSession));
                // Retry the request with the new session
                dispatch(getProfileActionApi());
            }
        }
    };
};

export const changePasswordActionAPI = (data) => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try {
            const { activeSession } = getState().userReducer;
            const token = activeSession?.token;
            console.log("token", token);
            if (!token) {
                throw new Error("Bạn chưa đăng nhập!");
            }
            const result = await http.post('/auth/changePassword', data);
            dispatch(changePasswordAction(result.data));
            toast.success("Đổi mật khẩu thành công");
            return { success: true };
        } catch (err) {
            console.error("Lỗi API:", err.response?.status, err.response?.data);
            if (err.response?.status === 400) {
                throw new Error("Mật khẩu cũ không đúng!");
            }
            throw new Error(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
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