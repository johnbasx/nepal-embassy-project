import { BASE_URL } from '@content/api-urls';
import { GetServerSidePropsContext } from 'next';
import HeadSection from '@components/nocCirtificate/HeadSection';
import { NOCType } from 'pages/citizen/download-noc';
import React from 'react';
import axios from 'axios';

const PublicNoc: React.FC<{ certificateData: NOCType }> = ({
  certificateData,
}) => {
  return (
    <div
      className="mt-6
          lg:w-wa4 lg:h-ha4 shadow-2xl overflow-auto"
    >
      <div
        id="cirtificate"
        className="flex flex-col justify-start p-6 items-center space-y-6 "
      >
        <HeadSection />

        <h1 className="font-bold text-gray-900 text-xs uppercase underline decoration-solid">
          TO WHOM IT MAY CONCERN
        </h1>
        <div>
          <p className="text-2xs text-gray-800 font-base indent-14 text-justify">
            Based on the documents submitted at this Embassy, this is to state
            that{' '}
            <span className="font-bold">Mr. {certificateData.full_name}</span>{' '}
            (holder of Nepal{' '}
            <span className="font-bold">
              Passport No. {certificateData.passport}
            </span>
            ), currently staying in India, is intending to travel to{' '}
            {certificateData.travel_country} using airport in India shortly.
          </p>
        </div>
        <div>
          <p className="text-2xs text-gray-800 font-base indent-14 text-justify">
            Any needful extended to him during his journey from India to the
            United Arab Emirates, as per the existing rules and regulation,
            would be highly appriciated.
          </p>
        </div>
        <div className=" flex justify-end w-full">
          {/* <div className="mt-6">
              <QRCode value={qrCodeValue} size={100} className="w-full" />
              
            </div> */}
          <div className="mt-2">
            <img
              src="/images/signature.png"
              alt="signature"
              className="pl-6 h-14 lg:h-32"
            />
            <p className="font-bold text-2xs">
              ({certificateData.verified_by})
            </p>
            <h1 className="font-medium text-right text-gray-700 text-2xs">
              Third Secretary
            </h1>
          </div>
        </div>
        <div className="lg:text-sm md:text-xs text-3xs flex flex-col pb-2 border-t-4 mt-40 pt-2 border-red-600 justify-end items-center text-center font-medium tracking-tighter">
          <p>
            Barakhamba Road, New Delhi-110001, India, Tel.: +91-11-23476200 /
            +91-11-23327361, Hotline : +91-8929601925
          </p>
          <p>Website : in.npalembassy.gov.np</p>
        </div>
      </div>
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
