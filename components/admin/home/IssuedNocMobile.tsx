import { CashIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { IssuedNocsProps } from './IssuedNocs';
import Link from 'next/link';
import React from 'react';

const IssuedNocMobile = ({
  recentlyIssuedNocs,
}: {
  recentlyIssuedNocs: IssuedNocsProps[];
}) => {
  return (
    <div className="shadow sm:hidden bg-white rounded-md">
      <h3 className="mx-auto pt-3 mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-0">
        Recent NOC issued
      </h3>
      <ul
        role="list"
        className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
      >
        {recentlyIssuedNocs.map((detail) => (
          <li key={'recently_issued_noc' + detail.id}>
            <a href="!#" className="block px-4 py-4 bg-white hover:bg-gray-50">
              <span className="flex items-center space-x-4">
                <span className="flex-1 flex space-x-2 truncate">
                  <CashIcon
                    className="flex-shrink-0 h-5 w-5 text-blue-700"
                    aria-hidden="true"
                  />
                  <span className="flex flex-col text-gray-500 text-sm truncate">
                    <Link
                      href={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                    >
                      <span className="truncate text-gray-700 font-medium cursor-pointer">
                        Payment by {detail.full_name}
                      </span>
                    </Link>
                    <span>
                      <span className="text-gray-500 font-medium">
                        {detail.travel_purpose_value}
                      </span>{' '}
                    </span>
                    <time dateTime={detail.payment_upload_date}>
                      {detail.payment_upload_date}
                    </time>
                  </span>
                </span>
                <Link
                  href={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                >
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-blue-700"
                    aria-hidden="true"
                  />
                </Link>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <nav
        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="flex-1 flex justify-between">
          <Link href="/embassy-employee/nocDocList">
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-cyan-700 hover:text-cyan-900">
              View all
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default IssuedNocMobile;
