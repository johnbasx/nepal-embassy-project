import React, { Dispatch } from 'react';

const LivingInIndia: React.FC<{
  setRentalAgreement: Dispatch<File>;
  setResidenceProof: Dispatch<File>;
}> = ({ setRentalAgreement, setResidenceProof }) => {
  return (
    <>
      {/* <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Rental Agreement</dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="rental-agreement"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setRentalAgreement(e.target.files[0]);
              }
            }}
          />
        </div> 
      </div>*/}
      <dl>
        <div className="px-4 py-5 rounded-md bg-gray-50 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-700">
            Proof of residence
            <span className="ml-1 text-red-500">*</span>
            <br />
            <span className="text-xs font-normal text-red-500">
              (If you are currently living in India please provide a valid proof
              of residence.)
            </span>
          </dt>
          <div className="flex">
            <input
              required
              className="form-control"
              type="file"
              id="offer-letter"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files != null) {
                  setResidenceProof(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
      </dl>
    </>
  );
};

export default LivingInIndia;
