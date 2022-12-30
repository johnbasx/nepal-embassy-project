import {
  BellIcon,
  MenuAlt2Icon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { SideBarProps, classNames } from './SideBar';

import { removeAccessToken } from '@store/adminAuthStore';
import { useRouter } from 'next/router';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/employee-login' },
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

const HeadNav = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {
  const router = useRouter();
  const handleSignOut = () => {
    removeAccessToken();
    router.push('/employee-login');
    router.reload();
  };
  return (
    <>
      <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="flex justify-end flex-1 px-6">
          <div className="flex items-center ml-4 md:ml-6">
            {/* Notification Menu */}
            <Menu as="div" className="relative ml-4">
              <div>
                <Menu.Button className="flex items-center max-w-xs text-sm text-gray-600 rounded-full">
                  <span className="sr-only">Open notifications menu</span>
                  <BellIcon className="h-7 w-7" aria-hidden="true" />
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
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
                <Menu.Items className="absolute py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg -right-4 w-72 md:w-80 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="text-sm font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
                    NOTIFICATIONS
                    <span className="ml-2 text-xs font-normal text-red-300 lowercase">
                      (experimental)
                    </span>
                  </div>
                  {notification.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <a
                          className="block px-4 py-2 hover:bg-gray-50"
                          href="#0"
                        >
                          <span className="block mb-2 text-sm">
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
            </Menu>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-4 right-10">
              <div>
                <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="stroke-2 text-slate-700 w-7 h-7" />
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
                <Menu.Items className="absolute w-48 py-1 mt-4 text-left origin-top-right bg-white rounded-md shadow-xl right-6 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => router.push('/embassy-employee/profile')}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm cursor-pointer text-gray-700'
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
                          'block px-4 py-2 w-full text-left text-sm text-gray-700'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
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
