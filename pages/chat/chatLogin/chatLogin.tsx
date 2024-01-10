"use client";

//@ts-nocheck
import React from "react";
import "app/globals.css";
import Image from "next/image";
import SoftwareLogo from "public/assets/your-school-logo.png";
import AuthForm from "../components/AuthForm";

const ChatLogin = () => {
  return (
    <main
      className='
      flex 
      flex-col 
      justify-center 
      py-12 
      sm:px-6 
      lg:px-8 
      min-h-screen
      bg-gray-50
    '
    >
      <section className='bg-white p-10 sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          src={SoftwareLogo}
          width={0}
          height={0}
          alt='logo'
          style={{ width: "auto", height: "3rem", margin: "0 auto" }} // optional
        />

        <h2
          className='
          mt-4
          text-center
          text-xl 
          tracking-tight 
          text-gray-600
          roboto_400
        '
        >
          Create Teacher Groups, Student Groups & Share Study Materials
        </h2>
        <AuthForm />
      </section>
    </main>
  );
};

export default ChatLogin;
