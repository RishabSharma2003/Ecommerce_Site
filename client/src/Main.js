import React from 'react'
import {Routes,Route} from 'react-router-dom';
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