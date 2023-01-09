import { classNames } from '@utils/helpers';
import React from 'react';

export type PageNumberProps = {
  index: number;
  active?: boolean;
};

const PageNumber = ({ index, active }: PageNumberProps) => {
  return (
    <a
      href="#"
      aria-current={active ? 'page' : 'false'}
      className={classNames(
        'relative inline-flex items-center px-4 py-2 text-sm font-medium  border border-gray-300 hover:bg-gray-50 focus:z-20',
        active
          ? 'text-blue-600 border-blue-500 bg-blue-50'
          : 'text-gray-500 bg-white'
      )}
    >
      {index}
    </a>
  );
};

export default PageNumber;
