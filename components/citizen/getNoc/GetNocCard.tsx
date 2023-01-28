import authStore from '@store/useAuthStore';
import Link from 'next/link';
import React from 'react';
import { NocDetailTypes } from '@utils/interface';
import { classNames } from '@utils/helpers';
import { HiBadgeCheck } from 'react-icons/hi';
import { BiErrorCircle, BiTime } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { TbArrowRight, TbEye } from 'react-icons/tb';

let relative = {
  id: 1,
  gender: 'Female',
  full_name: 'MySon T',
  relationship: 'Son',
  dob: '2003/02/02',
};

export interface NocDetailsProps extends Partial<NocDetailTypes> {
  payment_screen_shot?: string | null;
}
const GetNocCard = ({ ...detail }: NocDetailsProps) => {
  const router = useRouter();

  const { token } = authStore();

  return (
    <article className="p-3 bg-white border border-slate-200 rounded-xl sm:p-4">
      {/* <Link href={`/citizen/noc-detail/${detail.id}`}> */}
      <div className="flex items-start space-x-3">
        <div className="flex items-center justify-center py-1">
          {detail.verified_status == '1' && (
            <BiTime className="w-8 h-8 text-yellow-400 rounded-full" />
          )}
          {detail.verified_status == '2' && (
            <BiErrorCircle className="w-8 h-8 rounded-full text-rose-500" />
          )}
          {detail.verified_status == '3' && (
            <HiBadgeCheck className="w-8 h-8 rounded-full text-emerald-500" />
          )}
        </div>

        <div className="grid w-full grid-cols-1 text-gray-700">
          <Link href={`/citizen/noc-detail/${detail.id}`}>
            <span className="text-lg font-bold uppercase transition duration-150 cursor-pointer hover:text-blue-600">
              {detail.id?.slice(0, 8)}
            </span>
          </Link>

          <p className="text-gray-700">{detail.profile?.full_name}</p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <div className={classNames('flex items-center')}>
              <p
                className={classNames(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  detail.travel_type == 'Connecting'
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-sky-100 text-sky-700'
                )}
              >
                {detail.travel_type} travel
              </p>
            </div>

            <span
              className="hidden text-lg font-bold sm:block"
              aria-hidden="true"
            >
              &middot;
            </span>

            <p className="mt-2 text-xs text-gray-600 sm:mt-0">
              Applied on: {detail.travel_date}
            </p>
          </div>
          <div className="mt-2">
            <div className="flex space-x-2">
              <Link href={`/citizen/noc-detail/${detail.id}`}>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 space-x-1 text-sm font-medium text-gray-600 transition duration-150 bg-gray-200 rounded-md shadow-sm hover:text-gray-700 hover:bg-gray-300 focus:outline-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:bg-slate-300 disabled:text-slate-50 disabled:cursor-not-allowed"
                >
                  <TbEye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </Link>
              <button
                onClick={() => {
                  router.push(
                    {
                      pathname: '/citizen/generate-noc',
                      query: {
                        nocId: detail.id,
                        token: token,
                      },
                    },
                    '/citizen/generate-noc'
                  );
                }}
                type="button"
                disabled={detail?.verified_status == '3' ? false : true}
                className="inline-flex items-center px-3 py-2 space-x-1 text-sm font-medium text-white transition duration-150 bg-blue-600 rounded-md shadow-sm hover:text-white hover:bg-blue-700 focus:outline-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 disabled:bg-gray-300 disabled:text-gray-50 disabled:cursor-not-allowed"
              >
                <span>Download NOC</span>
                <TbArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="mt-2">
              <p className="text-xs font-light text-gray-400">
                {detail.payment_screen_shot === null &&
                  'Pending: Please upload payment screen shot.'}
              </p>
              <p className="text-xs font-light text-emerald-500">
                {detail.payment_screen_shot != null &&
                  detail.verified_status == '3' &&
                  'Your NOC is ready for download'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </article>
  );
};

export default GetNocCard;
