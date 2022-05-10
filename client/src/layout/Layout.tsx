import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Header from '../components/Header'


function Layout() {
  return (
    <div>
     <Header/>
     <SideBar/>
     <Outlet />
    </div>
  )
}

export default Layout