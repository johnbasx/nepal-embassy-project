import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';

const ResetPassword: NextPage = () => {
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
        <form className="mt-8 space-y-6" action="#" method="POST">
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
              />
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            <button
              type="submit"
              className="group relative flex max-w-5xl justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
