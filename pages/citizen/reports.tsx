import React, { useEffect, useState } from 'react';

import { FetchData } from '@utils/fetcher';
import Report from '@components/citizen/reports/Report';
import { ReportProps } from '@components/citizen/reports/Report';
import authStore from '@store/useAuthStore';
import { documentMessages } from '@content/api-urls';
import pageTitleStore from '../../store/selectUsersStore';

const Reports = () => {
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [messages, setMessages] = useState<ReportProps[]>();

  const getMessage = async () => {
    const returnData = await FetchData(token, documentMessages);
    setMessages(returnData);
  };
  useEffect(() => {
    getMessage();
    setPageTitle('Reports for document');
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-4 py-4 px-2">
      {messages?.length != 0 ? (
        messages?.map((message, index) => (
          <Report key={message.id} {...message} />
        ))
      ) : (
        <>
          <p>No Reports</p>{' '}
        </>
      )}
    </div>
  );
};

export default Reports;
