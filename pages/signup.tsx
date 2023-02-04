import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import {
  RegisterFormTypes,
  RegistrationSchema,
} from '@components/registration/Validation';
import toast, { Toaster } from 'react-hot-toast';

import { BASE_URL } from 'content/api-urls';
import Form from '@components/registration/Form';
import { Gender } from '@content/drop-down-items';
import Input from '@components/registration/Input';
import Link from 'next/link';
import PhoneInput from '@components/registration/PhoneInput';
import Select from '@components/registration/Select';
import axios from 'axios';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
  const {
    register,
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormTypes>({
    mode: 'onBlur',
    resolver: yupResolver(RegistrationSchema),
  });

  const router = useRouter();
  const submitHandler: SubmitHandler<RegisterFormTypes> = async (data) => {
    // return new Promise((resolve) => {
    // setTimeout(async () => {
    console.log(data);
    const newdata = {
      ...data,
      contact_number:
        data['contact_number'] != '' ? '+91' + data['contact_number'] : '',
    };

    try {
      const response = await axios.post(BASE_URL + 'createUser', newdata);
      console.log(response);
      toast.success(
        'Activation link has been sent to your email. Please verify your email'
      );
      router.push('/login');
    } catch (e: any) {
      e.response.data.email
        ? (console.log(e.response.data.email[0]),
          errors.email?.message,
          toast.error(e.response.data.email[0]))
        : e.response.data.message
        ? toast.error(e.response.data.message)
        : toast.error('Something went wrong');
      reset();
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center px-4 py-6 mx-auto justify-top">
        <Heading />
        <Form
          buttonLabel="Register"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={submitHandler}
          loading={isSubmitting}
          className="flex flex-col w-full max-w-lg px-4 py-2 bg-white rounded-lg md:p-8 justify-evenly sm:w-3/5 lg:w-1/2 xl:w-2/3 2xl:w-2/5"
        >
          {/* First Name input*/}
          <Input
            name="full_name"
            type="text"
            label="Full Name"
            wrapperClass="col-span-4"
            placeholder="Enter your full name"
            error={errors.full_name?.message}
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
          />

          {/* Father's Name input */}
          <Input
            name="fathers_name"
            type="text"
            label="Father's Name"
            wrapperClass="mt-3 col-span-4"
            placeholder="Enter your father's name"
            error={errors.fathers_name?.message}
          />

          <Input
            name="mothers_name"
            type="text"
            label="Mother's Name"
            wrapperClass="mt-3 col-span-4"
            placeholder="Enter your mother's name"
            error={errors.mothers_name?.message}
          />
          {/* Contact number input */}

          <PhoneInput
            name="contact_number"
            type="tel"
            required={false}
            label="Contact Number"
            wrapperClass="mt-3 col-span-4 md:col-span-2"
            placeholder="9986670093"
            error={errors.contact_number?.message}
          />

          {/* DOB Input */}

          <Input
            name="dob"
            type="date"
            label="Date of birth"
            placeholder="Select DOB"
            min="1899-01-01"
            max="2007-01-01"
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
            type="text"
            label="Profession"
            // list="profession-list"
            placeholder="Enter profession"
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
  <div className="px-4 py-6 text-center">
    <img
      className="w-auto h-20 mx-auto"
      src="/images/logo-only.jpg"
      alt="Nepal Embassy Logo"
    />
    <h2 className="mt-4 text-lg font-medium text-gray-700">
      User Registration
    </h2>
    <h1 className="text-3xl font-extrabold">NOC Portal Signup</h1>
    <h3 className="mt-2 text-lg font-medium text-red-500">Embassy of Nepal</h3>
    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
      New Delhi, India
    </p>
  </div>
);

// Footer Links

const Footer = () => (
  <div className="flex flex-col pb-6 text-center">
    <div className="flex justify-between px-4 py-3 space-x-6">
      <Link href="/login">
        <a className="text-sm font-medium text-gray-400">
          Already Registered?{' '}
          <span className="font-semibold text-blue-700 duration-200 hover:text-blue-600">
            Login
          </span>
        </a>
      </Link>
      <Link href="/request-password-reset">
        <a className="text-sm text-gray-500 duration-200 hover:text-gray-700">
          Forgot Password?
        </a>
      </Link>
    </div>
    <div>
      <Link href="#!">
        <a className="text-xs text-gray-500 duration-200 hover:text-gray-600">
          Need help?
        </a>
      </Link>
    </div>
  </div>
);

export default Signup;
