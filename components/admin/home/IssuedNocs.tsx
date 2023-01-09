import { CashIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Link from 'next/link';
import React from 'react';

export interface IssuedNocsProps {
  id: string;
  full_name: string;
  email: string;
  passport: string;
  travel_from: string;
  travel_country: string;
  reference_number: string;
  verified_on: string;
  noc_documents: string;
  verified_by: string;
  travel_purpose_value: string;
  payment_upload_date: string;
}

const IssuedNocs = ({ ...recentNoc }: IssuedNocsProps) => {
  return (
    <tr className="bg-white">
      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-medium">{recentNoc.full_name}</span>
        <br />
        {recentNoc.email}
      </td>
      <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex">
          <Link href={`/embassy-employee/reviewNoc/${recentNoc.noc_documents}`}>
            <a className="group inline-flex space-x-2 truncate text-sm">
              <CashIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <p className="text-gray-500 truncate group-hover:text-gray-900">
                {recentNoc.travel_purpose_value}
              </p>
            </a>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-medium">
          {recentNoc.verified_by}{' '}
        </span>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        {recentNoc.verified_on}
      </td>
    </tr>
  );
};

export default IssuedNocs;
