import React from 'react';

const CitizenFields = ({ title, data }: { title: string; data?: string }) => (
  <div className="sm:col-span-1">
    <dt className="text-sm font-normal text-gray-500">{title}</dt>
    <dd className="px-4 py-3 mt-1 text-base font-semibold text-gray-900 rounded-md bg-gray-50">
      {data}
    </dd>
  </div>
);

export default CitizenFields;
