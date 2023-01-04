import React, { Dispatch } from 'react';

const WorkingVisa: React.FC<{
  setOfferLetter: Dispatch<File>;
}> = ({ setOfferLetter }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Offer letter <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="departure"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setOfferLetter(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default WorkingVisa;
