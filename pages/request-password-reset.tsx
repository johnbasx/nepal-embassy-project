import toast, { Toaster } from 'react-hot-toast';

import Link from 'next/link';
import Loading from '@components/common/Loading';
import { LockClosedIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import axios from 'axios';
import { useState } from 'react';

const RequestPasswordReset: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>('');

  const requestPasswordReset = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const url = 'http://127.0.0.1:8000/request-reset-email/';
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
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl space-y-8 shadow-xl p-6 border rounded-md">
          <div>
            <div className="flex justify-center text-center ">
              <div className="bg-green-500 rounded-full p-3 shadow-2xl">
                <LockClosedIcon className="h-14 w-14 text-white" />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Request for password reset
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Enter the email address in the form below and we will sent a
                secure link to reset your password for your account
              </a>
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
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              {!isLoading ? (
                <button
                  type="submit"
                  className="group relative flex max-w-5xl justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send Request
                </button>
              ) : (
                <Requesting />
              )}
              <Link href="/login">
                <a className="group relative flex max-w-5xl justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
      className="group relative flex max-w-5xl justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <Loading />
      Requesting
    </button>
  );
};

export default RequestPasswordReset;
