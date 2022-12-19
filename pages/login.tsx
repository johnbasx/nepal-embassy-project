import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Loading from '@components/common/Loading';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { loginUrl } from 'content/api-urls';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { token } = authStore();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const notify = (message: string) => toast(message);

  useEffect(() => {
    if (token != '') {
      router.push('/citizen/profile');
    }
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     router.push('/citizen/profile');
  //   }
  // }, []);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const url = `${loginUrl}`;
    try {
      const response = await axios.post(
        url,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      if (response.data === 'failed') {
        setIsLoading(false);
        notify('Authentication failed');
      } else {
        setIsLoading(false);
        router.push(`/verify-user/${response.data}`);
      }
      //const keyName = Object.keys(response.data)[0];  get keyname for first attribute of obj
      // const value = response.data[Object.keys(response.data)[0]]; get value for first attribute of obj
    } catch (e) {
      console.log(e);
      notify('Authentication failed');
    }
  };

  // return token !== '' ? (
  //   <></>
  // ) : (
  //   <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8">
  //     <div className="sm:mx-auto sm:w-full sm:max-w-md">
  //       <img
  //         className="mx-auto h-28 w-auto"
  //         src="/images/logo-only.jpg"
  //         alt="Workflow"
  //       />
  //       {/* <div className="mx-auto">Nepalese Login for Noc Portal</div> */}
  //       <h2 className="mt-6 text-center text-lg font-semibold text-gray-900">
  //         Nepal Embassy - Delhiiii
  //         <br />
  //         <span className="text-3xl font-extrabold">NOC Portal Login</span>
  //       </h2>
  //       <p className="mt-2 text-center text-sm text-gray-600 max-w">
  //         Don&apos;t have account?
  //         <Link href="/signup">
  //           <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  //             {' '}
  //             Sign up
  //           </a>
  //         </Link>
  //       </p>
  //       <Toaster
  //         toastOptions={{
  //           className: 'font-bold',
  //           style: {
  //             // backgroundColor: '#ED4F32',
  //             backgroundColor: 'red',
  //             color: 'white',
  //           },
  //         }}
  //       />
  //     </div>

  //     <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
  //       <div className="bg-white py-8 px-6 sm:px-10">
  //         <form
  //           className="mb-0 space-y-6"
  //           action="#"
  //           method="POST"
  //           onSubmit={(event) => onSubmitHandler(event)}
  //         >
  //           <div>
  //             <label
  //               htmlFor="email"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Email
  //             </label>
  //             <div className="mt-1">
  //               <input
  //                 id="email"
  //                 name="email"
  //                 type="text"
  //                 autoComplete="email"
  //                 required
  //                 className=" "
  //                 onChange={(e) => setEmail(e.target.value)}
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="password"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Password
  //             </label>
  //             <div className="mt-1">
  //               <input
  //                 id="password"
  //                 name="password"
  //                 type="password"
  //                 autoComplete="current-password"
  //                 required
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             {!isLoading ? <SignInButton /> : <AuthenticatingButton />}
  //           </div>
  //           <p className="mt-2 text-center text-sm text-gray-600 max-w">
  //             <Link href="/request-password-reset">
  //               <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  //                 Forgot password?
  //               </a>
  //             </Link>
  //           </p>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-28 w-auto"
          src="/images/logo-only.jpg"
          alt="Workflow"
        />
        {/* <div className="mx-auto">Nepalese Login for Noc Portal</div> */}
        <h2 className="mt-6 text-center text-lg font-semibold text-gray-900">
          Nepal Embassy - Delhi
          <br />
          <span className="text-3xl font-extrabold">NOC Portal Login</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Don&apos;t have account?
          <Link href="/signup">
            <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {' '}
              Sign up
            </a>
          </Link>
        </p>
        <Toaster
          toastOptions={{
            className: 'font-bold',
            style: {
              // backgroundColor: '#ED4F32',
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
                  type="text"
                  autoComplete="email"
                  required
                  className=" "
                  onChange={(e) => setEmail(e.target.value)}
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
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              <Link href="/request-password-reset">
                <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Forgot password?
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

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
