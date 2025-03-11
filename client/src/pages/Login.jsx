import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'
import url_image from '../assets/login/login.avif'
import Loading from '../components/Loading/Loading'
import { loginActionApi } from '../redux/userReducer/userReducer'

const Login = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.userReducer.loading);
    const frm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Invalid email format').required('Email is required'),
            password: yup.string().min(4, 'Password must be at least 8 characters long').required('Password is required')
        }),
        onSubmit: async (values) => {
            await dispatch(loginActionApi(values));
        }
    })
    return (
        <div
            className="container w-full h-full py-8 xl:py-10"
        >
            {loading && <Loading />}
            <div className="w-full min-h-screen flex items-start">
                {/* Right */}
                <div className="hidden md:flex w-1/2 h-full flex-col items-center relative">
                    <div className='absolute top-[25%] left-[10%] flex flex-col'>
                        <h1 className='text-2xl font-semibold my-4 text-black'>Turn Your Ideas into Reality</h1>
                        <p className='text-black/60 text-base'>Start for free and get attractive offers from the community</p>
                    </div>
                    <img src={url_image} alt="..." className="w-full h-full object-cover" />
                </div>
                {/* Left */}
                <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] p-10">
                    <h1 className='text-xl text-slate-400 font-semibold'>Welcome to Login Page</h1>
                    <div className='w-full flex flex-col'>
                        <div className='w-full flex flex-col mb-4'>
                            <h3 className='text-2xl font-semibold mb-4'>Login</h3>
                            <p className='text-sm mb-2'>Welcome Back! Please enter your details</p>
                        </div>
                        <form onSubmit={frm.handleSubmit}>
                            <div className='w-full flex flex-col'>
                                <input
                                    type="email"
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='p-2 my-2 rounded w-[100%] focus:outline-blue-600'
                                    onChange={frm.handleChange}
                                    required
                                />
                                {frm.errors.email && <p className='text-pink-500'>{frm.errors.email}</p>}
                                <input
                                    type="password"
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='p-2 my-2 rounded w-[100%] focus:outline-blue-600'
                                    onChange={frm.handleChange}
                                    required
                                />
                                {frm.errors.password && <p className='text-pink-500'>{frm.errors.password}</p>}
                            </div>
                            <button className='bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-[100%]' type='submit'>Login</button>
                        </form>
                        <div className='mt-4 text-center'>
                            <NavLink className='text-blue-500 text-sm font-semibold hover:text-accent hover:border-b-2 hover:border-accent' to='/forgot-password'>Forgot password?</NavLink>
                        </div>
                        <div className='w-full col-2 items-center justify-center mt-4 border-t-2 border-black flex'>
                            <p className='text-black font-semibold'>Don't have an account?
                                <NavLink to='/register' className='border-b-2 border-blue-500 ml-1 text-blue-500 text-sm'>
                                    Sign up for free
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
