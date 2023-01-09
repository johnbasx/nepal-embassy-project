import React, { useEffect, useState } from 'react';

import Button from '@components/common/Button';
import DropdownMenu from '@components/common/DropdownMenu';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';
import Pages from '@components/admin/pagination/Pages';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import PageNumber from '../pagination/PageNumber';
import { classNames } from '@utils/helpers';
import { BsThreeDots } from 'react-icons/bs';
import VerifiedStatus from './VerifiedStatus';
import { NocDetailTypes } from '@utils/interface';
import useSelectAll from 'hooks/useSelectAll';
import {
  TableCellHead,
  tableHeaders,
  TableCellBody,
  TableCellWrapper,
  TableAllSelector,
  TableIndividualSelector,
} from './TableComponents';

const UserListTable: React.FC<{
  nocRegisteredCitizen: NocDetailTypes[];
  loadNextPage: (url: string) => void;
  total: number;
  nextPage: string;
  prevPage: string;
}> = ({ nocRegisteredCitizen, loadNextPage, total, nextPage, prevPage }) => {
  const router = useRouter();
  const { selectAll, setSelectedUsers, onChangeHandler, selectedUsers } =
    useSelectAll();

  function reviewNoc(uid: NocDetailTypes['id'], index: number) {
    // console.log('review ' + index);
  }

  return (
    <div className="bg-white border-gray-200 rounded-lg shadow-lg">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">
          Total -{' '}
          <span className="text-sm font-medium text-gray-500">
            {total} Applications
          </span>
        </h2>
      </header>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-200 bg-gray-50">
              <tr className="divide-x">
                <TableAllSelector />
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
              {nocRegisteredCitizen?.map((list, index) => (
                <tr
                  key={list.id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    reviewNoc(list.id, index);
                  }}
                >
                  <TableIndividualSelector list={list} />
                  <TableCellBody data={list.full_name} unique docId={list.id} />
                  <TableCellBody data={list.email} docId={list.id} />
                  <TableCellBody data={list.travel_country} docId={list.id} />
                  <TableCellBody data={list.travel_type} docId={list.id} />
                  <TableCellBody
                    data={
                      Math.floor(moment().diff(list.dob, 'years', true)) +
                      ' years'
                    }
                    docId={list.id}
                  />
                  <TableCellBody
                    data={list.return_date ? list.return_date : '-'}
                    docId={list.id}
                  />
                  <TableCellBody
                    data={list.passport_number.toString()}
                    docId={list.id}
                  />
                  <TableCellBody data={list.created_at} docId={list.id} />
                  <TableCellWrapper>
                    <VerifiedStatus status={list.verified_status} />
                  </TableCellWrapper>

                  <TableCellWrapper>
                    <button className="text-gray-400 rounded-full hover:text-gray-500">
                      <span className="sr-only">Menu</span>
                      <BsThreeDots className="w-5 h-5" />
                    </button>
                  </TableCellWrapper>
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
                    setSelectedUsers([]);
                    loadNextPage(prevPage);
                  }}
                  className={classNames(
                    prevPage
                      ? 'text-blue-700 hover:bg-gray-50 focus:z-20'
                      : 'cursor-not-allowed',
                    'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md '
                  )}
                >
                  <span className="sr-only">Previous</span>

                  <ChevronLeftIcon className="w-5 h-5" />
                  <span>Prev</span>
                </button>

                {/* <PageNumber index={secondToLast(nextPage)} /> */}

                <button
                  onClick={() => {
                    setSelectedUsers([]);
                    loadNextPage(nextPage);
                  }}
                  className={classNames(
                    nextPage
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

          {/* <div className="flex justify-end p-4 space-x-6">
            <button
              type="button"
              className="flex justify-center px-4 py-1 text-sm font-medium text-blue-700 border border-transparent rounded-md shadow-sm "
              onClick={() => {
                setSelectedUsers([]);
                loadNextPage(prevPage);
              }}
            >
              Prev
            </button>
            <button
              type="button"
              className="flex justify-center px-4 py-1 text-sm font-medium text-blue-700 border border-transparent rounded-md shadow-sm "
              onClick={() => {
                setSelectedUsers([]);
                loadNextPage(nextPage);
              }}
            >
              <span className="">Next</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserListTable;
