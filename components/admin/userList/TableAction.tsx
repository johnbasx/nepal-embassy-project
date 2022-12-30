import React, { Dispatch, useState } from 'react';

import CommadPalette from '@components/common/CommandPalette';
import Filter from './Filter';
import Link from 'next/link';
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import { ArrowRightIcon, PlusIcon, SearchIcon } from '@heroicons/react/solid';
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
    // <div className="grid justify-start grid-flow-col gap-4 sm:auto-cols-max sm:justify-end">
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* <!-- Delete button --> */}
      <div
        className={`table-items-action 
        ${!1 ? `block` : `hidden`}
        
        `}
      >
        <div className="flex items-center">
          <div className="hidden mr-2 text-sm italic xl:block whitespace-nowrap">
            <span className="table-items-count"></span> items selected
          </div>
          <button className="text-red-500 bg-white border-gray-200 btn hover:border-gray-300 hover:text-red-600">
            Delete
          </button>
        </div>
      </div>

      <div>
        <Search searchBar={searchBar} setSearchBar={setSearchBar} />
      </div>
      {/* <CommadPalette
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        projects={projects}
      /> */}

      {/* <!-- Dropdown --> */}
      <div className="flex items-center justify-end space-x-4">
        <button
          onClick={() => setSearchBar(true)}
          className="flex items-center justify-center px-4 py-2 text-sm text-gray-600 duration-150 bg-white rounded-full shadow hover:bg-blue-700/10 hover:text-blue-800"
        >
          <SearchIcon className="w-4 h-4 mr-1" />
          Search
        </button>
        <div className="relative">
          <Filter setNocRegisteredCitizen={setNocRegisteredCitizen} />
        </div>
      </div>

      <div className="mt-1">
        <button
          onClick={() => setSearchBar(true)}
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-2 md:px-4 md:text-medium"
        >
          {/* <PlusIcon className="w-4 h-4 mr-2 -ml-2" /> */}
          <span>Register new NOC</span>
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TableAction;
