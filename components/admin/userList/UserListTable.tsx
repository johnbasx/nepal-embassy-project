import React, { useEffect, useState } from 'react';

import Button from '@components/common/Button';
import DropdownMenu from '@components/common/DropdownMenu';
import { FastForwardIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';

export interface NocDetailTypes {
  id: string;
  full_name: string;
  email: string;
  dob: string;
  age: string;
  district: string;
  province: string;
  passport_number: number;
  travel_from: string;
  travel_country: string;
  travel_purpose_value: string;
  verified_status?: string;
  travel_date: string;
  return_date: string;
  created_at: string;
}

const UserListTable: React.FC<{
  nocRegisteredCitizen: NocDetailTypes[];
  loadNextPage: (url: string) => void;
  total: number;
  nextPage: string;
  prevPage: string;
}> = ({ nocRegisteredCitizen, loadNextPage, total, nextPage, prevPage }) => {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<NocDetailTypes['id'][]>(
    []
  );

  function selectAll(checked: boolean) {
    const checkBoxes = document.querySelectorAll(
      'input.table-item'
    ) as NodeListOf<HTMLInputElement>;

    if (checked) {
      checkBoxes.forEach((sub) => {
        if (selectedUsers.indexOf(sub.id) === -1) {
          sub.checked = true;
          selectedUsers.push(sub.id);
        }
      });
    } else {
      checkBoxes.forEach((sub) => (sub.checked = false));
      setSelectedUsers([]);
    }
  }

  function onChangeHandler(id: NocDetailTypes['id'], checked: boolean) {
    const parentCheckbox = document.getElementById(
      'parent-checkbox'
    ) as HTMLInputElement;
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
      // printselected();
    } else {
      setSelectedUsers(selectedUsers.filter((newUsers) => newUsers !== id));

      if (parentCheckbox.checked) {
        parentCheckbox.checked = false;
      }
    }
  }

  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  function reviewNoc(uid: NocDetailTypes['id'], index: number) {
    // console.log('review ' + index);
  }

  const checkVerifiedStatus = (status: string | undefined) => {
    if (status == '1') {
      return (
        <div className="text-center text-xs py-1 bg-gray-400 rounded-full font-medium text-white">
          Pending
        </div>
      );
    } else if (status == '2') {
      return (
        <div className="text-center text-xs py-1 bg-red-400 rounded-full font-medium text-white">
          Rejected
        </div>
      );
    } else if (status == '3') {
      return (
        <div className="text-center text-xs py-1 bg-green-400 rounded-full font-medium text-white">
          Approved
        </div>
      );
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg border-gray-200">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">
          Total <span className="text-gray-400 font-medium">{total}</span>
        </h2>
      </header>
      <div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        id="parent-checkbox"
                        className="form-checkbox"
                        type="checkbox"
                        onChange={(e) => {
                          selectAll(e.target.checked);
                          console.log(selectedUsers);
                        }}
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Travel Country</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Age</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Return Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Passport no.</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
                  <td
                    className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"
                    data-column="table-column"
                  >
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="sr-only">Select</span>
                        <input
                          className="table-item form-checkbox"
                          type="checkbox"
                          id={list.id}
                          onChange={(e) => {
                            onChangeHandler(list.id, e.target.checked);
                          }}
                        />
                      </label>
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    <Link href={`/embassy-employee/reviewNoc/${list.id}`}>
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">
                          {list.full_name}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    {' '}
                    <div className="text-left">{list.email}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    {' '}
                    <div className="text-left">{list.travel_country}</div>
                  </td>

                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    {' '}
                    <div className="text-left">
                      {Math.floor(moment().diff(list.dob, 'years', true))} years
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    <div className="text-center">{list.return_date}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    <div className="text-left font-medium text-light-blue-500">
                      {list.passport_number}
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap body-column">
                    {checkVerifiedStatus(list.verified_status)}
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <button className="text-gray-400 hover:text-gray-500 rounded-full">
                      <span className="sr-only">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="10" cy="16" r="2" />
                        <circle cx="22" cy="16" r="2" />
                      </svg>
                    </button>
                    {/* <DropdownMenu {...list} /> */}
                  </td>
                </tr>
              ))}
              <tr className="h-28">
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end p-4 space-x-6">
            <button
              type="button"
              className=" flex justify-center border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 "
              onClick={() => {
                setSelectedUsers([]);
                loadNextPage(prevPage);
              }}
            >
              Prev
            </button>
            <button
              type="button"
              className=" flex justify-center border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700"
              onClick={() => {
                setSelectedUsers([]);
                loadNextPage(nextPage);
              }}
            >
              <span className="">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListTable;
