import { classNames } from '@utils/helpers';
import React, { FC, InputHTMLAttributes } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { classNameType } from './Form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register?: any;
  wrapperClass?: classNameType;
  className?: string;
  phone?: boolean;
}

const PhoneInput: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  phone,
  ...rest
}) => {
  return (
    <div className={wrapperClass}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            'text-sm block font-medium mb-1',
            error ? 'text-red-500 font-medium' : 'text-gray-500'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-lg">
        <div className="absolute inset-y-0 left-0 flex items-center px-3 rounded-l-lg pointer-events-none bg-gray-300/40">
          <span className="font-bold text-gray-500 sm:text-sm">+91</span>
        </div>
        <input
          aria-invalid={error ? 'true' : 'false'}
          className={classNames(
            'py-2 placeholder-gray-400 pl-16 sm:pl-14 focus:ring-2 -ring-offset-1 w-full outline-none rounded-lg border border-gray-300 bg-gray-100',
            error
              ? 'border-red-500 focus:ring-red-300'
              : 'text-slate-900 border-gray-300 focus:ring-blue-300 focus:border-blue-500'
          )}
          {...register(name)}
          {...rest}
        />
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
};

export default PhoneInput;

//   className="block w-full pl-16 border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500 sm:pl-14 sm:text-sm"
