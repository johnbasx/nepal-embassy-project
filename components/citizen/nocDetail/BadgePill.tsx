import { classNames } from '@utils/helpers';
import { StatusBadgeProps } from './StatusBadge';

const BadgePill = ({ label, color }: Partial<StatusBadgeProps>) => {
  return (
    <small
      className={classNames(
        `bg-${color}-200 text-${color}-900 text-[10px] font-semibold py-1 px-2.5 rounded-full`
      )}
    >
      {label}
    </small>
  );
};

export default BadgePill;
