import React, { useEffect, useState } from 'react';

import PendingNoc from '@components/citizen/getNoc/PendingNoc';
import RejectedNoc from '@components/citizen/getNoc/RejectedNoc';
import VerifiedNoc from '@components/citizen/getNoc/VerifiedNoc';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { citizenNocDocumentList } from 'content/api-urls';
import pageTitleStore from '../../store/selectUsersStore';
import { useRouter } from 'next/router';

export interface NocListType {
  id?: string;
  created_at?: string;
  noc_type?: string;
  verified_status?: string;
  payment_screen_shot?: string | null;
}

const GetNoc = () => {
  const router = useRouter();
  const { token, isAuthenticated } = authStore();
  // console.log(token);
  const [verifiedStatus, setVerifiedStatus] = useState<string>('');
  const { setPageTitle } = pageTitleStore();
  const [nocList, setNocList] = useState<NocListType[]>([]);

  const getNocList = async () => {
    // const url = `http://192.168.29.199:8000/citizenNocDocumentList`;
    try {
      const response = await axios(citizenNocDocumentList, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      setNocList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setPageTitle('Get Noc');
    getNocList();
  }, []);

  const GetDocuments = ({
    verified_status,
    noc_type,
    id,
    created_at,
    payment_screen_shot,
  }: NocListType) => {
    if (verified_status == '1') {
      return (
        <PendingNoc
          nocId={id}
          NocType={noc_type}
          NocId={id}
          ApplyDate={created_at}
          paymentScreenShot={payment_screen_shot}
        />
      );
    } else if (verified_status == '3') {
      return (
        <VerifiedNoc NocType={noc_type} NocId={id} ApplyDate={created_at} />
      );
    } else if (verified_status == '2') {
      return (
        <RejectedNoc NocType={noc_type} NocId={id} ApplyDate={created_at} />
      );
    } else return null;
  };
  const listItem = nocList.map((noc, index) => (
    <div key={index}>
      <GetDocuments
        verified_status={noc.verified_status}
        id={noc.id}
        noc_type={noc.noc_type}
        created_at={noc.created_at}
        payment_screen_shot={noc.payment_screen_shot}
      />
    </div>
  ));

  // let content;
  // if (token) {
  //   content = (
  //     <div className="app min-w-screen min-h-screen bg-gray-100 py-8 px-2 font-sans">
  //       <div className="mail__wrapper mx-auto max-w-7xl space-y-3">
  //         {listItem}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="app min-w-screen min-h-screen bg-gray-100 py-8 px-2 font-sans">
      <div className="mail__wrapper mx-auto max-w-7xl space-y-3">
        {listItem}
      </div>
    </div>
  );
};

export default GetNoc;
