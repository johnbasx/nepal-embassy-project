import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Loading from '@components/common/Loading';
import { adminLogin } from '@content/api-urls';
import authStore from '@store/adminAuthStore';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const { token, setAccessToken, setIsAuthenticated } = authStore();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const notify = (message: string) => toast(message);

  useEffect(() => {
    if (token != '') {
      router.push('/embassy-employee/profile');
    }
  }, [token]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // const url = `http://192.168.29.199:8000/adminLogin`;
    try {
      const response = await axios.post(
        adminLogin,
        {
          user_name: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data.access_token);

      if (response.data.access_token === undefined) {
        setIsLoading(false);
        notify('Authentication failed');
      } else {
        setAccessToken(response.data.access_token);
        setIsAuthenticated(true);
        setIsLoading(false);
        router.push(`/embassy-employee/nocDocList`);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      notify('Authentication failed');
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-28 w-auto"
          src="/images/logo-only.jpg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Employee Login for Noc Portal
        </h2>
        <Toaster
          toastOptions={{
            className: 'font-bold',
            style: {
              backgroundColor: 'red',
              color: 'white',
            },
          }}
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10">
          <form
            className="mb-0 space-y-6"
            action="#"
            method="POST"
            onSubmit={(event) => onSubmitHandler(event)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" "
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              {!isLoading ? <SignInButton /> : <AuthenticatingButton />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SignInButton = () => {
  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign in
    </button>
  );
};

const AuthenticatingButton = () => {
  return (
    <button
      type="button"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Loading />
      Authenticating
    </button>
  );
};

export default AdminLogin;
