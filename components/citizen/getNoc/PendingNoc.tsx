import Link from 'next/link';
import { NocListType } from 'pages/citizen/get-noc';
import React from 'react';
import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';

const PendingNoc: React.FC<{
  nocId: NocListType['id'];
  NocType: NocListType['noc_type'];
  NocId: NocListType['id'];
  ApplyDate: NocListType['created_at'];
  paymentScreenShot: NocListType['payment_screen_shot'];
}> = ({ nocId, NocType, NocId, ApplyDate, paymentScreenShot }) => {
  const router = useRouter();
  const { token } = authStore();
  return (
    <div className="flex w-full items-center justify-between divide-x-2 divide-dashed divide-slate-200 rounded-lg border bg-white py-4 px-4 shadow-md md:px-6">
      <div className="pr-1">
        <Link href={`/citizen/noc-detail/${nocId}`}>
          <a>
            NOC-Doc-{NocType}-{NocId}
          </a>
        </Link>
        <p className="text-sm text-gray-500">Applied on {ApplyDate}</p>
        <div className="mt-4 flex h-5 items-center justify-start space-x-1 text-xs text-gray-500">
          <div className="h-4 w-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-slate-400"
            >
              <path d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>
          </div>
          <p>Documents verification pending</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center space-y-2 pl-4 md:pl-12 w-[45%] md:w-[25%]">
        <button
          disabled
          className="cursor-not-allowed rounded-md bg-slate-300 w-full text-center py-2 text-slate-50 duration-200 hover:bg-slate-300"
        >
          Download Now
        </button>
        <p className="text-xs text-gray-500">
          {paymentScreenShot === null
            ? 'Upload payment screen shot '
            : 'Your NOC is not ready'}
        </p>
      </div>
    </div>
  );
};

export default PendingNoc;
