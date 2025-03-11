import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import Header from '../pages/Header'
import BacktoTop from '../components/BackToTop/BacktoTop'

const HomeTemplate = () => {
  return (
    <>
        <Header></Header>
        <div>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>  
        <BacktoTop></BacktoTop>
    </>
  )
}

export default HomeTemplate