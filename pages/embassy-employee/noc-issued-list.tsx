import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import {
  TableCellBody,
  TableCellHead,
} from '@components/admin/userList/TableComponents';

import { BASE_URL } from '@content/api-urls';
import { FetchData } from '@utils/fetcher';
import { IssuedNocsProps } from '@components/admin/home/IssuedNocs';
import authStore from '@store/adminAuthStore';
import { classNames } from '@utils/helpers';

export const tableHeaders = [
  'Name',
  'Email',
  'Travel From',
  'Travel Country',
  'travel_purpose_value',
  'Passport No.',
  'Issued on',
  'Issued by',
];
const NocIssuedList = () => {
  const { token } = authStore();
  const [total, setTotal] = useState(0);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');
  const [nocIssuedList, setNocIssuedList] = useState<IssuedNocsProps[]>([]);
  const getNocIssuedList = async () => {
    const data = await FetchData(token, BASE_URL + 'nocIssuedList');
    setTotal(data.count);
    setNext(data.next);
    setPrev(data.prev);

    setNocIssuedList(data.results);
  };
  useEffect(() => {
    getNocIssuedList();
  }, []);

  const getPageContent = async (url: string) => {
    if (url == undefined) {
      return;
    }
    try {
      const data = await FetchData(token, url);
      setTotal(data.count);
      setNext(data.next);
      setPrev(data.prev);
      setNocIssuedList(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="py-6">
      <div className="relative flex flex-col flex-1 px-4 mx-auto overflow-x-hidden overflow-y-auto sm:px-6 md:px-8">
        <div className="flex flex-col justify-between py-6 md:flex-row md:items-center gap-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">Issued NOCs</h1>
        </div>
        <div className="bg-white border-gray-200 rounded-lg shadow-lg">
          <header className="px-5 py-4">
            <h2 className="font-semibold text-gray-800">
              Total -{' '}
              <span className="text-sm font-medium text-gray-500">
                {total} {total > 1 ? 'NOCs' : 'NOC'}
              </span>
            </h2>
          </header>
          <div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-200 bg-gray-50">
                  <tr className="divide-x">
                    {/* <TableAllSelector /> */}
                    {tableHeaders.map((label: string, index) => (
                      <TableCellHead
                        label={label}
                        key={'Tabel Cell Head' + index}
                      />
                    ))}
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <span className="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-gray-200">
                  {nocIssuedList?.map((detail, index) => (
                    <tr
                      key={detail.id}
                      className="cursor-pointer"
                      // onClick={(e) => {
                      //   reviewNoc(detail.id, index);
                      // }}
                    >
                      {/* <TableIndividualSelector detail={detail} /> */}
                      <TableCellBody
                        data={detail.full_name}
                        unique
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />
                      <TableCellBody
                        data={detail.email}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />
                      <TableCellBody
                        data={detail.travel_from?.toString()}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />
                      <TableCellBody
                        data={detail.travel_country}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />

                      <TableCellBody
                        data={detail.travel_purpose_value}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />

                      <TableCellBody
                        data={detail.passport}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />
                      <TableCellBody
                        data={detail.verified_on}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />
                      <TableCellBody
                        data={detail.verified_by}
                        link={`/embassy-employee/reviewNoc/${detail.noc_documents}`}
                      />
                    </tr>
                  ))}
                  <tr className="h-28">
                    <td></td>
                  </tr>
                </tbody>
              </table>

              {/* Paginations */}
              <div className="flex items-center justify-center py-6">
                <div>
                  <nav
                    className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => {
                        getPageContent(prev);
                      }}
                      className={classNames(
                        prev
                          ? 'text-blue-700 hover:bg-gray-50 focus:z-20'
                          : 'cursor-not-allowed',
                        'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md '
                      )}
                    >
                      <span className="sr-only">Previous</span>

                      <ChevronLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>

                    <button
                      onClick={() => {
                        // setSelectedUsers([]);
                        getPageContent(next);
                      }}
                      className={classNames(
                        next
                          ? 'text-blue-700 hover:bg-gray-50 focus:z-20'
                          : 'cursor-not-allowed',
                        'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md '
                      )}
                    >
                      <span className="sr-only">Next</span>

                      <span>Next</span>
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NocIssuedList;
