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

const Input: FC<InputProps> = ({
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
            error ? 'text-red-500 font-medium' : 'text-gray-700'
          )}
        >
          {label}
        </label>
      )}
      <input
        aria-invalid={error ? 'true' : 'false'}
        className={classNames(
          'text-sm w-full border bg-gray-100 border-gray-300 px-3 py-2.5 focus:outline-none focus:border-gray-400 active:outline-none rounded-lg',
          error
            ? 'border-red-500 focus:ring-red-300'
            : 'text-slate-900 border-gray-200 focus:ring-indigo-300 focus:border-indigo-500'
        )}
        {...register(name)}
        {...rest}
      />
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

export default Input;
