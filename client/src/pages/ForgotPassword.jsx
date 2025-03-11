import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as yup from 'yup';
import { forGotPasswordActionAPI } from '../redux/userReducer/userReducer';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: async (values) => {
      // console.log("valueEmail", values)
      await dispatch(forGotPasswordActionAPI(values));
    }
  })
  return (
    <div className="flex h-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Quên mật khẩu?</h2>
        <p className="text-center text-gray-600">
          Nhập email để nhận liên kết khôi phục mật khẩu.
        </p>
        <form className="space-y-4" onSubmit={frm.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Địa chỉ Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              onChange={frm.handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Gửi liên kết khôi phục
          </button>
        </form>
        <div className="text-center">
          <NavLink to="/login" className="text-sm text-blue-600 hover:underline">
            Quay lại trang đăng nhập
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword