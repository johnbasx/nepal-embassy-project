import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterFormTypes,
  RelativeValidationSchema,
} from '@components/registration/RelativeValidation';
import toast, { Toaster } from 'react-hot-toast';

import { BASE_URL } from 'content/api-urls';
import { CreateUser } from '@utils/fetcher';
import Form from '@components/registration/Form';
import { Gender } from '@content/drop-down-items';
import Image from 'next/image';
import Input from '@components/registration/Input';
import Link from 'next/link';
import PhoneInput from '@components/registration/PhoneInput';
import Select from '@components/registration/Select';
import authStore from '@store/useAuthStore';
import pageTitleStore from '@store/selectUsersStore';
import { useEffect } from 'react';
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
    resolver: yupResolver(RelativeValidationSchema),
  });

  const { token } = authStore();
  const router = useRouter();

  const submitHandler: SubmitHandler<RegisterFormTypes> = async (data) => {
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
  const { setPageTitle } = pageTitleStore();

  useEffect(() => {
    setPageTitle('Add relative profile');
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center px-4 py-6 mx-auto justify-top">
        {/* <div className="mb-3 text-xl font-semibold">
          Add relative profile details
        </div> */}
        <Heading />
        <Form
          buttonLabel="Add relative data"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={submitHandler}
          loading={isSubmitting}
          className="flex flex-col w-full px-4 py-2 bg-white max-w-7xl rounded-xl md:p-8 justify-evenly"
        >
          <Input
            name="full_name"
            type="text"
            label="Full Name"
            extraLabel={requiredLabel}
            wrapperClass="mt-3 md:mt-0 col-span-4 md:col-span-2"
            placeholder="Enter full name"
            error={errors.full_name?.message}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            extraLabel={requiredLabel}
            extraInfo={extraEmailInfo}
            wrapperClass="mt-3 md:mt-0 flex flex-col col-span-4 md:col-span-2"
            placeholder="Enter email"
            error={errors.email?.message}
          />
          <div className="col-span-4 mt-3">
            <h3 className="text-gray-700">
              Please provide details of the registered user if the relative of
              the person you are applying for(applicant) has no valid details
              such as email or contact number.
            </h3>
          </div>
          <PhoneInput
            name="contact_number"
            type="tel"
            label="Contact Number"
            extraLabel={requiredLabel}
            wrapperClass="mt-3 col-span-4 md:col-span-2"
            placeholder="9986670093"
            error={errors.contact_number?.message}
          />
          <Input
            name="relationship"
            type="text"
            label="Relation"
            extraLabel={requiredRelationLabel}
            wrapperClass="mt-3 flex flex-col col-span-4 lg:col-span-2"
            placeholder="Enter your relation"
            error={errors.relationship?.message}
          />
          <Input
            name="fathers_name"
            type="text"
            label="Father's Name"
            extraLabel={requiredLabel}
            wrapperClass="mt-3 flex flex-col col-span-4 lg:col-span-2"
            placeholder="Enter your father's name"
            error={errors.fathers_name?.message}
          />

          <Input
            name="mothers_name"
            type="text"
            label="Mother's Name"
            extraLabel={requiredLabel}
            wrapperClass="mt-3 col-span-4 md:col-span-2"
            placeholder="Enter your mother's name"
            error={errors.mothers_name?.message}
          />

          <Input
            name="dob"
            type="date"
            label="Date of birth"
            extraLabel={requiredLabel}
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
                extraLabel={requiredLabel}
                error={errors.gender?.message}
              />
            )}
          />

          <Input
            name="profession"
            type="text"
            label="Profession"
            extraLabel={optionalLabel}
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

let requiredLabel = (
  <span className="text-xs font-normal text-red-500">(required)*</span>
);
let requiredRelationLabel = (
  <span className="text-xs font-normal text-red-500">
    (required)* Relationship with the registered user
  </span>
);
let optionalLabel = (
  <span className="text-xs font-normal text-gray-400">(optional)</span>
);
let extraEmailInfo = (
  <span className="mt-1 leading-snug text-gray-500 text-2xs">
    Please provide email for the registered user if the email for the applicant
    is not available.
  </span>
);

// Registration Header
const Heading = () => (
  <div className="px-4 py-2 text-center w-full flex-row">
    {/* <Image
      className="w-auto h-20 mx-auto"
      src="/images/logo-only.jpg"
      alt="Nepal Embassy Logo"
      height={80}
      width={80}
    /> */}
    <h2 className=" text-lg font-medium text-gray-700">
      Add relative profile details
    </h2>
    {/* <h1 className="text-3xl font-extrabold">NOC Portal Signup</h1>
    <h3 className="mt-2 text-lg font-medium text-red-500">Embassy of Nepal</h3>
    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
      New Delhi, India
    </p> */}
  </div>
);

export default Signup;
