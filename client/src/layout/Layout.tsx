import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Header from '../components/Header'


function Layout() {
  return (
    <>
     <div style={{display: 'flex', backgroundColor: "#222"}}>
     <SideBar/>
     <Outlet />
     </div>
    </>
  )
}

export default Layout