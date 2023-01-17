import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterFormTypes,
  RegistrationSchema,
} from '@components/registration/Validation';
import toast, { Toaster } from 'react-hot-toast';

import { BASE_URL } from 'content/api-urls';
import { CreateUser } from '@utils/fetcher';
import Form from '@components/registration/Form';
import { Gender } from '@content/drop-down-items';
import Input from '@components/registration/Input';
import Link from 'next/link';
import PhoneInput from '@components/registration/PhoneInput';
import Select from '@components/registration/Select';
import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
  const {
    register,
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
    const newdata = {
      ...data,
      contact_number: '+91' + data['contact_number'],
    };
    console.log(newdata);
    const returnValue = await CreateUser(
      token,
      BASE_URL + 'addRelative',
      newdata
    );

    if (returnValue == 1) {
      toast.success('You have just added a relative');
      router.push('/citizen/profile');
    } else toast.error('Could not add relative');
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center px-4 py-6 mx-auto justify-top">
        <Form
          buttonLabel="Add relative"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={submitHandler}
          loading={isSubmitting}
          className="flex flex-col w-full max-w-lg px-4 py-2 bg-white rounded-lg md:p-8 justify-evenly sm:w-3/5 lg:w-1/2 xl:w-2/3 2xl:w-2/5"
        >
          <Input
            name="full_name"
            type="text"
            label="Full Name"
            wrapperClass="col-span-4"
            placeholder="Enter your full name"
            error={errors.full_name?.message}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            wrapperClass="mt-3 flex flex-col col-span-4"
            placeholder="Enter your email"
            error={errors.email?.message}
          />
          <Input
            name="relationship"
            type="text"
            label="Relation"
            wrapperClass="mt-3 flex flex-col col-span-4"
            placeholder="Enter your relation"
            error={errors.simple_text_input?.message}
          />
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

          <PhoneInput
            name="contact_number"
            type="tel"
            label="Contact Number"
            wrapperClass="mt-3 col-span-4 md:col-span-2"
            placeholder="9986670093"
            error={errors.contact_number?.message}
          />

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

          <Input
            name="profession"
            type="text"
            label="Profession"
            // list="profession-list"
            placeholder="Enter profession"
            wrapperClass="mt-3 grid col-span-4 md:col-span-2"
            error={errors.profession?.message}
          />
        </Form>

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

export default Signup;
