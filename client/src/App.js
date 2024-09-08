import React from 'react'
import {Outlet} from 'react-router-dom'
import Navigation from './pages/auth/Navigation';

const Main = () => {
  return (
    <div>
      <Navigation/>
      djbhd
      <main className='py-3'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Main
