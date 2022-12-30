import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import React, { useEffect } from 'react';

import { RadioGroup } from '@headlessui/react';
import { classNames } from '@utils/helpers';

const TravelVia = ({
  travelType,
  setTravelType,
}: {
  travelType: string;
  setTravelType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // useEffect(() => {
  //   console.log('Checked: ', travelType);
  // }, [travelType]);

  const RadioOption = ({ value }: { value: string }) => (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <div
          className={classNames(
            'px-2 py-2 rounded-md flex cursor-pointer items-center space-x-2',
            checked ? 'bg-gray-100 duration-200' : ''
          )}
        >
          {checked ? (
            <BsCheckCircleFill className="w-4 h-4 text-blue-500" />
          ) : (
            <BsCircle className="w-4 h-4 text-blue-400" />
          )}
          <span>{value}</span>
        </div>
      )}
    </RadioGroup.Option>
  );
  return (
    <RadioGroup value={travelType} onChange={setTravelType}>
      <RadioGroup.Label className="block mb-2 text-sm font-medium text-gray-700">
        Travel Type <span className="text-red-500">*</span>
      </RadioGroup.Label>

      <div className="flex">
        <RadioOption value="Connecting" />
        <RadioOption value="Direct" />
      </div>
    </RadioGroup>
  );
};

export default TravelVia;
