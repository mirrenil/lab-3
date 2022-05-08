import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Header from '../Header'


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