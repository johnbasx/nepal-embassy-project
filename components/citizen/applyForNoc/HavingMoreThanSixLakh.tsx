import React, { Dispatch } from 'react';

const HavingMoreThanSixLakh: React.FC<{
  setClearanceDocument: Dispatch<File>;
}> = ({ setClearanceDocument }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Income tax clearance
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="income-tax-clearance"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setClearanceDocument(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HavingMoreThanSixLakh;
