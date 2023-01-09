import { useEffect, useState } from 'react';

import { BASE_URL } from '@content/api-urls';
import { DataOverviewProps } from '@components/admin/home/OverViewCard';
import { FetchData } from '@utils/fetcher';
import IssuedNocs from '@components/admin/home/IssuedNocs';
import { IssuedNocsProps } from '@components/admin/home/IssuedNocs';
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import OverViewCard from '@components/admin/home/OverViewCard';
import RecentPaidNoc from '@components/admin/home/RecentPaidNoc';
import authStore from '@store/adminAuthStore';

export default function Example() {
  const { token } = authStore();
  const [dataOverview, setDataOverview] = useState<DataOverviewProps[]>([]);
  const [recentlyIssuedNocs, setRecentlyIssuedNocs] = useState<
    IssuedNocsProps[]
  >([]);
  const [recentlyPaidNocs, setRecentlyPaidNocs] = useState<NocDetailTypes[]>(
    []
  );

  const getOverview = async () => {
    const data = await FetchData(token, BASE_URL + 'getDataOverview');
    setDataOverview(data);
  };

  const getRecentlyIssuedNocs = async () => {
    const data = await FetchData(token, BASE_URL + 'nocIssuedList');
    setRecentlyIssuedNocs(data.results);
  };

  const getNocsWithRecentlyUploadPayment = async () => {
    const data = await FetchData(token, BASE_URL + 'getNocWithPayment');
    setRecentlyPaidNocs(data.results);
  };
  useEffect(() => {
    getOverview();
    getRecentlyIssuedNocs();
    getNocsWithRecentlyUploadPayment();
  }, []);

  return (
    <div className="min-h-full">
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dataOverview?.map((data) => (
                <OverViewCard
                  key={data.title}
                  icon={data.icon}
                  title={data.title}
                  total={data.total}
                />
              ))}
            </div>
          </div>

          <>
            <h3 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Recent NOC issued
            </h3>
            <div className="hidden sm:block">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Citizen
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            NOC for
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
                        {recentlyIssuedNocs?.map((recentNoc) => (
                          <IssuedNocs key={recentNoc.id} {...recentNoc} />
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="flex-1 flex justify-between sm:justify-end">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-100 bg-blue-700 hover:bg-blue-80"
                        >
                          View all
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </>

          <RecentPaidNoc />
        </div>
      </main>
    </div>
  );
}
