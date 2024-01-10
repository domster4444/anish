//@ts-nocheck

import { Fragment, useEffect, useState } from "react";
import { FC, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Tilty from "react-tilty";
import Clock from "react-live-clock";
import { useSelector } from "react-redux";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { globalConstant } from "constant/constant";
import { NextUIProvider } from "@nextui-org/react";
import type, { RootState } from "@/app/GlobalRedux/store";
import GlobalSearchInput from "@/components/GlobalSearchInput";

import DashboardSideDrawer from "../DashboardSideDrawer";

import "app/globals.css";
import "@/app/styles/global.css";

import "../dashboard-base.css";

type DashboardOutlineProps = {
  pageTitle: string;
  isShowRightSection: boolean;
  children: ReactNode;
};

// function that converts  "Devi Secondary School" to "Devi School"
function transformSchoolName(inputString) {
  const words = inputString.split(" ");
  if (words.includes("Devi") && words.includes("Secondary")) {
    const transformedString = "Devi " + words[0] + " School";
    return transformedString;
  } else {
    return inputString;
  }
}

const DashboardOutline: FC<DashboardOutlineProps> = ({ pageTitle, isShowRightSection, children }: DashboardOutlineProps) => {
  let [isOpenAddBookModel, setIsOpenAddBookModel] = useState(false);

  const router = useRouter();
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  console.log("loggedInUserData", loggedInUserData);
  const { loggedInUserToken } = loggedInUserData;
  if (!loggedInUserToken) {
    router.push("/");
  }

  function closeAddModal() {
    setIsOpenAddBookModel(false);
  }

  function openAddBookModal() {
    setIsOpenAddBookModel(true);
  }

  //* if window size is above 768px then style="display: block; transform: translateX(0%);" to aside
  addEventListener("resize", () => {
    const sideMenu = document.querySelector("aside") as HTMLElement;
    if (sideMenu === null) {
      return;
    }

    if (window.innerWidth > 1200) {
      sideMenu.style.display = "block";
      sideMenu.style.transform = "translateX(0%)";
    }
    if (window.innerWidth < 1200) {
      sideMenu.style.display = "none";
      sideMenu.style.transform = "translateX(-100%)";
    }
  });

  //custom select
  useEffect(() => {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
    except the current select box:*/
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
  }, []);

  return (
    <>
      <NextUIProvider>
        <Head>
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons+Sharp' rel='stylesheet' />
        </Head>

        <main className='dashboard-main'>
          <div className='container'>
            <DashboardSideDrawer role={"user"} schoolName={"Social Media Visualization"} />
            <main
              style={{
                overflow: "scroll",
              }}
            >
              {/* //! Tutorial MODEL  */}
              <div className='mt-32'></div>

              <nav className='flex mb-7' aria-label='Breadcrumb '>
                <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                  <li className='inline-flex items-center'>
                    <Link href='/dashboard/blog/addPost' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
                      <svg className='w-3 h-3 mr-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                      </svg>
                      Dashboard
                    </Link>
                  </li>

                  <li aria-current='page'>
                    <div className='flex items-center'>
                      <svg className='w-3 h-3 text-gray-400 mx-1' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
                      </svg>
                      <span className='ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400'>Home</span>
                    </div>
                  </li>
                </ol>
              </nav>

              {children}
            </main>
          </div>
        </main>
      </NextUIProvider>
    </>
  );
};

export default DashboardOutline;
