import {
  AnnotationIcon,
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
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
    href: '/citizen/profile',
    icon: HomeIcon,
    current: true,
  },

  {
    name: 'Apply for NOC',
    href: '/citizen/apply-for-noc',
    icon: InboxIcon,
    current: false,
  },
  {
    name: 'Get NOC',
    href: '/citizen/get-noc',
    icon: FolderIcon,
    current: false,
  },
  {
    name: 'NOC reports',
    href: '/citizen/reports',
    icon: AnnotationIcon,
    current: false,
  },
  {
    name: 'File reports',
    href: '/citizen/report-for-file',
    icon: DocumentTextIcon,
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
          className="fixed inset-0 flex z-40 md:hidden"
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
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center ">
                <div className="relative h-14 w-full">
                  <Image
                    objectFit="contain"
                    layout="fill"
                    src="/images/np-logo.png"
                    alt="nepalEmbassyLogo"
                  />
                </div>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        router.pathname == '/' + item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          router.pathname == '/' + item.href
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
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex items-center bg-slate-800 h-16 flex-shrink-0 px-4">
            <div className="relative py-1 h-12 w-full">
              <Image
                objectFit="contain"
                layout="fill"
                src="/images/np-logo.png"
                alt="nepalEmbassyLogo"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      router.pathname == item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white '
                    }`}
                    // className={classNames(
                    //   router.pathname == '/' + item.href
                    //     ? 'bg-gray-900 text-white'
                    //     : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    //   'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    // )}
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
