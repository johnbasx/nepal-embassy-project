/* eslint-disable @next/next/no-img-element */

import { IMAGE_BASE_URL } from '@content/api-urls';
import { PDfGenProps } from '.';
import QRCode from 'react-qr-code';
import { textBodyStyles } from './NocContent';

const PDfFooter = ({ ...data }: PDfGenProps) => (
  <div className="flex justify-between" style={textBodyStyles}>
    <div className="">
      <div className="flex flex-col items-start justify-center mx-auto mt-8">
        <QRCode value={data.qrCodeValue} size={150} className="" />
        <span className="inline-flex w-[150px] text-center mt-2 font-normal text-gray-400 text-3xs">
          Scan this to verify or view the issued NOC Document
        </span>
      </div>
    </div>
    <div className="flex flex-col items-end justify-center">
      <div className="flex items-end justify-center px-4">
        <img
          // width={100}
          // height={100}
          src={IMAGE_BASE_URL + '/media/' + data.signature}
          alt="embassy signature"
          className="object-contain h-16 -rotate-12"
        />
      </div>
      {/* <Signature /> */}
      <div className="flex flex-col items-center justify-center font-serif text-center">
        <p className="font-bold">{data.verified_by}</p>
        <p>({data.employee_desigation})</p>
      </div>
    </div>
  </div>
);

export default PDfFooter;
