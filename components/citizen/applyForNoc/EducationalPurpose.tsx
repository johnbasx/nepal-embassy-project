import React, { Dispatch } from 'react';

const EducationalPurpose: React.FC<{
  setEduOfferLetter: Dispatch<File>;
  setMarksheet: Dispatch<File>;
  setTransferCertificate: Dispatch<File>;
}> = ({ setEduOfferLetter, setMarksheet, setTransferCertificate }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Education offer letter <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="edu-offer-letter"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setEduOfferLetter(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 rounde bg-gray-50 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Marksheet <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="marksheet"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setMarksheet(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>

      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Transfer Certificate <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="writeup"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setTransferCertificate(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EducationalPurpose;
