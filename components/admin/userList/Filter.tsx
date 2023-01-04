import {
  CheckIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { Dispatch } from 'react';
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import pageContentStore from '@store/pageContentStore';

const people = [
  { name: 'All' },
  { name: 'Verified' },
  { name: 'Pending' },
  { name: 'Rejected' },
];

const Filter: React.FC<{
  setNocRegisteredCitizen: Dispatch<NocDetailTypes[]>;
}> = ({ setNocRegisteredCitizen }) => {
  const { nocList } = pageContentStore();
  const [selected, setSelected] = useState(people[0]);

  const filterHandler = (name: string) => {
    if (name == 'Verified') {
      const updatedList = nocList.filter(
        (filteredList) => filteredList.verified_status == '3'
      );
      setNocRegisteredCitizen(updatedList);
      console.log(updatedList);
    } else if (name == 'Pending') {
      const updatedList = nocList.filter(
        (filteredList) => filteredList.verified_status == '1'
      );
      setNocRegisteredCitizen(updatedList);
    } else if (name == 'Rejected') {
      const updatedList = nocList.filter(
        (filteredList) => filteredList.verified_status == '2'
      );
      setNocRegisteredCitizen(updatedList);
    } else if (name == 'All') {
      const updatedList = nocList;
      setNocRegisteredCitizen(updatedList);
    }
  };

  useEffect(() => {
    filterHandler(selected.name);
  }, [selected]);

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow cursor-pointer focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Filter;
