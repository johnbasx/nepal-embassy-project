import { IMAGE_BASE_URL, updateNocDocumentFile } from '@content/api-urls';
import { RiAttachment2, RiEyeLine } from 'react-icons/ri';

import { PaymentVerifyStatus } from 'hooks/useFileStatus';
import React from 'react';
import UploadFile from './UploadFile';
import { nocDocumentType } from '@utils/interface';

interface PaymentAttachmentCardProps extends Partial<nocDocumentType> {
  getNocDocumentDetail: () => Promise<void>;
  label?: string;
  message?: string;
}

const PaymentStatusShow = ({ ...detail }: PaymentAttachmentCardProps) => {
  return (
    <div className="flex">
      {detail?.payment_verified == '1' &&
      detail?.payment_screen_shot != null ? (
        <p className="text-xs text-left text-green-800 text-bold">
          Payment Screenshot has been submitted. Waiting for verification.
        </p>
      ) : detail?.payment_verified == '2' ? (
        <p className="text-xs text-left text-red-500 text-semibold">
          Your Payment proof has been rejected. Please upload again.
        </p>
      ) : detail?.payment_verified == '3' ? (
        <p className="text-xs text-left text-blue-600 text-semibold">
          Your Payment proof has been verified. Your NOC will be issued soon.
          Thank You.
        </p>
      ) : detail?.payment_screen_shot == null ? (
        <p className="text-xs text-left text-red-500 text-semibold">
          You have not uploaded any Payment proof. Please upload proof of
          payment to proceed.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

const PaymentAttachmentCard = ({ ...detail }: PaymentAttachmentCardProps) => {
  console.log(detail);
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
          {detail.payment_screen_shot && (
            <p className="text-gray-500">
              Uploaded on:
              <span className="ml-1 font-medium text-gray-700">
                {detail.created_at}
              </span>
            </p>
          )}

          <div className="flex items-center justify-end space-x-3">
            {detail?.upload_payment_screen_shot && (
              <UploadFile
                url={updateNocDocumentFile + detail.id}
                getContent={detail.getNocDocumentDetail}
                uploadFor="Document"
                label="Payment Screenshot"
              />
            )}
            {detail?.payment_screen_shot != null ||
            detail?.payment_verified == '3' ? (
              <a
                href={IMAGE_BASE_URL + detail.payment_screen_shot}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                <RiEyeLine className="w-3 h-3 text-gray-600" />
                <span>View</span>
              </a>
            ) : (
              <></>
            )}
            {/* {detail?.payment_verified === '1' ||
            detail?.payment_screen_shot === null ||
            (!detail?.upload_payment_screen_shot &&
              detail?.verified_status === '1') ? (
              <UploadFile
                url={updateNocDocumentFile + detail.id}
                getContent={detail.getNocDocumentDetail}
                uploadFor="Document"
                label="Payment Screenshot"
              />
            ) : detail?.payment_screen_shot != null ||
              detail?.payment_verified == '3' ? (
              <a
                href={IMAGE_BASE_URL + detail.payment_screen_shot}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                <RiEyeLine className="w-3 h-3 text-gray-600" />
                <span>View</span>
              </a>
            ) : (
              <></>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAttachmentCard;
