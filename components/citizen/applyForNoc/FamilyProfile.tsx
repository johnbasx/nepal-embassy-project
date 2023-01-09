import Link from 'next/link';
import React from 'react';
import FamilyProfileCard from './FamilyProfileCard';

const FamilyProfile = () => {
  return (
    <div className="flex flex-col px-6 py-6 mx-auto mt-4 bg-white border rounded-lg shadow lg:mx-0">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl">
        Add profile for family member
      </h2>
      <dl className="mt-2 text-sm font-medium text-gray-500">
        <div className="flex flex-col mt-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Family Members
          </h2>
          <FamilyProfileCard />
          <p className="text-sm font-normal text-gray-500">
            You can add profile for your family members if their age is below 15
            or above 60 or don't have access to a smartphone/computer/internet.
          </p>

          <div className="flex justify-center px-4 py-3 text-right bg-white sm:px-16">
            <Link href="#!">
              <span className="inline-flex justify-center w-full max-w-lg py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add another profile
              </span>
            </Link>
          </div>
        </div>
      </dl>
      {/* Redirect to add profile */}
      {/* {router.pathname.includes('/citizen/') && (
        <p className="mt-6 text-sm text-gray-500">
          Need changes?{' '}
          <Link href="/citizen/profile">
            <a className="font-medium text-blue-600 underline hover:text-blue-700">
              Update here
            </a>
          </Link>
          .
        </p>
      )} */}
    </div>
  );
};

export default FamilyProfile;
