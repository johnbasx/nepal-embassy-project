import { IMAGE_BASE_URL, updateNocDocumentFile } from '@content/api-urls';
import { humanizeWord } from '@utils/humanizeWord';
import { NocFilesType } from '@utils/interface';
import FileStatus from 'hooks/useFileStatus';
import React from 'react';
import { RiAttachment2, RiEyeLine, RiUploadCloud2Line } from 'react-icons/ri';
import BadgePill from './BadgePill';
import UploadFile from './UploadFile';
import { classNames } from '@utils/helpers';

interface DocAttachmentCardProps extends NocFilesType {
  getNocDocumentFiles: () => Promise<void>;
  message?: string;
}

const DocAttachmentCard = ({ ...file }: DocAttachmentCardProps) => {
  return (
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
            {file.verification_status == '2' ? (
              <UploadFile
                url={updateNocDocumentFile + file.id}
                getContent={file.getNocDocumentFiles}
                uploadFor="File"
                label={file.doc_name}
              />
            ) : (
              <></>
            )}
          </div>
          {/* <p className="text-gray-500">
            Uploaded on:{' '}
            <span className="font-medium text-gray-700">12 Sep, 2022</span>
          </p> */}
          <p className="mt-3 text-sm text-gray-700">{file.message}</p>

          <div className="flex items-center justify-end mt-2 space-x-3 text-sm">
            {file.verification_status == '2' && (
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-gray-600 rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-0 active:bg-gray-800"
                >
                  <RiUploadCloud2Line className="w-3 h-3 text-white" />
                  <span>Upload again</span>
                </button>
              </div>
            )}
            {file.verification_status == '3' && (
              <a
                href={file.document_file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 space-x-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                <RiEyeLine className="w-3 h-3 text-gray-600" />
                <span>View</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default DocAttachmentCard;
