import React, { useEffect, useState } from 'react';

import { BASE_URL } from '@content/api-urls';
import FamilyProfileCard from './FamilyProfileCard';
import { FetchData } from '@utils/fetcher';
import Link from 'next/link';
import authStore from '@store/useAuthStore';

export interface RelativeProfileProps {
  id: string;
  relationship: string;
  full_name: string;
  contact_number: string;
  email: string;
  dob: string;
  gender: string;
  profession: string;
  qualification: string;
  fathers_name: string;
  mothers_name: string;
  created_at: Date;
  add_by: string;
}
const FamilyProfile = () => {
  const { token } = authStore();

  const [relatives, setRelatives] = useState<RelativeProfileProps[]>([]);

  const getRelatives = async () => {
    const data = await FetchData(token, BASE_URL + 'getRelatives');
    // console.log(data);
    setRelatives(data);
  };
  useEffect(() => {
    getRelatives();
  }, []);

  return (
    <div className="flex flex-col px-6 py-6 mx-auto mt-4 bg-white border rounded-lg shadow lg:mx-0">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl">
        Add profile for family member
      </h2>
      <dl className="mt-2 text-sm font-medium text-gray-500">
        <div className="flex flex-col mt-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {relatives.length > 0 ? (
              <span>Your Family Members</span>
            ) : (
              <span>No relatives found</span>
            )}
          </h2>
          {relatives.length > 0 &&
            relatives?.map((relative, index) => (
              <FamilyProfileCard key={relative.id} {...relative} />
            ))}
          <p className="text-sm font-normal text-gray-500">
            You can add profile for your family members if their age is below 15
            or above 60 or don&apos;t have access to a
            smartphone/computer/internet.
          </p>

          <div className="flex justify-center px-4 py-3 text-right bg-white sm:px-16">
            <Link href="/citizen/add-relative">
              <span className="inline-flex justify-center w-full max-w-lg py-2 text-sm font-medium text-gray-50 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add relative
              </span>
            </Link>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default FamilyProfile;
