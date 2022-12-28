import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Loading from '@components/common/Loading';
import { LockOpenIcon } from '@heroicons/react/outline';
import { NextResponse } from 'next/server';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BASE_URL } from '@content/api-urls';
import Link from 'next/link';

const VerifyUser = () => {
  const { setAccessToken } = authStore();
  const router = useRouter();
  const next_response = NextResponse.next();
  const { confirmCode } = router.query;
  const [otp, setOtp] = useState<string>('');
  const [isloading, setIsloading] = useState<Boolean>(false);
  const notify = (message: string) => toast(message);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const header = {
      'Content-Type': 'application/json',
    };
    const url = `${BASE_URL}verifyOTP`;
    const data = {
      otp: otp,
      verification_id: confirmCode,
    };
    try {
      const response = await axios.post(url, data, { headers: header });
      const access = response.data.access;

      if (access != undefined) {
        console.log(response.data.access);
        setAccessToken(response.data.access);
        setIsloading(false);
        next_response.cookies.set('access', response.data.access);
        // next_response. ('token',response.data.access)
        router.push('/citizen/profile');
      } else {
        setIsloading(false);
        notify('OTP Verification failed');
      }
    } catch (e) {
      notify('OTP Verification failed');
      console.log(e);
      setIsloading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center min-h-screen px-6 lg:px-8">
      <div className="p-6 border shadow-2xl sm:mx-auto sm:w-full sm:max-w-lg rounded-xl">
        <div className="space-y-6">
          <img
            className="w-auto h-16 mx-auto"
            src="/images/logo-only.jpg"
            alt="nepal-embassy-logo"
          />
          <div className="px-10 space-y-2 text-center text-gray-600">
            <h1 className="text-xl font-semibold">
              We&apos;ve sent verification code to your email
            </h1>
            <p className="text-sm font-medium">
              Enter the verification code to authorize your login
            </p>
            <Toaster
              toastOptions={{
                className: 'font-bold',
                style: {
                  backgroundColor: 'red',
                  color: 'white',
                },
              }}
            />
          </div>
        </div>
        <div className="px-6 py-8 bg-white sm:px-10">
          <form
            className="mb-0 space-y-6"
            action="#"
            method="POST"
            onSubmit={(event) => onSubmitHandler(event)}
          >
            <div className="flex mt-1 rounded-md">
              <span className="inline-flex items-center px-3 text-sm text-blue-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                <LockOpenIcon className="w-6 h-6" />
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="flex-1 block w-full font-bold tracking-widest border-gray-300 rounded-none rounded-r-md focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder:tracking-normal placeholder:font-normal"
                placeholder="Verification Code"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
            <div>{!isloading ? <VerifyButton /> : <VerifyingButton />}</div>
          </form>
          <div className="relative flex items-center justify-center mt-4 text-sm text-gray-500">
            <Link href="/login">
              <span className="px-4 py-2 text-center hover:cursor-pointer">
                Go back
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyButton = () => {
  return (
    <button
      type="submit"
      className="flex justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Submit
    </button>
  );
};

const VerifyingButton = () => {
  return (
    <button
      type="submit"
      className="flex justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Loading />
      Verifying OTP
    </button>
  );
};
export default VerifyUser;
