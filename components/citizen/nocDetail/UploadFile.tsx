import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { Update, UpdateHandler } from '@utils/fetcher';

import authStore from '@store/useAuthStore';
import { toast } from 'react-hot-toast';
import { RiUploadCloud2Line } from 'react-icons/ri';
export interface UploadFileProps {
  url: string;
  getContent: () => void;
  uploadFor: string;
  label: string;
}
const UploadFile: React.FC<UploadFileProps> = ({
  url,
  getContent,
  uploadFor,
  label,
}) => {
  const { token } = authStore();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();

  const cancelButtonRef = useRef(null);

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();

    if (uploadFor == 'Document') {
      formData.append('payment_screen_shot', file as Blob);
    } else if (uploadFor == 'File') {
      formData.append('document_file', file as Blob);
      formData.append('verification_status', '1');
    }

    const response = await UpdateHandler(token, url, formData);
    // console.log(response.response.data.message);
    if (response.data.status == 'success') {
      response.data.message
        ? toast.success(response.data.message)
        : toast.error('File uploaded successfully');
      getContent();
      setOpen(false);
    } else {
      response.data.message
        ? toast.error(response.data.message)
        : toast.error('Cannot upload file');
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="inline-flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-gray-600 rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-800"
      >
        <RiUploadCloud2Line className="w-3 h-3 text-white" />
        <span>Upload file</span>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl">
                  <form
                    action=""
                    onSubmit={(e) => {
                      uploadFile(e);
                    }}
                  >
                    <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                          <div className="mt-2">
                            <div className="px-4 py-5 border rounded-md sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-700">
                                {label}
                                <br />
                                <span className="text-xs font-normal text-red-500">
                                  Proof of transaction statement/screenshot
                                </span>
                              </dt>

                              <div className="flex">
                                <input
                                  required
                                  className="form-control"
                                  type="file"
                                  id="file"
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (e.target.files != null) {
                                      setFile(e.target.files[0]);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default UploadFile;
