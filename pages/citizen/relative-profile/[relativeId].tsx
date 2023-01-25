import { QueryClient, useMutation, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { BASE_URL } from '@content/api-urls';
import { FetchData } from '@utils/fetcher';
import { Gender } from 'content/drop-down-items';
import Loading from '@components/common/Loading';
import { RelativeProfileProps } from '@components/citizen/applyForNoc/FamilyProfile';
import { UpdateHandler } from '@utils/fetcher';
import authStore from '@store/useAuthStore';
import axios from 'axios';

const RelativeProfile: React.FC<{ relativeId: string }> = ({ relativeId }) => {
  const { token } = authStore();
  const [dataToUpdate, setDataToUpdate] = useState({});

  const { isLoading, isFetching, isError, isSuccess, data, refetch } = useQuery<
    RelativeProfileProps,
    Error
  >(['relativeProfileDetail', relativeId], () =>
    FetchData(token, BASE_URL + 'getRelativeProfile/' + relativeId)
  );

  const relProfileUpdate = useMutation(updateRelative);
  async function updateRelative(dataToUpdate: any) {
    const response = await axios.put(
      BASE_URL + 'updateRelativeProfile/' + relativeId,
      dataToUpdate,
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    );

    if (response.data.success) {
      response.data.message
        ? toast.success(response.data.message)
        : toast.success('Updated successfully');
      refetch();
    } else {
      response.data.message
        ? toast.error(response.data.message)
        : toast.error('Cannot update');
    }
  }

  const updateRelativeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    relProfileUpdate.mutate(dataToUpdate);
    setDataToUpdate({});
  };
  if (isLoading) return <p>Loading ...</p>;
  return (
    <>
      <Toaster />
      <div className="p-4">
        <div className="max-w-5xl px-4 py-4 mx-auto bg-white md:my-2 rounded-2xl md:shadow">
          <div className="px-4 py-4 sm:p-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <h2 className="text-lg font-semibold leading-6 text-gray-900">
                  Profile for {data?.full_name}
                </h2>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  autoComplete="full_name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  defaultValue={data?.full_name}
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      full_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  defaultValue={data?.email}
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm">
                    IN
                  </span>
                  <input
                    type="text"
                    name="contact-number"
                    id="contact-number"
                    autoComplete="contact-number"
                    className="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-sky-500 focus:border-sky-500 rounded-r-md sm:text-sm"
                    defaultValue={data?.contact_number}
                    onChange={(e) =>
                      setDataToUpdate({
                        ...dataToUpdate,
                        contact_number: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <input
                  type="profession"
                  name="profession"
                  id="profession"
                  list="profession-list"
                  autoComplete="profession"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  defaultValue={data?.profession}
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      profession: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  autoComplete="dob"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="DD-MM-YY"
                  defaultValue={data?.dob}
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      dob: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  required
                  name="gender"
                  defaultValue={data?.gender}
                  autoComplete="gender"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      gender: e.target.value,
                    })
                  }
                >
                  {Gender.map((item) => (
                    <option key={'option' + item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label
                  htmlFor="relation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Relation
                </label>
                <input
                  type="text"
                  name="relation"
                  id="relation"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      relationship: e.target.value,
                    })
                  }
                  defaultValue={data?.relationship}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="father-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Father Name
                </label>
                <input
                  type="text"
                  name="father-name"
                  id="father-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      fathers_name: e.target.value,
                    })
                  }
                  defaultValue={data?.fathers_name}
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="mother-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother Name
                </label>
                <input
                  type="text"
                  name="mother-name"
                  id="mother-name"
                  autoComplete="organization"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  defaultValue={data?.mothers_name}
                  onChange={(e) =>
                    setDataToUpdate({
                      ...dataToUpdate,
                      mothers_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-end px-2 py-6">
              {!relProfileUpdate.isLoading ? (
                <button
                  onClick={(e) => updateRelativeHandler(e)}
                  className="w-auto px-8 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              ) : (
                <SavingButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SavingButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-auto px-4 py-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
    >
      <Loading />
      Saving
    </button>
  );
};

export default RelativeProfile;

export async function getServerSideProps(context: any) {
  const { relativeId } = context.params;
  return { props: { relativeId } };
}
