import { NocListType } from 'pages/citizen/get-noc';
import React from 'react';
import authStore from '@store/useAuthStore';
import { nocOwner } from 'pages/citizen/get-noc';
import { useRouter } from 'next/router';

const RejectedNoc: React.FC<{
  profile: nocOwner;
  travel_type: NocListType['travel_type'];
  NocId: NocListType['id'];
  ApplyDate: NocListType['created_at'];
}> = ({ profile, travel_type, NocId, ApplyDate }) => {
  const router = useRouter();
  const { token } = authStore();
  return (
    <div className="flex w-full items-center justify-between divide-x-2 divide-dashed divide-slate-200 rounded-lg border bg-white py-4 px-4 shadow-md md:px-6">
      <div className="">
        <h3>
          <span className="capitalize">{profile.full_name}&nbsp;</span>
          <span className="uppercase">{NocId?.slice(0, 8)}</span>{' '}
          <span className="text-blue-700">
            {' '}
            &nbsp;
            {travel_type} travel
          </span>
        </h3>
        <p className="text-sm text-gray-500">Applied on {ApplyDate}</p>
        <div className="mt-4 flex h-5 items-center justify-start space-x-1 text-xs text-gray-500">
          <div className="h-4 w-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-red-400"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          </div>
          <p>Documents rejected</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center space-y-2 pl-4 md:pl-12 w-[45%] md:w-[25%]">
        <button
          className="rounded-md bg-slate-700 w-full text-center py-2 text-slate-50 duration-200 hover:bg-slate-800"
          onClick={() => {
            router.push(
              {
                pathname: '/citizen/apply-for-noc',
                query: {
                  nocId: NocId,
                  token: token,
                },
              },
              '/citizen/apply-for-noc'
            );
          }}
        >
          Apply again
        </button>
        <p className="text-xs text-red-500">Submit your documents again</p>
      </div>
    </div>
  );
};

export default RejectedNoc;
