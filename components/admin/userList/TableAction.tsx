import React, { Dispatch, useState } from 'react';

import CommadPalette from '@components/common/CommandPalette';
import Filter from './Filter';
import Link from 'next/link';
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import { PlusIcon } from '@heroicons/react/solid';
import Search from '../Search';

export const projects = [
  {
    id: 1,
    title: 'GraphQl API',
    team: 'Engineering',
  },
  {
    id: 2,
    title: 'New Benefits Plan',
    team: 'Human Resources',
  },
  {
    id: 3,
    title: 'Onboarding Emails',
    team: 'Customer Success',
  },
  {
    id: 4,
    title: 'iOS App',
    team: ' Engineering',
  },
  {
    id: 5,
    title: 'Marketting Site Redesign',
    team: 'Engineering',
  },
  {
    id: 6,
    title: 'Hire CFO',
    team: 'Human Resources',
  },
  {
    id: 7,
    title: 'Android App',
    team: 'Engineering',
  },
  {
    id: 8,
    title: 'New Customer Portal',
    team: 'Engineering',
  },
  {
    id: 9,
    title: 'Co-op Program',
    team: 'Human Resources',
  },
  {
    id: 10,
    title: 'Co-op Program',
    team: 'Human Resources',
  },
  {
    id: 11,
    title: 'Co-op Program',
    team: 'Human Resources',
  },
  {
    id: 12,
    title: 'Co-op Program',
    team: 'Human Resources',
  },
];
const TableAction: React.FC<{
  nocRegisteredCitizen: NocDetailTypes[];
  setNocRegisteredCitizen: Dispatch<NocDetailTypes[]>;
}> = ({ nocRegisteredCitizen, setNocRegisteredCitizen }) => {
  const [searchBar, setSearchBar] = useState(false);

  return (
    // <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-4">
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* <!-- Delete button --> */}
      <div
        className={`table-items-action 
        ${!1 ? `block` : `hidden`}
        
        `}
      >
        <div className="flex items-center">
          <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
            <span className="table-items-count"></span> items selected
          </div>
          <button className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600">
            Delete
          </button>
        </div>
      </div>

      <div className="">
        <Search searchBar={searchBar} setSearchBar={setSearchBar} />
      </div>
      {/* <CommadPalette
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        projects={projects}
      /> */}

      {/* <!-- Dropdown --> */}
      <div className="relative " x-data="{ open: false, selected: 2 }">
        <Filter setNocRegisteredCitizen={setNocRegisteredCitizen} />
      </div>

      <div className="mt-1">
        {/* <Link href="/admin/register-new-noc"> */}
        <button
          onClick={() => setSearchBar(true)}
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-2 md:px-4 md:text-medium"
        >
          <PlusIcon className="h-5 w-5 -ml-2 mr-2" />
          <span>Register new NOC</span>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default TableAction;
