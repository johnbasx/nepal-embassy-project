import {
  CalendarIcon,
  ChartBarIcon,
  CreditCardIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  {
    name: 'Home',
    href: '/embassy-employee/home',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Registered for NOC list',
    href: '/embassy-employee/citizens-registered-for-noc',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Applied NOC List',
    href: '/embassy-employee/nocDocList',
    icon: UsersIcon,
    current: false,
  },
  {
    name: 'NOCs with payment',
    href: '/embassy-employee/noc-with-payments',
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: 'NOCs issued list',
    href: '/embassy-employee/noc-issued-list',
    icon: CreditCardIcon,
    current: false,
  },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (active: boolean) => void;
}

const SideBar = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {
  const router = useRouter();

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center justify-start flex-shrink-0 px-4 py-1 mt-2">
                <div className="relative w-full h-14">
                  <Image
                    priority
                    objectFit="contain"
                    layout="fill"
                    src="/images/np-logo-02.png"
                    alt="nepalEmbassyLogo"
                  />
                </div>
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-300',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
          <div className="flex items-center justify-start flex-shrink-0 px-4 py-1 mt-2">
            <div className="relative w-full h-14">
              <Image
                priority
                objectFit="contain"
                layout="fill"
                src="/images/np-logo-02.png"
                alt="nepalEmbassyLogo"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    key={item.name}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      router.pathname == item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white '
                    }`}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
