import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  EmojiHappyIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { UserDetailProps } from 'pages/citizen/profile';
import { useRouter } from 'next/router';

const ProfileDetail: React.FC<{ profile: UserDetailProps | undefined }> = ({
  profile,
}) => {
  // const getRelativeProfile = () =>{

  // }
  // useEffect(() => {
  //   ge
  // }, [])

  const router = useRouter();
  return (
    <div className="flex flex-col px-6 py-6 mx-auto bg-white border rounded-lg shadow lg:mx-0">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Profile details
      </h2>
      <dl className="mt-6 text-sm font-medium text-gray-500">
        <div className="mt-2">
          <dt className="sr-only">Full Name</dt>
          <dd className="flex">
            <UserIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{profile?.full_name}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Phone number</dt>
          <dd className="flex">
            <PhoneIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{profile?.contact_number}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Email</dt>
          <dd className="flex">
            <MailIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{profile?.email}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Date of birth</dt>
          <dd className="flex">
            <CalendarIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{profile?.dob}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Profession</dt>
          <dd className="flex">
            <BriefcaseIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{profile?.profession}</span>
          </dd>
        </div>
        {/* <div className="mt-3">
              <dt className="sr-only">Email</dt>
              <dd className="flex">
                <AcademicCapIcon
                  className="flex-shrink-0 w-5 h-5 text-blue-500"
                  aria-hidden="true"
                />
                <span className="ml-3">{profile?.qualification}</span>
              </dd>
            </div> */}
        <div className="mt-3">
          <dt className="sr-only">Gender</dt>
          <dd className="flex">
            <EmojiHappyIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{profile?.gender}</span>
          </dd>
        </div>
      </dl>
      {router.pathname.includes('/citizen/') && (
        <p className="mt-6 text-sm text-gray-500">
          Need changes?{' '}
          <Link href="/citizen/profile">
            <a className="font-medium text-blue-600 underline hover:text-blue-700">
              Update here
            </a>
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default ProfileDetail;
