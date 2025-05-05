import { motion } from 'framer-motion'
import React from 'react'
import { Outlet } from 'react-router-dom'
import BacktoTop from '../components/BackToTop/BacktoTop'
import Footer from '../pages/Footer'
import Header from '../pages/Header'
const HomeTemplate = () => {
  return (
    <>
      <Header></Header>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Outlet></Outlet>
        </motion.div>
      </div>
      <Footer></Footer>
      <BacktoTop></BacktoTop>
    </>
  )
}

export default HomeTemplate