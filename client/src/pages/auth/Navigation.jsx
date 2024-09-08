import React, { useState } from 'react'
import {AiOutlineHome,AiOutlineShopping,AiOutlineLogin,AiOutlineUserAdd,AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import "./Navigation.css";

const Navigation = () => {
    const [dropDownOpen,setDropDownOpen]=useState(false)
    const [showSideBar,setShowSideBar]=useState(false)

    const toggleDropDown=()=>{
        setDropDownOpen(!dropDownOpen)
    }

    const toggleSideBar=()=>{
        setShowSideBar(!showSideBar)
    }

    const closeSideBar=()=>{
        setShowSideBar(false)
    }

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-center items-baseline p-4 bg-black text-white w-[4%] hover:w-[15%] h-screen fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-between g-10 items-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>


        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>



        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
        </Link>



        <Link
          to="/favourite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favourite</span>{" "}
        </Link>
      </div>



      <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
        </ul>
    </div>
  )
}

export default Navigation
