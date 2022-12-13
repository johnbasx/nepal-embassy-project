import React, { Dispatch } from 'react';

const Tourist: React.FC<{
  setFlightBooking: Dispatch<File>;
  setNagarita: Dispatch<File>;
  setWriteUp: Dispatch<File>;
}> = ({ setFlightBooking, setNagarita, setWriteUp }) => {
  return (
    <>
      <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Flight booking <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="hotel-booking"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setFlightBooking(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Nagarita <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="nagarita"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setNagarita(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>

      <div className=" px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Writeup(Why to travel in tourist Visa){' '}
          <span className="text-red-500">*</span>
        </dt>
        <div className="flex">
          <input
            required
            className="form-control"
            type="file"
            id="writeup"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files != null) {
                setWriteUp(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Tourist;
