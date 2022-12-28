import {
  ChevronDownIcon,
  DotsHorizontalIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import { FolderOpenIcon, TrashIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import Link from 'next/link';
import { NocDetailTypes } from '../admin/userList/UserListTable';

const DropdownMenu = (props: NocDetailTypes) => {
  // const { id } = props;
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className=" w-full rounded-md px-2 py-1 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <DotsHorizontalIcon
              className=" h-5 w-5 text-indigo-500 hover:text-indigo-700"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border">
            <div className=" ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'text-indigo-600' : 'text-gray-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                  >
                    {/* {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )} */}
                    <PencilIcon
                      aria-hidden="true"
                      className="mr-2 h-5 w-5 text-indigo-500"
                    />
                    Approved
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="">
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/embassy-employee/reviewNoc/` + 6}>
                    <button
                      className={`${
                        active ? 'text-indigo-600' : 'text-gray-800'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                    >
                      {/* {active ? (
                      <ArchiveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )} */}
                      <FolderOpenIcon
                        aria-hidden="true"
                        className="mr-2 h-5 w-5 text-green-500"
                      />
                      Reject
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'text-indigo-600' : 'text-gray-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                  >
                    {/* {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )} */}
                    <TrashIcon
                      aria-hidden="true"
                      className="mr-2 h-5 w-5 text-red-500"
                    />
                    Review
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
