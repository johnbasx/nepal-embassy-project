/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import PdfHeader from './PDFHeader';
// import PDfFooter from "./PDFFooter";
import '@styles/pdf.module.css';
import ReactToPrint from 'react-to-print';
import { NOCType } from '@utils/interface';

import QRCode from 'react-qr-code';
import { EmbassyStamp } from './EmbassyStamp';
import {
  ContentBodyNOC_1,
  ContentBodyNOC_2,
  DocDetails,
  EmptySpace,
  pageStyle,
  textBodyStyles,
} from './NocContent';
import PDfFooter from './PDFFooter';
import { PdfButtons } from './NocDownloadButton';

export interface PDfGenProps extends NOCType {
  qrCodeValue: string;
  allowDownload?: boolean;
}

const PDF = ({ allowDownload = true, ...data }: PDfGenProps) => {
  // const printRef = useRef <React.>();

  const NocPage = () => (
    <div
      className="mx-auto shadow-lg NOCPrintPage print:scale-110 print:m-0 print:shadow-none page pt-4 max-w-[210mm] max-h-[297mm]"
      id="invoicePageOne"
      style={pageStyle}
    >
      <div className="relative subpage">
        <EmbassyStamp />
        <PdfHeader />
        <DocDetails {...data} />
        <div
          className="flex justify-center pb-8 text-center pt-14"
          style={textBodyStyles}
        >
          <h1 className="font-serif text-base font-bold underline uppercase">
            To whom it may concern
          </h1>
        </div>
        <ContentBodyNOC_1
          full_name={data.full_name}
          passport_no={data.passport}
          travel_country={data.travel_country}
          travel_from={data.travel_from}
        />
        <EmptySpace space={2} />

        <ContentBodyNOC_2 travel_country={data.travel_country} />
        <PDfFooter {...data} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl px-4 mx-auto book">
      {allowDownload && <PdfButtons />}
      <NocPage />
    </div>
  );
};

export default PDF;
