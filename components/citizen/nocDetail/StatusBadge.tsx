import React from 'react';
import { classNames } from '@utils/helpers';

export type StatusBadgeProps = {
  label: string;
  variant: string;
  className?: string;
  color?: string;
  children?: React.ReactNode;
};

export type BadgePillProps = {};

const BadgePill = ({ label, color }: Partial<StatusBadgeProps>) => {
  return (
    <span
      className={classNames(
        `bg-${color}-200 text-${color}-900 text-[10px] font-semibold px-2 rounded-full`
      )}
    >
      {label}
    </span>
  );
};

const StatusBadge = ({
  label,
  className,
  variant,
  color = 'indigo',
  children,
}: StatusBadgeProps) => {
  switch (variant) {
    case 'success':
      return <BadgePill color="green" label={label} />;
    case 'reject':
      return <BadgePill color="red" label={label} />;
    case 're-submit':
      return <BadgePill color="yellow" label={label} />;
    case 'approved':
      return <BadgePill color="blue" label={label} />;
    default:
      return <BadgePill color="blue" label="Pending" />;
  }
};

export default StatusBadge;
