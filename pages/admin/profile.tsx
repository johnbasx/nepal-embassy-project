import { BASE_URL, getEmpProfile, updateEmpProfile } from '@content/api-urls';
import { Dialog, Transition } from '@headlessui/react';
import { FetchData, Update } from '@utils/fetcher';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import authStore from '@store/adminAuthStore';
import { profile } from 'console';
import { toast } from 'react-hot-toast';

export interface EmpProfileProps {
  id: string;
  full_name?: string;
  email: string;
  signature: string;
  user?: string;
}

const Profile = () => {
  const { token } = authStore();
  const [profile, setProfile] = useState<EmpProfileProps>();
  const getProfile = async () => {
    const returnData = await FetchData(token, getEmpProfile);
    console.log(returnData);
    setProfile(returnData);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-full">
      <main className="py-6">
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Profile Information
                  </h2>
                  {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and application.
                  </p> */}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Full Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile?.full_name}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile?.email}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Signature
                      </dt>
                      <div className="relative h-24 w-auto object-contain ">
                        {profile?.signature ? (
                          <img
                            src={
                              `https://cube69.pythonanywhere.com` +
                              profile?.signature
                            }
                            className="h-24 w-auto "
                            alt={profile?.full_name + ' Signature'}
                          />
                        ) : (
                          <p>No signature</p>
                        )}
                      </div>
                    </div>
                  </dl>
                </div>
                {/* <div>
                  <a
                    href="#"
                    className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                  >
                    Read full application
                  </a>
                </div> */}
              </div>
            </section>
          </div>

          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <div className="mt-6 flex flex-col justify-stretch">
                {/* <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Upload Signature
                </button> */}
                <UploadSignature
                  getProfile={getProfile}
                  profileId={profile?.id}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;

const UploadSignature: React.FC<{
  getProfile: () => void;
  profileId?: string;
}> = ({ getProfile, profileId }) => {
  const [open, setOpen] = useState(false);
  const { token } = authStore();
  const [signature, setSignature] = useState<File>();
  const cancelButtonRef = useRef(null);

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('signature', signature as Blob);

    const returnValue = await Update(
      token,
      updateEmpProfile + profileId,
      formData
    );
    if (returnValue == 1) {
      toast.success('Signature uploaded');
      getProfile();
      setOpen(false);
    } else {
      toast.error('Cannot upload file');
      setOpen(false);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        // className=" bg-indigo-500 font-medium hover:bg-indigo-600 text-white px-3 py-2 rounded-md"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Upload Signature
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <form
                    action=""
                    onSubmit={(e) => {
                      uploadFile(e);
                    }}
                  >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                          <div className="mt-2">
                            <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 border rounded-md">
                              <dt className="text-sm font-medium text-gray-500">
                                Signature
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
                                      setSignature(e.target.files[0]);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Confirm
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
