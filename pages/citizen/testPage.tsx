import React from 'react';

const NocDownloadScreen = () => {
  return (
    <div className="app min-w-screen min-h-screen bg-gray-100 py-8 px-4 font-sans">
      <div className="mail__wrapper mx-auto max-w-7xl space-y-3">
        <div className="flex w-full items-center justify-between divide-x-2 divide-dashed divide-slate-200 rounded-lg border bg-white py-4 px-4 shadow-md md:px-6">
          <div>
            <h3 className="">NOC-Doc-John-4900988</h3>
            <p className="text-sm text-gray-500">Applied on 7 January, 2022</p>
            <div className="mt-4 flex items-center justify-start space-x-1 text-xs text-gray-500">
              <div className="h-4 w-4 rounded-full text-xs text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-teal-500"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337l-17 17-17-17-64-64-17-17L160 222.1l17 17 47 47L335 175l17-17L385.9 192l-17 17z" />
                </svg>
              </div>
              <p>Documents verification completed</p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center space-y-2 pl-4 md:pl-12 w-[45%] md:w-[25%]">
            <a
              href="#!"
              className="rounded-md bg-slate-700 w-full text-center py-2 text-white duration-200 hover:bg-indigo-600"
            >
              Download Now
            </a>
            <p className="text-xs text-teal-500">Your NOC document is ready</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between divide-x-2 divide-dashed divide-slate-200 rounded-lg border bg-white py-4 px-4 shadow-md md:px-6">
          <div className="">
            <h3 className="">NOC-Doc-John-09100288</h3>
            <p className="text-sm text-gray-500">
              Applied on 22 February, 2022
            </p>
            <div className="mt-4 flex h-5 items-center justify-start space-x-1 text-xs text-gray-500">
              <div className="h-4 w-4 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="fill-slate-400"
                >
                  <path d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
              </div>
              <p>Documents verification pending</p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center space-y-2 pl-4 md:pl-12 w-[45%] md:w-[25%]">
            <button
              disabled
              className="cursor-not-allowed rounded-md bg-slate-300 w-full text-center py-2 text-slate-50 duration-200 hover:bg-slate-300"
            >
              Download Now
            </button>
            <p className="text-xs text-gray-500">Your NOC is not ready</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between divide-x-2 divide-dashed divide-slate-200 rounded-lg border bg-white py-4 px-4 shadow-md md:px-6">
          <div className="">
            <h3 className="">NOC-Doc-John-09100288</h3>
            <p className="text-sm text-gray-500">Applied on 30 March, 2022</p>
            <div className="mt-4 flex h-5 items-center justify-start space-x-1 text-xs text-gray-500">
              <div className="h-4 w-4 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="fill-red-400"
                >
                  <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
              </div>
              <p>Documents rejected</p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center space-y-2 pl-4 md:pl-12 w-[45%] md:w-[25%]">
            <button className="rounded-md bg-slate-700 w-full text-center py-2 text-slate-50 duration-200 hover:bg-slate-800">
              Submit documents
            </button>
            <p className="text-xs text-red-500">Submit your documents again</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NocDownloadScreen;
