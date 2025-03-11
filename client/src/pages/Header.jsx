import React from 'react'
import { NavLink } from "react-router-dom"
import MobileNavbar from '../components/NavBar/MobileNavbar'
import Navbar from "../components/NavBar/Navbar"

const Header = () => {
  return (
    <header className='py-8 xl:py-8'>
      <div className='mx-auto flex justify-between items-center fixed top-0 left-0 right-0 bg-blue-400 text-white z-50' >
        {/* lOGO */}
        <NavLink href="/">
          <h1 className='text-4xl font-semibold container'>HuyAnh</h1>
        </NavLink>
        {/* desktop NAV */}
        <div className="hidden xl:flex items-center gap-8">
          <Navbar></Navbar>
        </div>
        <MobileNavbar />
      </div>
    </header>
  )
}

export default Header