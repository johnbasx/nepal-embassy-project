import * as Icons from 'react-icons/hi';

import Link from 'next/link';
import React from 'react';

export interface DataOverviewProps {
  icon: string;
  title: string;
  total: number;
}

const DynamicFaIcon: React.FC<{ name: string }> = ({ name }) => {
  //  Icons = Array<string>()
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Return a default one
    return <Icons.HiMap />;
  }

  return <IconComponent className="text-blue-800 text-3xl" />;
};

const viewAll = (title: string): string => {
  return title == 'NOC applied'
    ? '/embassy-employee/nocDocList'
    : title == 'NOC issued'
    ? '/embassy-employee/noc-issued'
    : '/embassy-employee/registered-for-noc';
};

const OverViewCard: React.FC<DataOverviewProps> = ({ icon, title, total }) => {
  return (
    <div
      // key={card.name}
      className="bg-white overflow-hidden shadow rounded-lg"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <DynamicFaIcon name={icon} />
            {/* <DynamicFaIcon /> */}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{total}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <Link href={viewAll(title)}>
            <a
              // href={card.href}
              className="font-medium text-cyan-700 hover:text-cyan-900"
            >
              View all
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverViewCard;
