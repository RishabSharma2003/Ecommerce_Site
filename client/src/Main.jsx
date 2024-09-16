import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';


const Main = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App/>}/>
      </Routes>
  </>
  )
}
// hello
export default Main;