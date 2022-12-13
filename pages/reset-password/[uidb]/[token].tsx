import toast, { Toaster } from 'react-hot-toast';

import Link from 'next/link';
import Loading from '@components/common/Loading';
import { LockClosedIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { uidb, token } = router.query;
  console.log(uidb, token);

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const url = 'http://127.0.0.1:8000/password-reset-complete';
    const data = {
      password: newPassword,
      token: token,
      uidb64: uidb,
    };
    try {
      const response = await axios.patch(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Cannot reset password');
    }
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8 shadow-xl p-6 border rounded-md">
        <div>
          <div className="flex justify-center text-center ">
            <div className="bg-green-500 rounded-full p-3 shadow-2xl">
              <LockClosedIcon className="h-14 w-14 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={(event) => onSubmitHandler(event)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div className="mt-1">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="confirm-password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            {!isLoading ? (
              <button
                type="submit"
                className="group relative flex max-w-5xl justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset Password
              </button>
            ) : (
              <LoadingButton />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const LoadingButton = () => {
  return (
    <button
      type="button"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Loading />
      Loading
    </button>
  );
};

export default ResetPassword;
