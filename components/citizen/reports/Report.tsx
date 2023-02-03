import Link from 'next/link';
import React from 'react';

export interface ReportProps {
  created_at: string;
  doc_created_date: string;
  doc_id: string;
  id: string;
  message: string;
  message_sender: string;
  receiver: string;
  sender: number;
  travel_country: string;
  travel_from: string;
}

const Report: React.FC<ReportProps> = ({ ...message }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Report for NOC applied on{' '}
          <span className="font-bold text-blue-700">
            {message.doc_created_date}
          </span>
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{message.message}</p>
        </div>
        <div className="mt-5 text-sm">
          <Link href={`/citizen/noc-detail/${message.doc_id}`}>
            <a className="font-medium rounded-md py-2 px-3 bg-blue-600 text-white hover:bg-blue-500 duration-200">
              View document
              <span className="ml-1" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Report;
