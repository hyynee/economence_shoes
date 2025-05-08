import React from 'react'
import { NavLink } from "react-router-dom"
import MobileNavbar from '../components/NavBar/MobileNavbar'
import Navbar from "../components/NavBar/Navbar"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-blue-500 shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-600">HuyAnh</h1>
          </NavLink>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navbar />
          </div>

          {/* Mobile Navigation  */}
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header