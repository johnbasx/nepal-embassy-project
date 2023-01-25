import { IMAGE_BASE_URL, updateNocDocumentFile } from '@content/api-urls';
import React, { useState } from 'react';
import { RiAttachment2, RiEyeLine, RiUploadCloud2Line } from 'react-icons/ri';

import BadgePill from '@components/citizen/nocDetail/BadgePill';
import FileStatus from 'hooks/useFileStatus';
import { NocFilesType } from '@utils/interface';
import { TbCheck } from 'react-icons/tb';
import UploadFile from '@components/citizen/nocDetail/UploadFile';
import { classNames } from '@utils/helpers';
import { humanizeWord } from '@utils/humanizeWord';
import useDateConvert from 'hooks/useDateConvert';

interface DocVerifyCardProps extends NocFilesType {
  getNocDocumentDetail: () => Promise<void>;
  approvedFile: (fileId: string) => Promise<void>;
  setFileIdToReject: (value: React.SetStateAction<string>) => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  message?: string;
  docStatus?: string;
}

const DocVerifyCard = ({
  approvedFile,
  setFileIdToReject,
  getNocDocumentDetail,
  setOpen,
  docStatus,
  ...file
}: DocVerifyCardProps) => {
  const [uploadDate, setUploadDate] = useState<Date>(new Date(file.created_at));

  return (
    <>
      <li
        className={classNames(
          `flex mx-0 my-3 ring-2 border-none bg-white shadow rounded-xl md:mx-auto`,
          file.verification_status == '2'
            ? 'ring-red-500'
            : file.verification_status == '3'
            ? 'ring-gray-200'
            : 'ring-blue-200'
        )}
      >
        {/* <!--horizantil margin is just for display--> */}
        <div className="flex items-start flex-1 px-4 py-4 space-x-2 border-none rounded-xl md:space-x-4">
          <RiAttachment2 className="text-gray-400 w-7 h-7" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="-mt-1 text-lg font-semibold text-gray-900">
                {humanizeWord(file.doc_name)}
              </h2>
              <FileStatus status={file.verification_status} />
              {/* {fileDocStatus(file.verification_status)} */}
              {/* <BadgePill color="green" label="Approved" /> */}
            </div>
            <p className="text-xs text-gray-500">
              Uploaded on:{' '}
              <span className="font-medium text-gray-700">
                {uploadDate.toLocaleDateString('en-US')}
              </span>
            </p>
            <p className="mt-3 text-sm text-gray-700">{file.message}</p>

            <div className="flex items-center justify-end mt-2 space-x-3 text-sm">
              {file.verification_status == '1' && docStatus != '2' && (
                <>
                  <div className="flex justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        approvedFile(file.id), getNocDocumentDetail();
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-gray-600 rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-800"
                    >
                      <TbCheck className="w-4 h-4 text-white" />
                      <span>Approve file</span>
                    </button>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFileIdToReject(file.id);
                        setOpen(true);
                        getNocDocumentDetail();
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-red-600 rounded-md hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800"
                    >
                      {/* <RiUploadCloud2Line className="w-3 h-3 text-white" /> */}
                      <span>Reject</span>
                    </button>
                  </div>
                </>
              )}
              {/* {file.verification_status == '3' && ( */}
              <a
                href={file.document_file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                <RiEyeLine className="w-3 h-3 text-gray-600" />
                <span>View</span>
              </a>
              {/* )} */}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
export default DocVerifyCard;
