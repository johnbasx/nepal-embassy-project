import {
  BellIcon,
  MenuAlt2Icon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { SideBarProps, classNames } from './SideBar';
import authStore, { removeAccessToken } from '@store/useAuthStore';

import Link from 'next/link';
import pageTitleStore from '@store/selectUsersStore';
import { useRouter } from 'next/router';

// import pageTitleStore from '../../../store/selectUsersStore';

const userNavigation = [
  { name: 'Your Profile', href: '/citizen/profile' },
  { name: 'Sign out', href: '!#' },
];

const notification = [
  {
    title: 'Edit your information in a swipe',
    content:
      'Sint occaecat cupidatat non proident, sunt in culpaqui officia deserunt mollit anim.',
    href: '#!',
    date: 'Feb 12, 2021',
  },
  {
    title: 'Edit your information in a swipe',
    content:
      'Sint occaecat cupidatat non proident, sunt in culpaqui officia deserunt mollit anim.',
    href: '#!',
    date: 'Feb 12, 2021',
  },
  {
    title: 'Edit your information in a swipe',
    content:
      'Sint occaecat cupidatat non proident, sunt in culpaqui officia deserunt mollit anim.',
    href: '#!',
    date: 'Feb 12, 2021',
  },
];

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

const HeadNav = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {
  const { title } = pageTitleStore();
  const router = useRouter();

  const handleSignOut = () => {
    removeAccessToken();
    router.push('/');
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="ml-6 flex items-center text-gray-500 font-medium">
          {title}
        </div>
        <div className="flex-1 px-6 flex justify-end">
          {/* <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div> */}
          <div className="ml-4 flex items-center md:ml-6">
            {/* Notification Menu */}
            {/* <Menu as="div" className="ml-4 relative">
              <div>
                <Menu.Button className="max-w-xs text-gray-900 flex items-center text-sm rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <BellIcon className="h-7 w-7 stroke-1" aria-hidden="true" />
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-400 border-2 border-white rounded-full"></div>
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
                <Menu.Items className="origin-top-right absolute -right-4 mt-2 w-72 md:w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="text-sm font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
                    NOTIFICATION
                  </div>
                  {notification.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <a
                          className="block py-2 px-4 hover:bg-gray-50"
                          href="#0"
                        >
                          <span className="block text-sm mb-2">
                            📣{' '}
                            <span className="font-medium text-gray-800">
                              {item.title}
                            </span>{' '}
                            {item.content}
                          </span>
                          <span className="block text-xs font-medium text-gray-400">
                            {item.date}
                          </span>
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu> */}

            {/* Profile dropdown */}
            <Menu as="div" className="ml-4 right-10">
              <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="w-7 h-7 stroke-1 text-gray-900" />
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
                <Menu.Items className="origin-top-right absolute right-6 mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => router.push('/citizen/profile')}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                  {/* {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link href={item.href}>
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  ))} */}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadNav;
