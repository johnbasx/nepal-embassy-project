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

      // console.log(response.data.access_token);

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
      notify('Authentication error!');
    }
  };
  return (
    <div className="flex flex-col justify-center min-h-screen px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto mx-auto h-28"
          src="/images/logo-only.jpg"
          alt="Workflow"
        />

        <div className="mt-6 font-semibold text-center text-gray-900">
          <h3 className="text-gray-600">Nepal Embassy - Delhi</h3>
          <h1 className="text-3xl font-extrabold">Noc Portal</h1>
          <h2 className="text-xl text-red-500">Employee Login</h2>
        </div>
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
        <div className="px-6 py-8 bg-white sm:px-10">
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
                  placeholder="Enter registered email"
                  required
                  className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 active:outline-none"
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
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 active:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              {!isLoading ? <SignInButton /> : <AuthenticatingButton />}
            </div>
          </form>
          <div className="flex items-center justify-center my-4 space-x-2 text-sm text-center text-gray-500">
            <p>Login problem?</p>
            <a
              href="mailto:sangaitech1@gmail.com?subject=Issue at employee login - NOC Portal"
              className="text-blue-600 duration-150 hover:text-blue-700"
            >
              Raise Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInButton = () => {
  return (
    <button
      type="submit"
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Sign in
    </button>
  );
};

const AuthenticatingButton = () => {
  return (
    <button
      type="button"
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Loading />
      Authenticating
    </button>
  );
};

export default AdminLogin;
