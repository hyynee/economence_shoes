import React from 'react'
import { createContext } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'



export const ToastContext = createContext();
const ToastifyProvider = ({children}) => {
    const value =  {
        toast
    }
  return (
    <ToastContext.Provider value={value}>
        {children}
        <ToastContainer
           position="top-center" 
           autoClose={600}  
        ></ToastContainer>
    </ToastContext.Provider>
  )
}

export default ToastifyProvider