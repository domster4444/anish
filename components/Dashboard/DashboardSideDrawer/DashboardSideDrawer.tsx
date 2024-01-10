//@ts-nocheck
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { toastConfig } from "constant/constant";
import { globalConstant } from "constant/constant";
import { removeDataByValue } from "services/LocalStorageService";
import { logout } from "app/GlobalRedux/Features/authenticatedSlice/authenticatedSlice";

const DashboardSideDrawer = ({ role, schoolName }) => {
  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);

  const [dropdowns, setDropdowns] = useState({
    library: false,
    anotherDropdown: false,
    // Add more dropdowns here with initial states
  });
  const [activeMenu, setActiveMenu] = useState("");

  const toggleDropdown = (dropdownName) => {
    setDropdowns({
      ...dropdowns,
      [dropdownName]: !dropdowns[dropdownName],
    });
  };

  // function to return words except last word
  function removeLastWord(str) {
    var n = str.lastIndexOf(" ");
    var result = str.substring(0, n);
    return result;
  }

  // function to return only last word
  function getLastWord(str) {
    var n = str.lastIndexOf(" ");
    var result = str.substring(n + 1);
    return result;
  }

  const handleMenuClick = (menuName) => {
    // if already active menu is clicked then close the menu
    if (activeMenu === menuName) {
      setActiveMenu("");
      return;
    }

    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
  };
  useEffect(() => {
    // Check local storage for activeMenu and set it
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);

      // open dropdowns if active menu is in dropdowns
      setDropdowns({
        ...dropdowns,
        [storedActiveMenu]: true,
      });
    }
  }, []);

  return (
    <aside className='z-20'>
      <div className='toggle '>
        <div className='logo'>
          {/* {loggedInUserData.schoolImage ? (
            <img className='rounded cursor-pointer' src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${loggedInUserData.schoolImage}`} alt='School Logo' />
          ) : (
            <img className='rounded cursor-pointer w-12' src='https://i.ibb.co/vVnqvfJ/sss.jpg' alt='Dummy Image' />
          )} */}

          <h2 className='text-xl'>
            <strong>
              {(() => {
                if (schoolName) {
                  return removeLastWord(schoolName).toUpperCase();
                }
              })()}
              <span
                style={{
                  color: "#e84c3d",
                }}
              >
                {(() => {
                  // check if schoolName is not null
                  if (schoolName) {
                    return ` ${getLastWord(schoolName).toUpperCase()}`;
                  }
                })()}
              </span>
            </strong>
          </h2>
        </div>
        <div className='close' id='close-btn'>
          <span className='material-icons-sharp hover:bg-gray-100 p-2 rounded-md'> close </span>
        </div>
      </div>

      <div className='sidebar'>
        {/* //* Blogs */}
        <div className='sidedrawer-menu-container'>
          <div
            className={`sidedrawer-dropdn ${activeMenu === "blog" ? "active" : ""}`}
            onClick={() => {
              handleMenuClick("blog");
              toggleDropdown("blog");
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
              <path d='M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z' />
            </svg>

            <h3>Post</h3>

            <svg className={`dropdown-chevron ${dropdowns.blog ? "up-side-down" : ""}`} xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
              <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
            </svg>
          </div>
          <div className={`sidedrawer-dropdown-list ${dropdowns.blog ? "" : "hidden"}`}>
            <ul>
              <Link href='http://localhost:3000/dashboard/calendarManagement'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>Post Calendar</h4>
                </li>
              </Link>
            </ul>
            <ul>
              <Link href='http://localhost:3000/dashboard/blog/addPost'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>Add Post</h4>
                </li>
              </Link>
            </ul>
            <ul>
              <Link href='http://localhost:3000/dashboard/blog/manage/manage'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>Manage Post</h4>
                </li>
              </Link>
            </ul>
            <ul>
              <Link href='http://localhost:3000/dashboard/blog/fb/fb'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>Facebook</h4>
                </li>
              </Link>
            </ul>
            <ul>
              <Link href='http://localhost:3000/dashboard/blog/twitter/twitter'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>Twitter</h4>
                </li>
              </Link>
            </ul>
            <ul>
              <Link href='http://localhost:3000/dashboard/blog/linkedin/linkedin'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>linkedin</h4>
                </li>
              </Link>
            </ul>
            <ul>
              <Link href='http://localhost:3000/dashboard/blog/insta/insta'>
                <li>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                    <path d='M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z' />
                  </svg>
                  <h4>insta</h4>
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* //* Logout */}
        <div className='sidedrawer-menu-container'>
          <div
            className='sidedrawer-dropdn'
            onClick={() => {
              removeDataByValue();
              dispatch(logout());
              toast.info("You have been logged out", toastConfig);
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
              <path d='M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z' />
            </svg>
            <h3>Logout</h3>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideDrawer;
