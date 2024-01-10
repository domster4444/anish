//@ts-nocheck
"use client";

import { useEffect, useState } from "react";

import { NextPage } from "next";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/router";
import { toastConfig } from "constant/constant";
import { storeDataByValue } from "services/LocalStorageService";

import "app/globals.css";
import "@/app/styles/global.css";

// * redux
import type { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setSchoolName,
  setSchoolImage,
  setSchoolStreet,
  setAccountId,
  setSchoolId,
  setSchoolUniqueId,
  setImage,
  setLoggedInUserPackage,
  setLoggedInUserAccountStatus,
  setLoggedInUserPackageRenewalDate,
  setLoggedInUserToken,
  setName,
  setEmail,
  setRole,
  setIsUserLoggedIn,
  setIsSchoolLoggedIn,
} from "app/GlobalRedux/Features/authenticatedSlice/authenticatedSlice";

//* rtk query imports
import { usePostSchoolLoginMutation, usePostUserLoginMutation } from "@/app/GlobalRedux/API/authenticationApi";

const LoginPage: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.authenticated.email);
  const loggedInUserPackage = useSelector((state: RootState) => state.authenticated.loggedInUserPackage);
  const loggedInUserAccountStatus = useSelector((state: RootState) => state.authenticated.loggedInUserAccountStatus);
  const loggedInUserPackageRenewalDate = useSelector((state: RootState) => state.authenticated.loggedInUserPackageRenewalDate);
  const loggedInUserToken = useSelector((state: RootState) => state.authenticated.loggedInUserToken);
  const isSchoolLoggedIn = useSelector((state: RootState) => state.authenticated.isSchoolLoggedIn);
  const isUserLoggedIn = useSelector((state: RootState) => state.authenticated.isUserLoggedIn);
  const schoolUniqueId = useSelector((state: RootState) => state.authenticated.schoolUniqueId);
  const image = useSelector((state: RootState) => state.authenticated.image);
  const schoolId = useSelector((state: RootState) => state.authenticated.schoolId);
  const role = useSelector((state: RootState) => state.authenticated.role);
  const accountId = useSelector((state: RootState) => state.authenticated.accountId);
  const name = useSelector((state: RootState) => state.authenticated.name);
  const schoolName = useSelector((state: RootState) => state.authenticated.schoolName);
  const schoolImage = useSelector((state: RootState) => state.authenticated.schoolImage);
  const schoolStreet = useSelector((state: RootState) => state.authenticated.schoolStreet);

  const [SchoolLogin, { isLoading: schoolLoginIsLoading, isError: schoolLoginIsError, isSuccess: schoolLoginIsSuccess, data: loggedInSchoolData }] = usePostSchoolLoginMutation();
  const [UserLogin, { isLoading: userLoginIsLoading, isError: userLoginIsError, isSuccess: userLoginIsSuccess, data: loggedInUserData }] = usePostUserLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState<"school" | "user">("user"); // ["school", "user"
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedInUserToken) {
      router.push("/dashboard/blog/addPost");
    }
  }, [loggedInUserToken]);

  //* Automatically Clear Error Message after 4 seconds
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  //* Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username.");
    } else if (password.length < 6 || !/[A-Za-z]/.test(password)) {
      setError("Password must be at least 6 characters long and include a symbol and an alphabet.");
    } else {
      let dataToSend = {};

      if (loginType === "school") {
        dataToSend = {
          school_email: username,
          password: password,
        };
        SchoolLogin(dataToSend).then((res: any) => {
          if (res.error) {
            setError(res.error.data.message);
            toast.info(`${res.error.data.message}`, toastConfig);
            return;
          }
          console.log("INEED");
          console.log(res.data.data);
          storeDataByValue("schoolUniqueId", res.data.data.schoolUniqueId);
          storeDataByValue("schoolId", res.data.data.schoolId);

          if (res.data?.success) {
            //? check if res.data.data  have school_email as key
            if (res.data.data.school_email) {
              toast.info(`${res.data.message}`, toastConfig);
              const { name, role, image, schoolUniqueId, school_email, school_package, account_status, school_package_renewal_date, _id, street } = res.data.data;
              dispatch(setName(name));
              dispatch(setEmail(school_email));
              dispatch(setLoggedInUserPackage(school_package));
              dispatch(setLoggedInUserAccountStatus(account_status));
              dispatch(setLoggedInUserPackageRenewalDate(school_package_renewal_date));
              dispatch(setLoggedInUserToken(res.data.token));
              dispatch(setIsSchoolLoggedIn(true));
              dispatch(setIsUserLoggedIn(false));
              dispatch(setSchoolUniqueId(schoolUniqueId));
              dispatch(setImage(image));
              dispatch(setSchoolId(_id));
              dispatch(setRole(role));
              dispatch(setAccountId(_id));
              dispatch(setSchoolName(name));
              dispatch(setSchoolImage(image));
              dispatch(setSchoolStreet(street));

              //* redirect to school dashboard
              // router.push("/dashboard/home");
            }
          }
        });
      } else if (loginType === "user") {
        dataToSend = {
          email: username,
          password: password,
        };
        UserLogin(dataToSend).then((res: any) => {
          if (res.error) {
            setError(res.error.data.message);

            toast.info(`${res.error.data.message}`, toastConfig);
          }

          if (res.data?.success) {
            //? check if res.data.data don't have school_email as key
            if (!res.data?.data?.school_email) {
              toast.info(`${res.data.message}`, toastConfig);
              const { email, image, role, schoolId, schoolUniqueId, userId, name, schoolName, schoolStreet, schoolImage } = res.data.data;
              dispatch(setName(name));
              dispatch(setAccountId(userId));
              dispatch(setEmail(email));
              dispatch(setRole(role));
              dispatch(setImage(image));
              dispatch(setLoggedInUserToken(res.data.token));
              dispatch(setIsSchoolLoggedIn(false));
              dispatch(setIsUserLoggedIn(true));
              dispatch(setSchoolId(schoolId));
              dispatch(setSchoolUniqueId(schoolUniqueId));
              dispatch(setSchoolName(schoolName));
              dispatch(setSchoolImage(schoolImage));
              dispatch(setSchoolStreet(schoolStreet));

              //* redirect to school dashboard
              router.push("/dashboard/blog/addPost");
            }
          }
        });
      }
    }
  };

  if (schoolLoginIsLoading || userLoginIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className='login_page'>
        <div className='session box-shadow'>
          <div className='left'>
            <img src='https://i.ibb.co/8KKjc5X/logo.png' height={50} width={50} alt='company logo' />
          </div>

          <form className='log-in' autoComplete='off'>
            <h4 className='nibpro_semi_bold'>
              Welcome <span>Back!</span>
            </h4>
            <p className='roboto_300'>Log in to your account to access the School Management System.</p>
            <div className='floating-label'>
              <input autoComplete='off' placeholder='Username' className='roboto_400' type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor='username'>Email:</label>
              <div className='icon'>
                <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                  <path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' />
                </svg>
              </div>
            </div>
            <div className='floating-label'>
              <input autoComplete='off' placeholder='Password' className='roboto_400' type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor='password'>Password:</label>
              <div className='icon'>
                <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                  <path d='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z' />
                </svg>
              </div>
            </div>
            {/* checkbox to check "school" or "user" */}

            <p
              style={{
                color: "#000000",
                marginLeft: ".2rem",
                marginBottom: "0",
                marginTop: ".5rem",
                fontSize: ".8rem",
              }}
            >
              Select account type:
            </p>

            <button type='submit' onClick={handleLogin} className='roboto_500 primary-red-bg'>
              LOGIN
            </button>
            <p className='error-msg'>
              {error ? (
                <>
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                    <span className='block sm:inline'>{error}</span>
                    <span className='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
                  </div>
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
            {/* <span className='error'>{error}</span> */}
            <Link href='/forgotPassword' className='discrete roboto_400'>
              Forgot Password ?
            </Link>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
