import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState } from "react";
import npvLogo from "../Images/logo.gif";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const Menus = [
    {
      id: 1,
      title: "Home",
      to: "/",
    },
    {
      id: 2,
      title: "NPV",
      to: "/npv",
    },
    {
      id: 3,
      title: "Contact",
      to: "/contact",
    },
  ];
  const handleSubMenu = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex justify-between items-center h-15 bg-[#00563F] text-[#FFFFFF]">
      <img
        src={npvLogo}
        alt="unable to display cbe logo"
        className="w-[100px] h-[40px]"
      />
      <h1 className="w-full text-2xl font-bold">
        <NavLink
          to="/npv"
          className={({ isActive }) =>
            isActive ? "underline text-white font-bold bg-green-950" : ""
          }
        >
          {" "}
          Tool
        </NavLink>
      </h1>
      <ul className="hidden md:flex">
        {Menus.map((menu) => (
          <React.Fragment key={menu.id}>
            <li
              key={menu.id}
              className="hover:font-bold text-white text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white rounded-md p-4"
            >
              <NavLink
                to={menu.to}
                onClick={() => {
                  handleSubMenu();
                }}
                className={({ isActive }) =>
                  isActive ? "underline text-white font-bold bg-green-950" : ""
                }
              >
                {menu.title}
              </NavLink>
              {menu.submenu && (
                <IoMdArrowDropdown
                  onClick={() => {
                    handleSubMenu();
                  }}
                />
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>

      <div className="md:max-lg:flex"></div>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} className="cursor-pointer" />
        ) : (
          <AiOutlineMenu size={20} className="cursor-pointer" />
        )}
        <div className="md:max-lg:flex">
          <nav>
            <ul
              className={
                nav
                  ? "fixed left-0 top-10 w-[20%] h-full border-r border-r-purple-750 bg-[#00563F] text-[#FAFAFA] ease-in-out duration-500 text-white border border-green-400"
                  : "fixed left-[-100%] "
              }
            >
              {Menus.map((menu) => (
                <React.Fragment key={menu.id}>
                  <li
                    key={menu.id}
                    className="
                    text-white 
                    text-sm 
                    flex items-center 
                    gap-x-4 
                    cursor-pointer 
                    hover:bg-light-white 
                    rounded-md p-4
                    p-4 border-b border-white-100
                    "
                  >
                    <NavLink
                      to={menu.to}
                      onClick={() => {
                        handleSubMenu();
                      }}
                      className={({ isActive }) =>
                        isActive ? "underline text-white font-bold bg-green-950" : ""
                      }
                    >
                      {menu.title}
                    </NavLink>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
