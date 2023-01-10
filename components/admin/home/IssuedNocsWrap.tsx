import Link from 'next/link';
import React from 'react';

const IssuedNocsWrap = ({
  children,
  length,
}: {
  children: React.ReactNode;
  length: number;
}) => {
  return (
    <div className="hidden sm:block mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <h3 className=" text-lg leading-6 font-medium text-gray-900 ">
          Recent NOC issued
        </h3>
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
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued by
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued on
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {children}
              </tbody>
            </table>
            {length > 0 ? (
              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between sm:justify-end">
                  <Link href="/embassy-employee/nocDocList">
                    <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-100 bg-blue-700 hover:bg-blue-80">
                      View all
                    </a>
                  </Link>
                </div>
              </nav>
            ) : (
              <nav
                className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className=" flex justify-center sm:justify-end">
                  <p className="relative inline-flex justify-center text-center items-center px-4 py-2 text-base font-normal rounded-md text-gray-500 ">
                    Nothing to view
                  </p>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuedNocsWrap;
