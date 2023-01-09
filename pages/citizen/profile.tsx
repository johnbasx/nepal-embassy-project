import { FetchData, Update } from '@utils/fetcher';
import { Gender, Qualifications } from 'content/drop-down-items';
import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '@content/api-urls';
import toast, { Toaster } from 'react-hot-toast';

import Loading from '@components/common/Loading';
import type { NextPage } from 'next';
import PersonalInfo from '@components/citizen/profile/PersonalInfo';
import authStore from '@store/useAuthStore';
import pageTitleStore from '../../store/selectUsersStore';
import Footer from '@components/citizen/layout/Footer';

export interface UserDetailProps {
  id: string;
  full_name: string;
  email: string;
  contact_number?: string;
  dob?: string;
  profile_photo?: any;
  age?: number;
  gender: string;
  profession?: string;
  qualification?: string;
  fathers_name?: string;
  mothers_name?: string;
  fathers_qualification?: string;
  mothers_qualification?: any;
  created_at: Date;
  user: number;
}

const Profile: NextPage = () => {
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [userDetail, setUserDetail] = useState<UserDetailProps>();
  const [updating, setUpdating] = useState<Boolean>(false);
  const [contactNumber, setcontactNumber] = useState(
    userDetail?.contact_number
  );
  const [profession, setprofession] = useState(userDetail?.profession);
  const [dob, setDob] = useState<string>();
  const [gender, setGender] = useState(userDetail?.gender);
  const [qualification, setQualification] = useState(userDetail?.qualification);
  const [fathersName, setFathersName] = useState(userDetail?.fathers_name);
  const [mothersName, setMothersName] = useState(userDetail?.mothers_name);

  const data = {
    contact_number: contactNumber,
    profession: profession,
    dob: dob,
    gender: gender,
    qualification: qualification,
    fathers_name: fathersName,
    mothers_name: mothersName,
  };

  useEffect(() => {
    setPageTitle('Profile');
    const getProfile = async () => {
      const returnData = await FetchData(token, getUserProfile);
      setUserDetail(returnData);
    };
    getProfile();
  }, []);

  const UpdateProfile = async (e: React.MouseEvent<HTMLElement>) => {
    setUpdating(true);
    e.preventDefault();
    const returnValue = await Update(
      token,
      updateUserProfile + userDetail?.id,
      data
    );
    returnValue == 1
      ? toast.success('Profile updated')
      : toast.error('Unable to update');
    setUpdating(false);
  };

  return (
    <div className="p-4">
      <div className="max-w-5xl px-4 py-4 mx-auto bg-white md:my-2 rounded-2xl md:shadow">
        <Toaster />
        <form
          className="divide-y divide-gray-200 lg:col-span-9"
          action="#"
          method="POST"
        >
          {/* Profile section */}
          <div className="px-4 py-4 sm:p-6">
            <div>
              <h2 className="text-xl font-semibold leading-6 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-2 text-xs text-gray-600">
                The details as per your profile registration. You can also
                update your details here.
              </p>
            </div>

            {userDetail && (
              <PersonalInfo
                user={userDetail.user}
                full_name={userDetail?.full_name}
                email={userDetail?.email}
              />
            )}

            <div className="grid grid-cols-12 gap-6 mt-6">
              <div className="col-span-12">
                <h2 className="text-lg font-semibold leading-6 text-gray-900">
                  Profile Information
                </h2>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm">
                    IN
                  </span>
                  <input
                    type="text"
                    name="contact-number"
                    id="contact-number"
                    autoComplete="contact-number"
                    className="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-sky-500 focus:border-sky-500 rounded-r-md sm:text-sm"
                    defaultValue={userDetail?.contact_number}
                    onChange={(e) => setcontactNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <input
                  type="profession"
                  name="profession"
                  id="profession"
                  list="profession-list"
                  autoComplete="profession"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  defaultValue={userDetail?.profession}
                  onChange={(e) => setprofession(e.target.value)}
                />
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  autoComplete="dob"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="DD-MM-YY"
                  onChange={(e) => setDob(e.target.value)}
                  defaultValue={userDetail?.dob}
                />
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  required
                  name="gender"
                  value={gender}
                  autoComplete="gender"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  {Gender.map(
                    (item) => (
                      <option key={'option' + item} value={item}>
                        {item}
                      </option>
                    )
                    // userDetail?.gender == item ? (
                    //   <option key={'option' + item} value={item}>
                    //     {item}
                    //   </option>
                    // ) : (
                    //   <option key={'unselected' + item} value={item}>
                    //     {item}
                    //   </option>
                    // )
                    // item === userDetail?.gender ? (
                    //   <option
                    //     key={'selected' + item}
                    //     value={'DEF'}
                    //     // defaultValue={item+"$$"}
                    //   >
                    //     {item}
                    //   </option>
                    // ) : (
                    //   <option key={'unselected' + item}>{item+"chup"}</option>
                    // )
                  )}
                </select>
              </div>

              {/* <div className="col-span-12 sm:col-span-4">
              <label
                htmlFor="qualification"
                className="block text-sm font-medium text-gray-700"
              >
                Qualification
              </label>
              <select
                id="qualification"
                required
                disabled
                name="qualification"
                autoComplete="qualification"
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setQualification(e.target.value)}
              >
                {Qualifications.map((item) =>
                  item == userDetail?.qualification ? (
                    <option defaultValue={item} key={'qualification-' + item}>
                      {item}
                    </option>
                  ) : (
                    <option key={'qualification' + item}>{item}</option>
                  )
                )}
              </select>
            </div> */}

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="father-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Father Name
                </label>
                <input
                  type="text"
                  name="father-name"
                  id="father-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  onChange={(e) => setFathersName(e.target.value)}
                  defaultValue={userDetail?.fathers_name}
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="mother-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother Name
                </label>
                <input
                  type="text"
                  name="mother-name"
                  id="mother-name"
                  autoComplete="organization"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  onChange={(e) => setMothersName(e.target.value)}
                  defaultValue={userDetail?.mothers_name}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-end px-8 pb-6">
          {!updating ? (
            <button
              onClick={(e) => UpdateProfile(e)}
              className="w-auto px-8 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <UpdatingButton />
          )}
        </div>
        <datalist id="profession-list">
          {professions.map((data, index) => (
            <option key={'Profession-datalist' + index * 2}>{data}</option>
          ))}
        </datalist>
        <Footer />
      </div>
    </div>
  );
};

const UpdatingButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-auto px-4 py-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
    >
      <Loading />
      Saving
    </button>
  );
};

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
export default Profile;
