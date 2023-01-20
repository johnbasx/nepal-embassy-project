import { useEffect, useState } from 'react';

import { BASE_URL } from '@content/api-urls';
import { FetchData } from '@utils/fetcher';
import Link from 'next/link';
import { VerificationStatus } from 'hooks/useFileStatus';
import authStore from '@store/adminAuthStore';
import { nocOwner } from 'pages/citizen/get-noc';

export interface NocWithPaymentProps {
  id: string;
  profile: nocOwner;
  travel_purpose_value: string;
  payment_screen_shot: string;
  payment_verified: string;
  payment_upload_date: string;
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
      // console.log(data);

      setnocWithPayments(data.results);
    };

    getNocWithPayment();
  }, []);

  useEffect(() => {
    console.log(nocWithPayments);
  }, [nocWithPayments]);

  return (
    <div className="flex flex-col m-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b border-gray-200 shadow sm:rounded-lg">
            <div className="flex flex-col justify-between px-6 py-6 md:flex-row md:items-center gap-y-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Applied NOCs with payments
              </h1>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Travel Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
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
                {nocWithPayments?.map((detail, index) => (
                  <tr key={detail.profile.email + index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <Link href={`/embassy-employee/reviewNoc/${detail.id}`}>
                        <a className="text-blue-700 cursor-pointer">
                          {detail.profile.full_name}
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {detail.travel_purpose_value}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {detail.profile.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <VerificationStatus status={detail.payment_verified} />
                    </td>
                    <td className="px-2 py-4 text-sm font-medium text-center whitespace-nowrap">
                      <a
                        href="#"
                        className="px-3 py-2 text-xs text-gray-600 duration-150 bg-gray-200 rounded-md hover:text-gray-900 hover:bg-gray-300"
                      >
                        View Payment
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
