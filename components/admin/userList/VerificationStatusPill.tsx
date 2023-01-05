import { classNames } from '@utils/helpers';
import React from 'react';

const VerificationStatusPill = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => {
  return (
    <span
      className={classNames(
        `bg-${color}-200 text-${color}-900 py-1 text-[10px] font-semibold px-2 rounded-full`
      )}
    >
      {label}
    </span>
  );
};

export default VerificationStatusPill;
