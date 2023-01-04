import React, { useEffect, useState } from 'react';

import EmptyData from '@components/common/EmptyData';
import PendingNoc from '@components/citizen/getNoc/PendingNoc';
import RejectedNoc from '@components/citizen/getNoc/RejectedNoc';
import VerifiedNoc from '@components/citizen/getNoc/VerifiedNoc';
import authStore from '@store/useAuthStore';
import axios from 'axios';
import { citizenNocDocumentList } from 'content/api-urls';
import pageTitleStore from '../../store/selectUsersStore';

export interface NocListType {
  id?: string;
  created_at?: string;
  noc_type?: string;
  verified_status?: string;
  payment_screen_shot?: string | null;
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

  return (
    <div className="app min-w-screen min-h-screen bg-gray-100 py-8 px-2 font-sans">
      {nocList.length > 0 ? (
        <div className="mail__wrapper mx-auto max-w-7xl space-y-3">
          {listItem}
        </div>
      ) : (
        <EmptyData
          content="You haven't applied for NOC"
          link="/citizen/apply-for-noc"
          linkContent="Apply for NOC"
        />
      )}
    </div>
  );
};

export default GetNoc;
