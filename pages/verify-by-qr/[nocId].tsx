import { BASE_URL, IMAGE_BASE_URL } from '@content/api-urls';
import { GetServerSidePropsContext } from 'next';
import HeadSection from '@components/nocCirtificate/HeadSection';
import { NOCType } from 'pages/citizen/download-noc';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PDF from '@components/PDF';
import Footer from '@components/citizen/layout/Footer';
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
    // <div
    //   className="mt-6 overflow-auto shadow-2xl // lg:w-wa4 lg:h-ha4"
    // >
    //   <div
    //     id="cirtificate"
    //     className="flex flex-col items-center justify-start p-6 space-y-6 "
    //   >
    //     <HeadSection />

    //     <h1 className="text-xs font-bold text-gray-900 underline uppercase decoration-solid">
    //       TO WHOM IT MAY CONCERN
    //     </h1>
    //     <div>
    //       <p className="text-justify text-gray-800 text-2xs font-base indent-14">
    //         Based on the documents submitted at this Embassy, this is to state
    //         that{' '}
    //         <span className="font-bold">Mr. {certificateData.full_name}</span>{' '}
    //         (holder of Nepal{' '}
    //         <span className="font-bold">
    //           Passport No. {certificateData.passport}
    //         </span>
    //         ), currently staying in India, is intending to travel to{' '}
    //         {certificateData.travel_country} using airport in India shortly.
    //       </p>
    //     </div>
    //     <div>
    //       <p className="text-justify text-gray-800 text-2xs font-base indent-14">
    //         Any needful extended to him during his journey from India to the
    //         United Arab Emirates, as per the existing rules and regulation,
    //         would be highly appriciated.
    //       </p>
    //     </div>
    //     <div className="flex justify-end w-full ">
    //       {/* <div className="mt-6">
    //           <QRCode value={qrCodeValue} size={100} className="w-full" />

    //         </div> */}
    //       <div className="mt-2">
    //         <img
    //           src="/images/signature.png"
    //           alt="signature"
    //           className="pl-6 h-14 lg:h-32"
    //         />
    //         <p className="font-bold text-2xs">
    //           ({certificateData.verified_by})
    //         </p>
    //         <h1 className="font-medium text-right text-gray-700 text-2xs">
    //           Third Secretary
    //         </h1>
    //       </div>
    //     </div>
    //     <div className="flex flex-col items-center justify-end pt-2 pb-2 mt-40 font-medium tracking-tighter text-center border-t-4 border-red-600 lg:text-sm md:text-xs text-3xs">
    //       <p>
    //         Barakhamba Road, New Delhi-110001, India, Tel.: +91-11-23476200 /
    //         +91-11-23327361, Hotline : +91-8929601925
    //       </p>
    //       <p>Website : in.npalembassy.gov.np</p>
    //     </div>
    //   </div>
    // </div>
    <div className="p-0 mx-auto overflow-scroll max-w-7xl print:p-0 print:w-auto print:m-0">
      <PDF
        {...certificateData}
        qrCodeValue={qrCodeValue}
        allowDownload={false}
      />
      {/* <Footer /> */}
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
