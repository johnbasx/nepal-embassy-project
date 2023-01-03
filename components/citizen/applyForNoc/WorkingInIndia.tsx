import React, { Dispatch } from 'react';

const WorkingInIndia: React.FC<{
  setLandlordWriteup: Dispatch<File>;
}> = ({ setLandlordWriteup }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Writeup by Landlord <span className="text-red-500">*</span>
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
                setLandlordWriteup(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default WorkingInIndia;
