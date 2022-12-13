import React, { Dispatch } from 'react';

const GovernmentalWork: React.FC<{
  setMinistryLetter: Dispatch<File>;
  setInvitationLetter: Dispatch<File>;
}> = ({ setMinistryLetter, setInvitationLetter }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Governmental letter from ministry{' '}
          <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="govermental-letter"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setMinistryLetter(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Letter of invitation <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="letter-of-invitation"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setInvitationLetter(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default GovernmentalWork;
