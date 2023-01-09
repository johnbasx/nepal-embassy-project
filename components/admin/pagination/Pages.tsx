import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React from 'react';
import PageNumber from './PageNumber';

const secondToLast = (str: string) => {
  return parseInt(str.charAt(str.length - 1));
};

const Pages: React.FC = () => {
  return (
    <div>
      <nav
        className="inline-flex -space-x-px rounded-md shadow-sm isolate"
        aria-label="Pagination"
      >
        <a
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Previous</span>

          <ChevronLeftIcon className="w-5 h-5" />
          <span>Prev</span>
        </a>

        <PageNumber
          index={secondToLast('http://64.227.136.150/np/api/nocDocList?page=7')}
        />

        <a
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Next</span>

          <span>Next</span>
          <ChevronRightIcon className="w-5 h-5" />
        </a>
      </nav>
    </div>
  );
};

export default Pages;
