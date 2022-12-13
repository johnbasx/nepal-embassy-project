import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterFormTypes,
  RegistrationSchema,
} from '@components/registration/Validation';
import toast, { Toaster } from 'react-hot-toast';

import { CreateUser } from '@utils/fetcher';
import DatePicker from 'react-datepicker';
import Form from '@components/registration/Form';
import { Gender } from '@content/drop-down-items';
import Input from '@components/registration/Input';
import Link from 'next/link';
import PhoneInput from '@components/registration/PhoneInput';
import Select from '@components/registration/Select';
import authStore from '@store/adminAuthStore';
import { createUser } from 'content/api-urls';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
const Signup = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormTypes>({
    mode: 'onBlur',
    resolver: yupResolver(RegistrationSchema),
  });

  const { token } = authStore();
  const router = useRouter();
  const submitHandler: SubmitHandler<RegisterFormTypes> = async (data) => {
    console.log(data);
    // return new Promise((resolve) => {
    // setTimeout(async () => {
    const newdata = {
      ...data,
      contact_number: '+91' + data['contact_number'],
    };
    console.log(newdata);
    const returnValue = await CreateUser(createUser, newdata);
    if (returnValue == 1) {
      // resolve(isSubmitting);
      toast.success('Link has sent to your email to activate your account');
      router.push('/login');
    } else toast.error('Could not create account');
    // }, 3000);
    // });
  };

  return (
    <>
      <Toaster />
      <div className="mx-auto px-4 py-6 flex flex-col justify-top items-center h-screen">
        <Heading />
        <Form
          buttonLabel="Register"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={submitHandler}
          loading={isSubmitting}
          className="bg-gray-100 px-4 py-8 md:p-8 shadow-md flex flex-col justify-evenly rounded-lg w-full sm:w-3/5 lg:w-1/2 xl:w-2/3 2xl:w-2/5 max-w-7xl"
        >
          {/* First Name input*/}
          <Input
            name="full_name"
            type="text"
            label="Full Name"
            wrapperClass="col-span-4"
            placeholder="Enter your full name"
            error={errors.full_name?.message}
            autoFocus
          />
          {/* Last Name input */}
          {/* <Input
            name="last_name"
            type="text"
            label="Last Name"
            wrapperClass="col-span-2"
            placeholder="Enter your first name"
            error={errors.last_name?.message}
            autoFocus
          /> */}
          {/* Email input */}
          <Input
            name="email"
            type="email"
            label="Email"
            wrapperClass="mt-3 flex flex-col col-span-4"
            placeholder="Enter your email"
            error={errors.email?.message}
            autoFocus
          />

          {/* Father's Name input */}
          <Input
            name="fathers_name"
            type="text"
            label="Father's Name"
            wrapperClass="mt-3 col-span-4"
            placeholder="Enter your father's name"
            error={errors.fathers_name?.message}
            autoFocus
          />

          <Input
            name="mothers_name"
            type="text"
            label="Mother's Name"
            wrapperClass="mt-3 col-span-4"
            placeholder="Enter your mother's name"
            error={errors.mothers_name?.message}
            autoFocus
          />
          {/* Contact number input */}

          <PhoneInput
            name="contact_number"
            type="tel"
            label="Contact Number"
            wrapperClass="mt-3 col-span-4 md:col-span-2"
            placeholder="+91-9986670093"
            error={errors.contact_number?.message}
            autoFocus
          />

          {/* DOB Input */}

          <Input
            name="dob"
            type="date"
            label="Date of birth"
            placeholder="DOB"
            wrapperClass="mt-3 grid col-span-4 md:col-span-2 md:h-16"
            error={errors.dob?.message}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={Gender}
                label="Gender"
                error={errors.gender?.message}
                autoFocus
              />
            )}
          />
          {/* Qualifications Input */}
          {/* <Input
            name="qualification"
            type="search"
            label="Qualification"
            list="qualification-list"
            placeholder="Enter qualification"
            wrapperClass="mt-3 grid col-span-4 md:col-span-2 md:h-16"
            error={errors.qualification?.message}
          /> */}

          {/* Profession Input */}
          <Input
            name="profession"
            type="search"
            label="Profession"
            list="profession-list"
            placeholder="Enter qualification"
            wrapperClass="mt-3 grid col-span-4 md:col-span-2"
            error={errors.profession?.message}
          />

          {/* Password input */}
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            wrapperClass="mt-3 grid col-span-4"
            error={errors.password?.message}
          />
          <Input
            name="confirm_password"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            wrapperClass="my-3 grid col-span-4"
            error={errors.confirm_password?.message}
          />
        </Form>
        <Footer />
        <datalist id="qualification-list">
          {qualifications.map((data, index) => (
            <option key={'Qualification-datalist' + index}>{data}</option>
          ))}
        </datalist>
        <datalist id="profession-list">
          {professions.map((data, index) => (
            <option key={'Profession-datalist' + index * 2}>{data}</option>
          ))}
        </datalist>
      </div>
    </>
  );
};

const qualifications = [
  'Graduate',
  'Post Graduate',
  'Doctorate',
  'High School',
  'Others',
];

const professions = [
  'Singer',
  'Student',
  'Government Employee',
  'Business',
  'Teacher',
  'Unemployed',
  'Self employed',
  'Others',
];

// Registration Header
const Heading = () => (
  <div className="py-6 px-4 text-center">
    <h2 className="font-medium text-2xl text-gray-700">Registration</h2>
    <h1 className="text-6xl py-2 font-extrabold">NOC Portal</h1>
    <h3 className="text-2xl text-red-500 font-medium">Embassy of Nepal</h3>
    <p className="text-xs tracking-widest uppercase font-semibold text-gray-500">
      New Delhi, India
    </p>
  </div>
);

// Footer Links

const Footer = () => (
  <div className="flex flex-col text-center pb-6">
    <div className="py-3 px-4 flex justify-between space-x-6">
      <Link href="/login">
        <a className="text-gray-700 font-semibold text-sm">
          Already Registered?{' '}
          <span className="text-blue-700 hover:text-blue-600 duration-200">
            Login
          </span>
        </a>
      </Link>
      <Link href="/request-password-reset">
        <a className="text-gray-500 hover:text-gray-700 duration-200 text-sm">
          Forgot Password?
        </a>
      </Link>
    </div>
    <div>
      <Link href="#!">
        <a className="text-gray-500 hover:text-gray-600 duration-200 text-xs">
          Need help?
        </a>
      </Link>
    </div>
  </div>
);

export default Signup;
