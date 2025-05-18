import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import url_image from '../assets/login/register.png';
import Loading from '../components/Loading/Loading';
import { signUpActionApi } from '../redux/userReducer/userReducer';

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);
  const frm = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      full_name: yup
        .string()
        .required('Full Name is required'),
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/, 'Email must be a @gmail.com or @yahoo.com address'),
      password: yup
        .string()
        .min(4, 'Password must be at least 4 characters long')
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await dispatch(signUpActionApi(values));
        if (response?.success) {
          resetValues();
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  });
  const resetValues = () => {
    frm.resetForm();
  }
  return (
    <div className="container w-full h-full py-8 xl:py-10">
      {loading && <Loading />}
      <div className="w-full min-h-screen flex items-start">
        {/* Right */}
        <div className="hidden md:flex w-1/2 h-full flex-col items-center relative">
          <img src={url_image} alt="..." className="w-full h-full object-cover" />
        </div>
        {/* Left */}
        <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] p-10">
          <h1 className="text-xl text-slate-400 font-semibold">Welcome to Register Page</h1>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-4">
              <h3 className="text-2xl font-semibold mb-4">Register</h3>
              <p className="text-sm mb-2">Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={frm.handleSubmit}>
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="Full Name"
                  className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"
                  onChange={frm.handleChange}
                  value={frm.values.full_name}
                  required
                />
                {frm.errors.full_name && <p className="text-pink-500">{frm.errors.full_name}</p>}
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"
                  onChange={frm.handleChange}
                  value={frm.values.email}
                  required
                />
                {frm.errors.email && <p className="text-pink-500">{frm.errors.email}</p>}

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"
                  onChange={frm.handleChange}
                  value={frm.values.password}
                  required
                />
                {frm.errors.password && <p className="text-pink-500">{frm.errors.password}</p>}
              </div>
              <div className="flex justify-between items-center mt-4 mb-4">
                <button className="rounded-xl bg-black text-white w-full py-2" type="submit">
                  {loading ? "Đang xử lý..." : "Register"}
                </button>
              </div>
            </form>
            <div className="w-full flex items-center justify-center mt-4">
              <p className="text-black font-semibold">
                Already have an account?{' '}
                <NavLink to="/login" className="border-b-2 border-blue-500 ml-1 text-blue-500">
                  Login Now
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
