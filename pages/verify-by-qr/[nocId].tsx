import { BASE_URL, IMAGE_BASE_URL } from '@content/api-urls';
import React, { useEffect, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import { NOCType } from '@utils/interface';
import PDF from '@components/PDF';
import axios from 'axios';
import pageTitleStore from '@store/selectUsersStore';

const PublicNoc: React.FC<{ certificateData: NOCType }> = ({
  certificateData,
}) => {
  const { setPageTitle } = pageTitleStore();

  const [qrCodeValue, setQrCodeValue] = useState(
    `${IMAGE_BASE_URL}:3000/verify-by-qr/` + certificateData.id
  );

  useEffect(() => {
    setPageTitle('Verifaction of NOC by QR code');
  }, []);

  return (
    <div className="p-0 mx-auto overflow-scroll max-w-7xl print:p-0 print:w-auto print:m-0">
      <PDF
        {...certificateData}
        qrCodeValue={qrCodeValue}
        allowDownload={false}
      />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let certificateData;
  const url = `${BASE_URL}getNocByQr/${context.query.nocId}`;
  try {
    const response = await axios(url);
    certificateData = response.data;
  } catch (e: any) {
    throw new Error(e);
  }
  return { props: { certificateData } };
}

export default PublicNoc;
