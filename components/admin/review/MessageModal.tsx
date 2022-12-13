import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import React, { Dispatch, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { PostData } from '@utils/fetcher';
import authStore from '@store/adminAuthStore';
import { rejectFileWithMessage } from 'content/api-urls';

const MessageModal: React.FC<{
  open: boolean;
  setOpen: Dispatch<boolean>;
  file_id: string;
  getNocDocumentFiles: () => void;
}> = ({ open, setOpen, file_id, getNocDocumentFiles }) => {
  const cancelButtonRef = useRef(null);
  const { token } = authStore();
  const [message, setMessage] = useState('');
  const data = {
    file: file_id,
    message: message,
  };
  const rejectWithMessage = async () => {
    const returnValue = await PostData(token, rejectFileWithMessage, data);
    if (returnValue == 1) {
      toast.success('File rejected');
      getNocDocumentFiles();
    } else if (returnValue == 0) {
      toast.error('File rejection error');
    }
  };
  return (
    <>
      <Toaster />
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full w-full sm:max-w-xl">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="">
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Message for rejecting file
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Less than 100 character"
                            defaultValue={''}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          />
                        </div>{' '}
                      </div>
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  {/* <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message for rejecting file
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={6}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Less than 100 character"
                      defaultValue={''}
                    />
                  </div> */}
                  {/* <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p> */}
                  {/* </div> */}

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        rejectWithMessage();
                        setOpen(false);
                      }}
                    >
                      Reject file
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MessageModal;
