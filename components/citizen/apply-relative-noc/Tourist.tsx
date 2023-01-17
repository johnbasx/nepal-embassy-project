import React, { Dispatch } from 'react';

import { NocFilesProps } from '@content/files-for-noc';

const Tourist: React.FC<{
  nocFiles: NocFilesProps;
  setNocFiles: Dispatch<NocFilesProps>;
}> = ({ nocFiles, setNocFiles }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Flight booking <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="hotel-booking"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                // setFlightBooking(e.target.files[0]);
                setNocFiles({
                  ...nocFiles,
                  flightBooking: e.target.files[0],
                });
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Nagarita <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="nagarita"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setNocFiles({
                  ...nocFiles,
                  nagarita: e.target.files[0],
                });
              }
            }}
          />
        </div>
      </div>

      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Writeup(Why to travel in tourist Visa){' '}
          <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="writeup"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setNocFiles({
                  ...nocFiles,
                  writeUp: e.target.files[0],
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Tourist;
