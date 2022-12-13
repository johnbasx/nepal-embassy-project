import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Loading from '@components/common/Loading';
import { LockOpenIcon } from '@heroicons/react/outline';
import { NextResponse } from 'next/server';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { useRouter } from 'next/router';

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
    const url = `http://192.168.29.199:8000/verifyOTP`;
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
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg shadow-2xl border rounded-xl p-6">
        <div className="space-y-6">
          <img
            className="mx-auto h-16 w-auto"
            src="/images/logo-only.jpg"
            alt="nepal-embassy-logo"
          />
          <div className="px-10 text-gray-600 text-center space-y-2">
            <h1 className="font-semibold text-xl font-sans">
              We've sent Verification code to your email
            </h1>
            <p className="font-semibold text-sm">
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
        <div className="bg-white py-8 px-6 sm:px-10">
          <form
            className="mb-0 space-y-6"
            action="#"
            method="POST"
            onSubmit={(event) => onSubmitHandler(event)}
          >
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-indigo-500">
                <LockOpenIcon className="h-6 w-6" />
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Verification Code"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
            <div>{!isloading ? <VerifyButton /> : <VerifyingButton />}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

const VerifyButton = () => {
  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase tracking-widest"
    >
      Verify
    </button>
  );
};

const VerifyingButton = () => {
  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase tracking-widest"
    >
      <Loading />
      Verifying
    </button>
  );
};
export default VerifyUser;
