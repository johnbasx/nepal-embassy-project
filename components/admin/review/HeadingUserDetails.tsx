import { nocDocumentType } from '@utils/interface';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { TbFileImport, TbPlaneDeparture } from 'react-icons/tb';

interface HeadingUserDetailsProps extends Partial<nocDocumentType> {}

const HeadingUserDetails = ({ ...detail }: HeadingUserDetailsProps) => {
  return (
    <div className="flex-1">
      <h3 className="text-xl font-bold text-gray-700">NOC detail for -</h3>

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
