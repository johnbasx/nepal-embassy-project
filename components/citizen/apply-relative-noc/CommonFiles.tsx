import React, { Dispatch } from 'react';

import { NocFilesProps } from '@content/files-for-noc';

const CommonFiles: React.FC<{
  nocFiles: NocFilesProps;
  setNocFiles: Dispatch<NocFilesProps>;
}> = ({ nocFiles, setNocFiles }) => {
  return (
    <>
      <div className="px-4 py-5 rounded bg-gray-50 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Visa <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="visa"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                // setVisa(e.target.files[0]);
                setNocFiles({
                  ...nocFiles,
                  visa: e.target.files[0],
                });
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Passport <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="passport"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setNocFiles({
                  ...nocFiles,
                  passport: e.target.files[0],
                });
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 rounded sm:grid bg-gray-50 sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Air Ticket <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="air-ticket"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setNocFiles({
                  ...nocFiles,
                  airTicket: e.target.files[0],
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CommonFiles;
