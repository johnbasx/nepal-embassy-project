import { useEffect, useState } from 'react';

import { BASE_URL } from '@content/api-urls';
import { FetchData } from '@utils/fetcher';
import Link from 'next/link';
import authStore from '@store/adminAuthStore';

export interface NocWithPaymentProps {
  id: string;
  full_name: string;
  email: string;
  dob: string;
  travel_purpose_value: string;
  payment_screen_shot: string;
  payment_verified: string;
}

const NocWithPayments = () => {
  const [nocWithPayments, setnocWithPayments] = useState<NocWithPaymentProps[]>(
    []
  );
  const { token } = authStore();

  useEffect(() => {
    const url = BASE_URL + 'getNocWithPayment';
    const getNocWithPayment = async () => {
      const data = await FetchData(token, url);
      setnocWithPayments(data);
    };

    getNocWithPayment();
  }, []);

  return (
    <div className="flex flex-col m-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="flex flex-col justify-between py-6 md:flex-row md:items-center gap-y-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Applied NOCs with payments
              </h1>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Travel Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nocWithPayments?.map((detail) => (
                  <tr key={detail.email}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link href={`/embassy-employee/reviewNoc/${detail.id}`}>
                        <a className="cursor-pointer text-indigo-900">
                          {detail.full_name}
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.travel_purpose_value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.payment_verified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        view Payment
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NocWithPayments;
