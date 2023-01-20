import { TbFileImport, TbPlaneDeparture } from 'react-icons/tb';

import { BiUser } from 'react-icons/bi';
import React from 'react';
import { nocDocumentType } from '@utils/interface';

interface HeadingUserDetailsProps extends Partial<nocDocumentType> {}

const HeadingUserDetails = ({ ...detail }: HeadingUserDetailsProps) => {
  return (
    <div className="flex-1">
      <h3 className="text-xl font-bold text-gray-700">
        NOC detail for -{' '}
        <span className="uppercase"> {detail.id?.slice(0, 8)}</span>
      </h3>

      <div className="py-2 space-y-1 text-sm text-blue-700">
        <div className="flex items-center space-x-2">
          <BiUser className="w-4 h-4" />
          <span>{detail?.full_name + ' (' + detail?.email + ') '}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TbPlaneDeparture className="w-4 h-4" />
          <span>{detail?.travel_type + ' Travel '}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TbFileImport className="w-4 h-4" />
          <p className="leading-6 text-blue-700 font-base">
            Applied on:{' '}
            <span className="font-semibold">{detail?.created_at}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeadingUserDetails;
