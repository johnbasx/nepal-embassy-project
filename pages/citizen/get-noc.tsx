import React, { useEffect, useState } from 'react';

import EmptyData from '@components/common/EmptyData';
import PendingNoc from '@components/citizen/getNoc/PendingNoc';
import RejectedNoc from '@components/citizen/getNoc/RejectedNoc';
import VerifiedNoc from '@components/citizen/getNoc/VerifiedNoc';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { citizenNocDocumentList } from 'content/api-urls';
import pageTitleStore from '../../store/selectUsersStore';
import GetNocCard from '@components/citizen/getNoc/GetNocCard';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

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

  // const GetDocuments = ({
  //   profile,
  //   verified_status,
  //   travel_type,
  //   id,
  //   created_at,
  //   payment_screen_shot,
  // }: NocListType) => {
  //   if (verified_status == '1') {
  //     return (
  //       <PendingNoc
  //         profile={profile}
  //         nocId={id}
  //         travel_type={travel_type}
  //         NocId={id}
  //         ApplyDate={created_at}
  //         paymentScreenShot={payment_screen_shot}
  //       />
  //     );
  //   } else if (verified_status == '3') {
  //     return (
  //       <VerifiedNoc
  //         profile={profile}
  //         travel_type={travel_type}
  //         NocId={id}
  //         ApplyDate={created_at}
  //       />
  //     );
  //   } else if (verified_status == '2') {
  //     return (
  //       <RejectedNoc
  //         profile={profile}
  //         travel_type={travel_type}
  //         NocId={id}
  //         ApplyDate={created_at}
  //       />
  //     );
  //   } else return null;
  // };
  // const listItem = nocList.map((noc, index) => (
  //   <div key={index}>
  //     <GetDocuments
  //       profile={noc.profile}
  //       verified_status={noc.verified_status}
  //       id={noc.id}
  //       travel_type={noc.travel_type}
  //       created_at={noc.created_at}
  //       payment_screen_shot={noc.payment_screen_shot}
  //     />
  //   </div>
  // ));

  return (
    <div className="min-h-screen px-2 py-8 font-sans bg-gray-100 app min-w-screen">
      <div className="mx-auto space-y-3 lg:px-4">
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
{
  /* <div className="mx-auto space-y-3 max-w-7xl">{listItem}</div> */
}

export default GetNoc;
