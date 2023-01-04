import React from 'react';
import { TbBug } from 'react-icons/tb';
import { MdOutlineFeedback } from 'react-icons/md';
import { BUGS_EMAIL, FEEDBACK_EMAIL } from '@content/embassy-data';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex items-center justify-center px-4 py-4 mb-3 lg:px-8">
      <footer className="flex flex-wrap items-center space-x-6">
        <div className="flex items-center space-x-1">
          <TbBug className="w-4 h-4 text-red-400" />
          <div className="text-xs text-gray-500 cursor-pointer">
            <Link href={`mailto:${BUGS_EMAIL}`}>Report Bugs</Link>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <MdOutlineFeedback className="w-4 h-4 text-blue-400" />
          <div className="text-xs text-gray-500 cursor-pointer">
            <Link href={`mailto:${FEEDBACK_EMAIL}`}>Feedback</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
