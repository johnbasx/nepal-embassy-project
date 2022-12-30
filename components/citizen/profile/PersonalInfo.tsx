import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { BASE_URL } from '@content/api-urls';
import Image from 'next/image';
import Loading from '@components/common/Loading';
import { UserDetailProps } from 'pages/citizen/profile';
import authStore from '@store/useAuthStore';
import axios from 'axios';

type PersonalInfoType = Partial<UserDetailProps>;

const PersonalInfo: React.FC<PersonalInfoType> = ({
  user: userId,
  full_name: full_name,
  email,
}) => {
  const { token } = authStore();

  const [saving, setSaving] = useState<Boolean>(false);
  const [userName, setuserName] = useState(email);
  const [userEmail, setEmail] = useState(email);
  const [fullName, setFullName] = useState(full_name);

  const data = {
    username: userName,
    full_name: fullName,
    email: userEmail,
  };
  const header = {
    authorization: 'Bearer ' + token,
  };

  const UpdateUserInfo = async (e: React.MouseEvent<HTMLElement>) => {
    setSaving(true);
    e.preventDefault();
    const url = `${BASE_URL}updateUser/${userId}`;
    try {
      const response = await axios.put(url, data, { headers: header });
      console.log(response);
      if (response) {
        setSaving(false);
        if (response.status == 200) {
          toast.success('Personal info updated');
        } else {
          toast.error('Unable to update personal info');
        }
      }
    } catch (e) {
      toast.error('Error while updating');
      console.log(e);
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col mt-6 lg:flex-row">
      <Toaster />
      <div className="flex-grow mt-6 lg:mt-0 lg:mr-6 lg:flex-grow-0 lg:flex-shrink-0">
        <div className="mt-1 lg:hidden">
          <div className="flex items-center">
            <div
              className="flex-shrink-0 inline-block w-12 h-12 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <div className="relative">
                <Image
                  objectFit="contain"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full"
                  src="/images/logo-only.jpg"
                  alt="embassy-logo"
                />
              </div>
            </div>
            {/* <div className="ml-5 rounded-md shadow-sm">
              <div className="relative flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md group hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                <label
                  htmlFor="mobile-user-photo"
                  className="relative text-sm font-medium leading-4 text-gray-700 pointer-events-none"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                </label>
                <input
                  id="mobile-user-photo"
                  name="user-photo"
                  disabled
                  type="file"
                  className="absolute w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="relative hidden overflow-hidden rounded-full lg:block">
          <div className="relative">
            <Image
              objectFit="contain"
              width={150}
              height={150}
              src="/images/logo-only.jpg"
              alt="embassy-logo"
            />
          </div>
          {/* <label
            htmlFor="desktop-user-photo"
            className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
          >
            <span>Change</span>
            <span className="sr-only">user photo</span>
            <input
              type="file"
              id="desktop-user-photo"
              name="user-photo"
              disabled
              className="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
            />
          </label> */}
        </div>
      </div>

      <div className="flex-grow space-y-6">
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="user-name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="user-name"
              disabled
              id="user-name"
              autoComplete="user-name"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              onChange={(e) => setuserName(e.target.value)}
              defaultValue={email}
            />
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              disabled
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              onChange={(e) => setFullName(e.target.value)}
              defaultValue={fullName}
            />
          </div>
        </div>
        <div className="flex items-center justify-end px-2 pb-6">
          {!saving ? (
            <button
              onClick={(e) => UpdateUserInfo(e)}
              className="w-auto px-8 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 md:py-1 md:text-base"
            >
              Save
            </button>
          ) : (
            <SavingButton />
          )}
        </div>
      </div>
    </div>
  );
};

const SavingButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-auto px-4 py-4 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-1 md:text-base"
    >
      <Loading />
      Saving
    </button>
  );
};

export default PersonalInfo;
