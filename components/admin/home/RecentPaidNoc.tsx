import { CashIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Link from 'next/link';
import { NocWithPaymentProps } from 'pages/embassy-employee/noc-with-payments';
import React from 'react';
import { TbPlaneDeparture } from 'react-icons/tb';
import VerifiedStatus from '../userList/VerifiedStatus';

const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
];
const RecentPaidNoc = ({
  recentlyPaidNocs,
}: {
  recentlyPaidNocs: NocWithPaymentProps[];
}) => {
  return (
    <>
      <h2 className="max-w-7xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-0">
        NOCs with recently uploaded payment
      </h2>
      {/* Activity list (smallest breakpoint only) */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <a
                href={transaction.href}
                className="block px-4 py-4 bg-white hover:bg-gray-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex-1 flex space-x-2 truncate">
                    <CashIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col text-gray-500 text-sm truncate">
                      <span className="truncate">{transaction.name}</span>
                      <span>
                        <span className="text-gray-900 font-medium">
                          {transaction.amount}
                        </span>{' '}
                        {transaction.currency}
                      </span>
                      <time dateTime={transaction.datetime}>
                        {transaction.date}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
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
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Next
            </a>
          </div>
        </nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Users
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Travel purpose
                    </th>

                    <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload on
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentlyPaidNocs.map((detail) => (
                    <tr key={detail.id} className="bg-white">
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <Link href={`/embassy-employee/reviewNoc/${detail.id}`}>
                          <span className="text-blue-700 font-medium cursor-pointer">
                            Payment by {detail.profile.full_name}
                          </span>
                        </Link>
                        <br />
                        {detail.profile.email}
                      </td>

                      <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a className="group inline-flex space-x-2 truncate text-sm">
                            <TbPlaneDeparture className="w-4 h-4 text-blue-700" />
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              {detail.travel_purpose_value}
                            </p>
                          </a>
                        </div>
                      </td>

                      <td className="hidden px-6 py-6 text-gray-500 md:block items-center">
                        <span className="inline-flex items-center py-0.5 rounded-full text-xs font-medium capitalize">
                          <VerifiedStatus status={detail.payment_verified} />
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <time dateTime={detail.payment_upload_date}>
                          {detail.payment_upload_date}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between sm:justify-end">
                  <Link href="/embassy-employee/noc-with-payments">
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-100 bg-blue-700 hover:bg-blue-80 cursor-pointer">
                      View all
                    </span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentPaidNoc;
