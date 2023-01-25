import { QueryClient, useMutation, useQuery } from 'react-query';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { BASE_URL } from '@content/api-urls';
import Loading from '@components/common/Loading';
import authStore from '@store/adminAuthStore';
import axios from 'axios';

const CreatePin = () => {
  const { token } = authStore();
  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);

  const relProfileUpdate = useMutation(createPin);
  async function createPin(dataToUpdate: any) {
    const response = await axios.put(BASE_URL + 'createEmployeePin', data, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });

    console.log(response);

    if (response.data.success) {
      response.data.message
        ? toast.success(response.data.message)
        : toast.success('Pin created successfully');
    } else {
      response.data.message
        ? toast.error(response.data.message)
        : toast.error('Unable to create pin');
    }
  }

  const createPinHandler = (e: React.MouseEvent<HTMLElement>) => {
    setloading(false);
    e.preventDefault();
    relProfileUpdate.mutate(data);
    setData({});
    setloading(false);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-center">
        <div className="w-full">
          <div className=" py-4 bg-white">
            <form
              className="mb-0 space-y-6"
              action="#"
              method="POST"
              // onSubmit={(event) => onSubmitHandler(event)}
            >
              <div>
                <label
                  htmlFor="pin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Security pin
                </label>
                <div className="mt-1">
                  <input
                    id="pin"
                    name="pin"
                    type="password"
                    placeholder="Enter your security pin"
                    className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 active:outline-none"
                    // autoComplete="current-pin"
                    required
                    onChange={(e) =>
                      setData({
                        ...data,
                        auth_pin: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                {!loading ? (
                  <button
                    onClick={(e) => createPinHandler(e)}
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create pin
                  </button>
                ) : (
                  <AuthenticatingButton />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const AuthenticatingButton = () => {
  return (
    <button
      type="button"
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Loading />
      Creating
    </button>
  );
};

export default CreatePin;
