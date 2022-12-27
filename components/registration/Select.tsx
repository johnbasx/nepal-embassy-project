import { BiCheck, BiDownArrowAlt } from 'react-icons/bi';

import { FieldError } from 'react-hook-form';
import { FieldErrorsImpl } from 'react-hook-form';
import { Merge } from 'react-hook-form';
import React from 'react';
import { classNames } from '@utils/helpers';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
  label?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register?: any;
  wrapperClass?: string;
  className?: string;
  field?: any;
}

const Select: React.FC<SelectProps> = React.forwardRef(
  (
    { register, options, name, error, label, wrapperClass, field, ...rest },
    ref
  ) => {
    return (
      <div className="grid col-span-2 mt-3">
        <label
          htmlFor="gender"
          className={classNames(
            'text-sm block font-medium mb-1',
            error ? 'text-red-500 font-medium' : 'text-gray-500'
          )}
        >
          Gender
        </label>
        <div className="relative">
          <div className="absolute flex items-center h-full right-2">
            {/* <BiDownArrowAlt className="w-4 h-4 text-gray-500" /> */}
          </div>
          <select
            {...rest}
            aria-invalid={error ? 'true' : 'false'}
            className={classNames(
              'py-2 px-4 placeholder-gray-300 focus:ring-2 -ring-offset-1 w-full outline-none rounded-lg bg-gray-100 border border-gray-200',
              error
                ? 'border-red-500 focus:ring-red-300'
                : 'text-slate-900 border-gray-300 focus:ring-indigo-300 focus:border-indigo-500'
            )}
            placeholder="Gender"
          >
            <option value="" className="text-gray-400">
              Select gender
            </option>
            {options.map((data, index) => (
              <option value={data} label={data} key={'gender-option' + index}>
                {data}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <span
            role="alert"
            className={classNames(
              'text-xs text-red-500 mt-1',
              error ? 'visible' : 'invisible'
            )}
          >
            {error.toString()}
          </span>
        )}
      </div>
    );
  }
);

// export default Select;
Select.displayName = 'Select';
export default Select;
