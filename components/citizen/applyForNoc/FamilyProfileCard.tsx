import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';

import Link from 'next/link';
import React from 'react';
import { RelativeProfileProps } from './FamilyProfile';

// import { TbUserPlus } from 'react-icons/tb';

const FamilyProfileCard = ({ ...relative }: RelativeProfileProps) => {
  return (
    <div className="">
      <article className="p-3 bg-white border border-blue-100 rounded-xl sm:p-4">
        <div className="flex items-start space-x-2">
          <div className="flex items-center justify-center py-1">
            {relative.gender === 'Female' ? (
              <FcBusinesswoman className="w-6 h-6 text-blue-600" />
            ) : (
              <FcBusinessman className="w-6 h-6 text-blue-600" />
            )}
          </div>

          <div className="text-gray-700">
            <h3 className="text-lg font-medium cursor-pointer">
              {relative.full_name}
            </h3>

            <p className="text-sm text-gray-700">{relative.gender}</p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center text-gray-500">
                <p className="text-xs font-medium">
                  Relationship: {relative.relationship}
                </p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                DOB: {relative.dob}
              </p>
            </div>
            <div className="mt-2">
              <Link href={`/citizen/apply-relative-noc/${relative.id}`}>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 shadow-sm font-base rounded-2xl text-white hover:text-gray-900 bg-blue-600 hover:bg-gray-50 focus:outline-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:text-xs"
                >
                  Apply NOC
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FamilyProfileCard;
