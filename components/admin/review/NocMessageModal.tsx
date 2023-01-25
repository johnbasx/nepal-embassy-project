import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import React, { Dispatch, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { PostData } from '@utils/fetcher';
import authStore from '@store/adminAuthStore';
import { rejectNocDocumentWithMessage } from 'content/api-urls';

const MessageModal: React.FC<{
  openNocModal: boolean;
  setOpenNocModal: Dispatch<boolean>;
  noc_doc_id: string;
  getNocDocumentDetail: () => void;
}> = ({ openNocModal, setOpenNocModal, noc_doc_id, getNocDocumentDetail }) => {
  const cancelButtonRef = useRef(null);
  const { token } = authStore();
  const [message, setMessage] = useState('');
  const data = {
    receiver: noc_doc_id,
    message: message,
  };
  const rejectDocumentWithMessage = async () => {
    const returnValue = await PostData(
      token,
      rejectNocDocumentWithMessage,
      data
    );
    if (returnValue == 1) {
      toast.success('NOC rejected');
      getNocDocumentDetail();
    } else if (returnValue == 0) {
      toast.error('File rejection error');
    }
  };
  return (
    <>
      <Toaster />
      <Transition.Root show={openNocModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenNocModal}
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
                    <div className="space-y-2">
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Message for rejecting NOC
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Less than 100 character"
                            defaultValue={''}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          />
                        </div>{' '}
                      </div>
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Enter your pin
                        </label>
                        <div className="mt-1">
                          <input
                            id="auth_pin"
                            name="auth_pin"
                            type="password"
                            //   autoComplete="auth_pin"
                            placeholder="Enter your pin"
                            autoComplete="off"
                            required
                            // value={authPin}
                            className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 active:outline-none"
                            // onChange={(e) => setAuthPin(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        rejectDocumentWithMessage();
                        setOpenNocModal(false);
                      }}
                    >
                      Reject NOC
                    </button>
                    {/* <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenNocModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button> */}
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
