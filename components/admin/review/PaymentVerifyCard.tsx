import FileStatus, { PaymentVerifyStatus } from 'hooks/useFileStatus';
import { IMAGE_BASE_URL, updateNocDocumentFile } from '@content/api-urls';
import { NocFilesType, nocDocumentType } from '@utils/interface';
import { RiAttachment2, RiEyeLine, RiUploadCloud2Line } from 'react-icons/ri';

import BadgePill from '@components/citizen/nocDetail/BadgePill';
import React from 'react';
import { TbCheck } from 'react-icons/tb';
import UploadFile from '@components/citizen/nocDetail/UploadFile';

interface PaymentVerifyCardProps extends Partial<nocDocumentType> {
  approvePaymentScreenshot: () => Promise<void>;
  getNocDocumentDetail: () => Promise<void>;
  setOpenNocModal: (value: React.SetStateAction<boolean>) => void;
  label?: string;
  message?: string;
}

const PaymentStatusShow = ({ ...detail }: Partial<PaymentVerifyCardProps>) => {
  return (
    <div className="flex">
      {detail?.payment_verified == '1' &&
      detail?.payment_screen_shot != null ? (
        <p className="text-xs text-left text-green-800 text-bold">
          Payment Screenshot has been submitted by the user. Please check and
          verify this file.
        </p>
      ) : detail?.payment_verified == '2' ? (
        <p className="text-xs text-left text-red-500 text-semibold">
          This payment proof has been rejected. Please wait for the user to
          upload again.
        </p>
      ) : detail?.payment_verified == '3' ? (
        <p className="text-xs text-left text-blue-600 text-semibold">
          This payment proof has been verified. Please proceed to issue the NOC
          for the user.
        </p>
      ) : detail?.payment_screen_shot == null ? (
        <p className="text-xs text-left text-red-500 text-semibold">
          The user has not uploaded any Payment proof. Please wait for the proof
          of payment to be uploaded to proceed.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

const PaymentVerifyCard = ({
  approvePaymentScreenshot,
  setOpenNocModal,
  getNocDocumentDetail,
  ...detail
}: PaymentVerifyCardProps) => {
  return (
    <div className="flex mx-0 my-3 overflow-hidden bg-white border border-gray-300 shadow rounded-xl md:mx-auto">
      {/* <!--horizantil margin is just for display--> */}
      <div className="flex items-start flex-1 px-4 py-4 space-x-2 md:space-x-4">
        <RiAttachment2 className="text-gray-400 w-7 h-7" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="-mt-1 text-lg font-semibold text-gray-900">
              Proof of Payment
            </h2>

            {detail.payment_verified && (
              <PaymentVerifyStatus status={detail.payment_verified} />
            )}
            {/* {fileDocStatus(file.verification_status)} */}
            {/* <BadgePill color="green" label="Approved" /> */}
          </div>
          <span className="text-xs text-left text-gray-600">
            (screenshot / photo / transaction proof)
          </span>
          {/* Status message of the payment status */}
          <PaymentStatusShow {...detail} />
          {/* {detail.payment_screen_shot && (
            <p className="text-gray-500">
              Uploaded on:
              <span className="ml-1 font-medium text-gray-700">
                {detail.created_at}
              </span>
            </p>
          )} */}

          <div className="flex items-center justify-end space-x-3">
            {detail.payment_verified === '1' && (
              <button
                onClick={() => approvePaymentScreenshot()}
                className="inline-flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-gray-600 rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-800"
              >
                <TbCheck className="w-4 h-4 text-white" />
                <span>Approve Payment</span>
              </button>
            )}
            {detail?.payment_verified == '1' && (
              <button
                onClick={() => {
                  setOpenNocModal(true);
                  getNocDocumentDetail();
                }}
                className="inline-flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-red-600 rounded-md hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800"
              >
                <span>Reject</span>
              </button>
            )}
            {detail?.payment_screen_shot != null && (
              <a
                href={detail.payment_screen_shot}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium text-gray-700 duration-150 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                <RiEyeLine className="w-3 h-3 text-gray-600" />
                <span>View</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerifyCard;
