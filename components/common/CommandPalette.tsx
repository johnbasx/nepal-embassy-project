import { Combobox, Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import { SearchIcon } from '@heroicons/react/outline';

interface SearchItemProps {
  id: number;
  title: string;
  team: string;
}

interface SearchProps {
  searchBar: boolean;
  setSearchBar: (toggle: boolean) => void;
  projects: SearchItemProps[];
}

const CommadPalette = ({ searchBar, setSearchBar, projects }: SearchProps) => {
  // const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState('');

  const filterProjects = query
    ? projects.filter((project: SearchItemProps) =>
        project.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  return (
    <Transition.Root show={searchBar} as={Fragment}>
      <Dialog
        as="div"
        // open={searchBar}
        onClose={setSearchBar}
        className=" absolute h-screen bg-sky-400 inset-0 overflow-y-auto p-4 pt-[25vh"
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
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Combobox
            // onChange={() => {
            //   // nevigate user to selected project
            // }}
            value={searchBar}
            onChange={setSearchBar}
            as="div"
            className="relative mx-auto max-w-xl bg-white rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-300 overflow-hidden"
          >
            <div className="flex items-center px-4">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                className="h-12 w-full border-0 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:ring-0"
                placeholder="Search..."
              />
            </div>
            {filterProjects.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filterProjects.map((project) => (
                  <Combobox.Option value={searchBar} key={project.id}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 px-4 py-2 ${
                          active ? 'bg-indigo-600' : 'bg-white'
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {project.title}
                        </span>
                        <span
                          className={
                            active ? 'text-indigo-200' : 'text-gray-400'
                          }
                        >
                          in {project.team}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filterProjects.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No result found</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommadPalette;
