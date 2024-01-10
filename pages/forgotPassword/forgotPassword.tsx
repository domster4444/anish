import { useEffect, useState } from "react";

import { NextPage } from "next";

import Link from "next/link";

import "@/app/styles/global.css";

const ForgotPasswordPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Automatically clear the error message after 4 seconds
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter a username.");
    } else if (password.length < 6 || !/[!@#$%^&*]/.test(password) || !/[A-Za-z]/.test(password)) {
      setError("Password must be at least 6 characters long and include a symbol and an alphabet.");
    } else {
      // Perform your login logic here
      // If login is successful, redirect to the dashboard
      // If login fails, set an error message accordingly
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <main className='login_page'>
      <div className='session box-shadow'>
        <form action='' className='log-in' autoComplete='off' onSubmit={handleLogin}>
          <h4 className='roboto_500'>
            <center>Forgot Your Password?</center>
          </h4>
          <p className='roboto_400'>Enter your username to reset your password.</p>
          <div className='floating-label'>
            <input autoComplete='off' placeholder='Username' className='roboto_400' type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor='username'>Username:</label>
            <div className='icon'>
              <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                <path d='M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z' />
              </svg>
            </div>
          </div>

          <button type='submit' className='roboto_500'>
            RESET PASSWORD
          </button>
          <p className='error-msg'>{error ? <span className='error'>{error}</span> : <span>&nbsp;</span>}</p>

          <Link href='/login' className='discrete'>
            Back to login
          </Link>
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
