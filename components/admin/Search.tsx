import { Combobox, Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import React, { Dispatch } from 'react';

import { SearchIcon } from '@heroicons/react/solid';
import { searchCitizen } from '@content/api-urls';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';

export interface citizenListType {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  dob: string;
  profile_photo: string;
  age: number;
  gender: string;
  profession: string;
  qualification: string;
  fathers_name: string;
  mothers_name: string;
  fathers_qualification: string;
  mothers_qualification: string;
  created_at: Date;
  user: number;
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Search: React.FC<{
  searchBar: boolean;
  setSearchBar: Dispatch<boolean>;
}> = ({ searchBar, setSearchBar }) => {
  const [query, setQuery] = useState('');
  const [citizens, setCitizens] = useState<citizenListType[]>([]);

  const debouncedSearch = useDebounce(query, 500);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (query == '') {
        return;
      } else {
        const data = await fetch(searchCitizen + debouncedSearch).then((res) =>
          res.json()
        );
        setCitizens(data);
        console.log(data);
      }
    };
    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);

  // const gotoRegisterPage = (citizen: citizenListType) => {
  //   router.push(
  //     {
  //       pathname: '/admin/register-new-noc',
  //       query: { profile_id: citizen.id, email: citizen.email },
  //     },
  //     '/admin/register-new-noc'
  //   );
  // };
  return (
    <Transition.Root
      show={searchBar}
      as={Fragment}
      afterLeave={() => setQuery('')}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={setSearchBar}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            value={query}
            onChange={setQuery}
          >
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-0"
                placeholder="Search by citizen name and email"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {citizens.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {citizens.map((citizen) => (
                  <Combobox.Option key={citizen.id} value={citizen}>
                    {({ active }) => (
                      <div
                        onClick={() =>
                          router.push(`/admin/apply-noc/${citizen.id}`)
                        }
                        className={`space-x-1 px-4 py-2 cursor-pointer ${
                          active ? 'bg-indigo-600' : 'bg-white'
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {citizen.full_name}
                        </span>
                        <span
                          className={
                            active ? 'text-indigo-200' : 'text-gray-400'
                          }
                        >
                          {citizen.email}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {citizens.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No citizen found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Search;
