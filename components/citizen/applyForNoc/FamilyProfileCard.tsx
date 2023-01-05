import React from 'react';
import { TbUserPlus } from 'react-icons/tb';

const FamilyProfileCard = () => {
  return (
    <div className="">
      <article className="p-3 bg-white border border-blue-100 rounded-xl sm:p-4">
        <div className="flex items-start space-x-2">
          <div className="flex items-center justify-center py-1">
            <TbUserPlus className="w-6 h-6 text-blue-600" />
          </div>

          <div className="text-gray-700">
            <h3 className="text-lg font-medium">Laxmi Aryal</h3>

            <p className="text-sm text-gray-700">Female</p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center text-gray-500">
                <p className="text-xs font-medium">Relationship: Daughter</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                DOB: 2005/06/02
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FamilyProfileCard;
