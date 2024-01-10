//@ts-nocheck
import { useEffect, useState } from "react";

import Drawer from "react-modern-drawer";

import Link from "next/link";
import Image from "next/image";
import IconDropdown from "components/IconDropdown";
import { ContainedButtonSm, GhostButtonSm } from "components/Button/Button";

import "react-modern-drawer/dist/index.css";

const Nav = ({ noDropdownMenuData, fullWidthDropDownMenuData, primaryDropdownData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }, []);

  return (
    <nav className='bg-white relative px-2 py-4 box-shadow'>
      <div className='section-container flex justify-between items-center'>
        <div id='hamburger-panel' className='block ng:hidden hover:bg-gray-100 p-2 rounded-md'>
          <button className='flex flex-col items-center justify-between w-9 h-8 p-1' onClick={toggleDrawer}>
            <div className='w-full h-1 primary-blue-bg rounded'></div>
            <div className='w-full h-1 primary-blue-bg rounded my-1'></div>
            <div className='w-full h-1 primary-blue-bg rounded'></div>
          </button>
          <Drawer open={isOpen} onClose={toggleDrawer} direction='right' className='bla bla bla'>
            <div className='hamburger-content'>
              <div className='sidenav'>
                <Link className='roboto_400' href='/'>
                  Home
                </Link>

                <button className='flex items-center dropdown-btn roboto_400'>
                  Resources
                  <svg className='ms-3' fill='#240642' xmlns='http://www.w3.org/2000/svg' height='16' width='10' viewBox='0 0 320 512'>
                    <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
                  </svg>
                </button>
              </div>
            </div>
          </Drawer>
        </div>

        <div></div>

        <ul className='hidden ng:block ng:flex  items-center space-x-6'>
          <li>
            <Link className='nav-menu px-3 py-3 rounded-md  ' href='/'>
              Home
            </Link>
          </li>

          {primaryDropdownData.map((item: any) => (
            <>
              <li className='flex relative group'>
                <Link href='#' className=' px-3 py-3 rounded-md dropdown-menu rotate-chevron-on-hover mr-1'>
                  {item.name}
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                    <path d='M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z' />
                  </svg>
                </Link>
                <i className='fa-solid fa-chevron-down fa-2xs pt-3'></i>
                <ul className='absolute bg-white p-3 w-52 top-12 rounded-md transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top shadow-lg'>
                  {item.subMenus.map((subItem: any) => (
                    <>
                      <Link href={`${subItem.link}`} className='nav-menu'>
                        <li className='text-sm px-2  rounded hover:bg-slate-100 leading-8'>{subItem.name}</li>
                      </Link>
                    </>
                  ))}
                </ul>
              </li>
            </>
          ))}

          <li>
            <Link className='nav-menu ' href={`/login`}>
              <GhostButtonSm>Login</GhostButtonSm>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
