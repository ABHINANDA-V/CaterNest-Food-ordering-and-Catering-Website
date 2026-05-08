import React from 'react'
import NavBar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import "./layout.css"

const Layout = () => {
  return (
    <div className='pageLayout'>
    <NavBar/>

    <div className='pageContent'>
        <Outlet/>
    </div>

    <Footer/>
    </div>

  )
}

export default Layout