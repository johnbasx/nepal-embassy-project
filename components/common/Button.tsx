import React from 'react';

interface btnProps {
  text: string;
  icon?: React.ReactNode;
}
const Button = ({ text, icon }: btnProps) => {
  return (
    <div className="rounded-md shadow">
      <a
        href="#"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-2 md:px-4 md:text-medium"
      >
        {icon}
        <span>{text}</span>
      </a>
    </div>
  );
};

export default Button;
