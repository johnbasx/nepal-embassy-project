import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import React, { useEffect } from 'react';

import { RadioGroup } from '@headlessui/react';
import { classNames } from '@utils/helpers';

const LivingInIndia = ({
  livingInIndia,
  setLivingInIndia,
}: {
  livingInIndia: boolean;
  setLivingInIndia: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const RadioOption = ({ value, label }: { value: boolean; label: string }) => (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <div
          className={classNames(
            'px-2 py-2 rounded-md flex cursor-pointer items-center space-x-2',
            checked ? 'bg-gray-100 duration-200' : ''
          )}
        >
          {checked ? (
            <BsCheckCircleFill className="h-4 w-4 text-indigo-500" />
          ) : (
            <BsCircle className="h-4 w-4 text-indigo-400" />
          )}
          <span>{label}</span>
        </div>
      )}
    </RadioGroup.Option>
  );
  return (
    <RadioGroup value={livingInIndia} onChange={setLivingInIndia}>
      <RadioGroup.Label className="text-xs block font-bold mb-2 uppercase tracking-wide text-gray-500">
        Living In India <span className="text-red-500">*</span>
      </RadioGroup.Label>
      <div className="flex">
        <RadioOption value={true} label="Yes" />
        <RadioOption value={false} label="No" />
      </div>
    </RadioGroup>
  );
};

export default LivingInIndia;
