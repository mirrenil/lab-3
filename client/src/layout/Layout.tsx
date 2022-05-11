import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Header from '../components/Header'


function Layout() {
  return (
    <>
     <Header/>
     <div style={{display: 'flex'}}>
     <SideBar/>
     <Outlet />
     </div>
    </>
  )
}

export default Layout