import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  EmojiHappyIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/outline';

import Link from 'next/link';
import React from 'react';
import { UserDetailProps } from 'pages/citizen/profile';
import { useRouter } from 'next/router';

const ProfileDetail: React.FC<{ profile: UserDetailProps | undefined }> = ({
  profile,
}) => {
  const router = useRouter();
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-8 xl:pr-12">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-blue-600 sm:text-2xl">
          Profile details
        </h2>
        <dl className="mt-6 text-sm font-medium text-gray-500">
          <div className="mt-6">
            <dt className="sr-only">Phone number</dt>
            <dd className="flex">
              <UserIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span className="ml-3">{profile?.full_name}</span>
            </dd>
          </div>
          <div className="mt-3">
            <dt className="sr-only">Phone number</dt>
            <dd className="flex">
              <PhoneIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span className="ml-3">{profile?.contact_number}</span>
            </dd>
          </div>
          <div className="mt-3">
            <dt className="sr-only">Email</dt>
            <dd className="flex">
              <MailIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span className="ml-3">{profile?.email}</span>
            </dd>
          </div>
          <div className="mt-3">
            <dt className="sr-only">Email</dt>
            <dd className="flex">
              <CalendarIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span className="ml-3">{profile?.dob}</span>
            </dd>
          </div>
          <div className="mt-3">
            <dt className="sr-only">Email</dt>
            <dd className="flex">
              <BriefcaseIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span className="ml-3">{profile?.profession}</span>
            </dd>
          </div>
          <div className="mt-3">
            <dt className="sr-only">Email</dt>
            <dd className="flex">
              <AcademicCapIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span className="ml-3">{profile?.qualification}</span>
            </dd>
          </div>
          <div className="mt-3">
            <dt className="sr-only">Gender</dt>
            <dd className="flex">
              <EmojiHappyIcon
                className="flex-shrink-0 h-5 w-5 text-blue-500"
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
              <a className="font-medium text-blue-600 hover:text-blue-700 underline">
                Update here
              </a>
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetail;
