import { useEffect, useState } from 'react';

import { BASE_URL } from '@content/api-urls';
import { DataOverviewProps } from '@components/admin/home/OverViewCard';
import { FetchData } from '@utils/fetcher';
import IssuedNocMobile from '@components/admin/home/IssuedNocMobile';
import IssuedNocs from '@components/admin/home/IssuedNocs';
import { IssuedNocsProps } from '@components/admin/home/IssuedNocs';
import IssuedNocsWrap from '@components/admin/home/IssuedNocsWrap';
import OverViewCard from '@components/admin/home/OverViewCard';
import RecentPaidNoc from '@components/admin/home/RecentPaidNoc';
import authStore from '@store/adminAuthStore';
import { nocDocumentType } from '@utils/interface';

// import { NocDetailTypes } from '@components/admin/userList/UserListTable';

export default function Example() {
  const { token } = authStore();
  const [dataOverview, setDataOverview] = useState<DataOverviewProps[]>([]);
  const [recentlyIssuedNocs, setRecentlyIssuedNocs] = useState<
    IssuedNocsProps[]
  >([]);
  const [recentlyPaidNocs, setRecentlyPaidNocs] = useState<nocDocumentType[]>(
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
    <div className="px-8">
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <div className=" mx-auto px-4 sm:px-6 lg:px-0">
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

          <IssuedNocMobile recentlyIssuedNocs={recentlyIssuedNocs} />
          <IssuedNocsWrap length={recentlyIssuedNocs.length}>
            {recentlyIssuedNocs?.map((recentNoc) => (
              <IssuedNocs key={recentNoc.id} {...recentNoc} />
            ))}
          </IssuedNocsWrap>

          <RecentPaidNoc />
        </div>
      </main>
    </div>
  );
}
