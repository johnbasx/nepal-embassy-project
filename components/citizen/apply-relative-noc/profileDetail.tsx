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

import { BASE_URL } from '@content/api-urls';
import { FetchData } from '@utils/fetcher';
import Link from 'next/link';
import { RelativeProfileProps } from '@components/citizen/applyForNoc/FamilyProfile';
import { UserDetailProps } from 'pages/citizen/profile';
import authStore from '@store/useAuthStore';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const ProfileDetail = ({ relativeId }: { relativeId: string }) => {
  const { token } = authStore();

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery<
    RelativeProfileProps,
    Error
  >('relativeProfile', () =>
    FetchData(token, BASE_URL + 'getRelativeProfile/' + relativeId)
  );
  // const profile = data;

  const router = useRouter();
  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching Data...</p>;
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
            <span className="ml-3">{data?.full_name}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Phone number</dt>
          <dd className="flex">
            <PhoneIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{data?.contact_number}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Email</dt>
          <dd className="flex">
            <MailIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{data?.email}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Date of birth</dt>
          <dd className="flex">
            <CalendarIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{data?.dob}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Profession</dt>
          <dd className="flex">
            <BriefcaseIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{data?.profession}</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Gender</dt>
          <dd className="flex">
            <EmojiHappyIcon
              className="flex-shrink-0 w-5 h-5 text-blue-500"
              aria-hidden="true"
            />
            <span className="ml-3">{data?.gender}</span>
          </dd>
        </div>
      </dl>
      {router.pathname.includes('/citizen/') && (
        <p className="mt-6 text-sm text-gray-500">
          Need changes?{' '}
          <Link href={'/citizen/relative-profile/' + relativeId}>
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
