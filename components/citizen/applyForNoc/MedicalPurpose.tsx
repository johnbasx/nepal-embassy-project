import React, { Dispatch } from 'react';

const MedicalPurpose: React.FC<{
  setfamilyRelationDocument: Dispatch<File>;
  setRelativePassport: Dispatch<File>;
  setRelativeNagarita: Dispatch<File>;
  setSponsorshipLetter: Dispatch<File>;
}> = ({
  setfamilyRelationDocument,
  setRelativePassport,
  setRelativeNagarita,
  setSponsorshipLetter,
}) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Family relation document <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="family-relation-document"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setfamilyRelationDocument(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 rounded sm:grid bg-gray-50 sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Relative Passport <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="relative-passport"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setRelativePassport(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Relatives Nagrita <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="relatives-nagrita"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setRelativeNagarita(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 rounded sm:grid bg-gray-50 sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-700">
          Sponsorship letter from user to relatives{' '}
          <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            accept="application/msword, text/plain, application/pdf, .doc, .docx, .txt, application/docx, image/*"
            id="relative-passport"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setSponsorshipLetter(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MedicalPurpose;
