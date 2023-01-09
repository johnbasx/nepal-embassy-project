import { NocListType } from 'pages/citizen/get-noc';
import React from 'react';
import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';

const VerifiedNoc: React.FC<{
  NocType: NocListType['noc_type'];
  NocId: NocListType['id'];
  ApplyDate: NocListType['created_at'];
}> = ({ NocType, NocId, ApplyDate }) => {
  const router = useRouter();
  const { token } = authStore();
  return (
    <div className="flex w-full items-center justify-between divide-x-2 divide-dashed divide-slate-200 rounded-lg border bg-white py-4 px-4 shadow-md md:px-6">
      <div>
        <h3 className="">
          NOC-Doc-{NocType}-{NocId}
        </h3>
        <p className="text-sm text-gray-500">Applied on {ApplyDate}</p>
        <div className="mt-4 flex items-center justify-start space-x-1 text-xs text-gray-500">
          <div className="h-4 w-4 rounded-full text-xs text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-teal-500"
              viewBox="0 0 512 512"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337l-17 17-17-17-64-64-17-17L160 222.1l17 17 47 47L335 175l17-17L385.9 192l-17 17z" />
            </svg>
          </div>
          <p>Documents verification completed</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center space-y-2 pl-4 md:pl-12 w-[45%] md:w-[25%]">
        <button
          onClick={() => {
            router.push(
              {
                pathname: '/citizen/download-noc',
                query: {
                  nocId: NocId,
                  token: token,
                },
              },
              '/citizen/download-noc'
            );
          }}
          className="rounded-md bg-slate-700 w-full text-center py-2 text-white duration-200 hover:bg-indigo-600"
        >
          Download Now
        </button>
        <p className="text-xs text-teal-500">Your NOC document is ready</p>
      </div>
    </div>
  );
};

export default VerifiedNoc;
