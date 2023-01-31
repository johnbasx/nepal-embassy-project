import { ExclamationIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';

const NotValidLink = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8 shadow-xl p-6 py-8 border rounded-2xl">
        <div>
          <div className="flex justify-center text-center ">
            <div className="bg-red-500 rounded-full p-3 shadow-2xl">
              <ExclamationIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="mt-6 gap-4 flex flex-col justify-center items-center text-center text-xl font-semibold tracking-tight">
            <h2 className="text-center text-gray-800">
              Reset password link validity has expired...!
            </h2>
            <p className="text-sm text-gray-600 font-normal">
              Please reset your password again by going to the password reset
              page
            </p>
            <Link href="/request-password-reset">
              <span className="cursor-pointer text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 duration-200 text-white max-w-sm rounded-md">
                Reset password
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotValidLink;
