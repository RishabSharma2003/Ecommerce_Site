import React from 'react'
import {Outlet} from 'react-router-dom'
import Navigation from './pages/auth/Navigation';
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <ToastContainer/>
      <Navigation/>
      <main className='py-3'>
        <Outlet/>
      </main>
    </div> 
  )
}

export default Main
