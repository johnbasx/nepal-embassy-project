import toast, { Toaster } from 'react-hot-toast';

import Link from 'next/link';
import Loading from '@components/common/Loading';
import { LockClosedIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import axios from 'axios';
import { useState } from 'react';
import { requestPasswordReset } from '@content/api-urls';

const RequestPasswordReset: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>('');

  const requestPasswordReset = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const url = 'requestPasswordReset';
    try {
      const response = await axios.post(
        url,
        {
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.success);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.fail);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-6 space-y-8 border rounded-lg shadow-xl">
          <div>
            <div className="flex justify-center text-center ">
              <div className="p-3 bg-blue-700 rounded-full shadow-2xl">
                <LockClosedIcon className="text-white h-14 w-14" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
              Request for password reset
            </h2>
            <p className="mt-2 text-sm text-center text-gray-500">
              Enter the email address in the form below and we will sent a
              secure link to reset your password for your account
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={(event) => requestPasswordReset(event)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              {!isLoading ? (
                <button
                  type="submit"
                  className="relative flex justify-center max-w-5xl px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Request
                </button>
              ) : (
                <Requesting />
              )}
              <Link href="/login">
                <a className="relative flex justify-center max-w-5xl px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Cancel
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Requesting = () => {
  return (
    <button
      type="button"
      className="relative flex justify-center max-w-5xl px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md group hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      <Loading />
      Requesting
    </button>
  );
};

export default RequestPasswordReset;
