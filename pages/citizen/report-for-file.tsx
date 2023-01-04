import React, { useEffect, useState } from 'react';

import EmptyData from '@components/common/EmptyData';
import { FetchData } from '@utils/fetcher';
import Link from 'next/link';
import authStore from '@store/useAuthStore';
import { fileMessages } from '@content/api-urls';
import pageTitleStore from '../../store/selectUsersStore';

export interface FileMessageProps {
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
const ReportForFile = () => {
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [messages, setMessages] = useState<FileMessageProps[]>();

  const Report = ({ ...message }) => {
    return (
      <div className="duration-200 bg-white border border-gray-200 rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Report for file uploaded on{' '}
            <span className="font-bold text-blue-700">
              {message.doc_created_date}
            </span>
          </h3>
          <div className="max-w-xl mt-2 text-sm text-gray-500">
            <p>{message.message}</p>
          </div>
          <div className="mt-5 text-sm">
            <Link href={`/citizen/noc-detail/${message.doc_id}`}>
              <a className="px-3 py-2 font-medium text-white duration-200 bg-blue-600 rounded-md hover:bg-blue-500">
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

  const getMessage = async () => {
    const returnData = await FetchData(token, fileMessages);
    setMessages(returnData);
  };
  useEffect(() => {
    getMessage();
    setPageTitle('Reports for files');
  }, []);
  return (
    <div className="px-2 py-4 mx-auto space-y-4 max-w-7xl">
      {messages?.length != 0 ? (
        messages?.map((message, index) => (
          <Report key={message.id} {...message} />
        ))
      ) : (
        <EmptyData
          content="No File reports reports to show"
          link="/citizen/profile"
          linkContent="Go to Profile"
        />
      )}
    </div>
  );
};

export default ReportForFile;
