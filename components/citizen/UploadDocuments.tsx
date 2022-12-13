import React from 'react';

const UploadDocuments = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Upload your attachments
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          File credentials for user
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Hotel Booking</dt>
            <div className="flex">
              <input
                className="form-control"
                type="file"
                id="hotelBooking"
                // onChange={(e) => setProductImage(e.target.files[0])}
              />
              <a
                href="#"
                className="w-24 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-1 md:text-base md:px-10"
                // onClick={() => setUploadStatus(true)}
              >
                Upload
              </a>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Flight ticket</dt>
            <div className="flex">
              <input
                className="form-control"
                type="file"
                id="flightTicket"
                // onChange={(e) => setProductImage(e.target.files[0])}
              />
              <a
                href="#"
                className="w-24 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-1 md:text-base md:px-10"
                // onClick={() => setUploadStatus(true)}
              >
                Upload
              </a>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Visa</dt>
            <div className="flex">
              <input
                className="form-control"
                type="file"
                id="visa"
                // onChange={(e) => setProductImage(e.target.files[0])}
              />
              <a
                href="#"
                className="w-24 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-1 md:text-base md:px-10"
                // onClick={() => setUploadStatus(true)}
              >
                Upload
              </a>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UploadDocuments;
