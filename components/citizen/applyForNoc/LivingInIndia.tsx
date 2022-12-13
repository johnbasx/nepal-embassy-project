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
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Proof of residence
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
