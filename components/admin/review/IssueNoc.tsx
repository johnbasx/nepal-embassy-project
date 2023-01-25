import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { BASE_URL } from '@content/api-urls';
import Loading from '@components/common/Loading';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import { UpdateHandler } from '@utils/fetcher';
import authStore from '@store/adminAuthStore';

const IssueNoc: React.FC<{
  getNocDocumentDetail: () => void;
  documentId: string;
}> = ({ getNocDocumentDetail, documentId }) => {
  const [open, setOpen] = useState(false);
  const { token } = authStore();
  const cancelButtonRef = useRef(null);
  const [authPin, setAuthPin] = useState('');
  const [loading, setLoading] = useState(false);

  const approvedNocDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await UpdateHandler(token, BASE_URL + 'nocVerification', {
      doc_id: documentId,
      auth_pin: authPin,
    });

    if (response.data.success) {
      response.data.message
        ? toast.success(response.data.message)
        : toast.success('NOC issued successfully');
      setOpen(false);
      getNocDocumentDetail();
      window.scrollTo({
        top: 0,
      });
    } else {
      response.data.message
        ? toast.error(response.data.message)
        : toast.error('Incorrect Pin or server error');
      setAuthPin('');
    }
    setLoading(false);
  };
  return (
    <>
      <Toaster />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <form
                onSubmit={(e) => approvedNocDocument(e)}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              >
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <ShieldCheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Enter pin to proceed
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mt-1">
                        <input
                          id="auth_pin"
                          name="auth_pin"
                          type="password"
                          //   autoComplete="auth_pin"
                          placeholder="Enter your pin"
                          autoComplete="off"
                          required
                          value={authPin}
                          className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 active:outline-none"
                          onChange={(e) => setAuthPin(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {loading ? (
                    <LoadingButton />
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Proceed
                    </button>
                  )}
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 text-xs font-medium text-white duration-150 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Issue NOC
      </button>
    </>
  );
};

const LoadingButton = () => {
  return (
    <button className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
      <Loading />
      Loading
    </button>
  );
};
export default IssueNoc;
