import Link from 'next/link';
import React from 'react';

export interface EmptyDataProps {
  content: string;
  link: string;
  linkContent: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({
  content,
  link,
  linkContent,
}) => {
  return (
    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-20">
      <div className="max-w-max mx-auto">
        <div className="sm:ml-6">
          <div className="sm:pl-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight ">
              {content}
            </h1>
          </div>
          <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Link href={link}>
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {linkContent}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyData;
