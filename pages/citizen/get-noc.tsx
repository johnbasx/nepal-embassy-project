import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import React, { useEffect, useState } from 'react';

import EmptyData from '@components/common/EmptyData';
import GetNocCard from '@components/citizen/getNoc/GetNocCard';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { citizenNocDocumentList } from 'content/api-urls';
import pageTitleStore from '../../store/selectUsersStore';

export interface nocOwner {
  full_name: string;
  dob: string;
  email: string;
}
export interface NocListType {
  id?: string;
  created_at?: string;
  travel_type?: 'Direct' | 'Connecting';
  // travel_type?: string;
  verified_status?: string;
  payment_screen_shot?: string | null;
  profile: nocOwner;
}

const GetNoc = () => {
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [nocList, setNocList] = useState<NocListType[]>([]);

  const getNocList = async () => {
    try {
      const response = await axios(citizenNocDocumentList, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      // console.log(response);
      setNocList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setPageTitle('Get Noc');
    getNocList();
  }, []);

  return (
    <div className="min-h-screen px-2 py-8 font-sans bg-gray-100 app min-w-screen">
      <div className="mx-auto space-y-3 lg:px-4">
        <div className="bg-white rounded-xl text-gray-800 text-sm p-4 px-6 space-y-1">
          <h3 className="text-2xl font-bold">Payment Details</h3>
          <p>Name: Embassy of Nepal</p>
          <p>A/C No: 50200058949431</p>
          <p>IFSC Code: HDFC0001220</p>
          <p>HDFC Bank, M-36 Cammaught Place</p>
        </div>
        {nocList.length > 0 &&
          nocList.map((detail, index) => (
            <GetNocCard {...detail} key={'get NOC card' + index * 3} />
          ))}
      </div>
      {nocList.length <= 0 && (
        <EmptyData
          content="You haven't applied for NOC"
          link="/citizen/apply-for-noc"
          linkContent="Apply for NOC"
        />
      )}
      {/* For pagination if NOC list is too long */}
      <div className="flex items-center justify-end my-3 space-x-2 lg:px-4">
        <button
          disabled
          className="inline-flex items-center space-x-1 text-center px-3 py-1.5 border border-gray-300 bg-white rounded-md text-sm"
        >
          <MdOutlineKeyboardArrowLeft />
          <span>Previous</span>
        </button>
        <button
          disabled
          className="inline-flex space-x-1 items-center text-center px-3 py-1.5 border border-gray-300 bg-white rounded-md text-sm"
        >
          <span>Next</span>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default GetNoc;
