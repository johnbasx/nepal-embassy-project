import {
  TbBan,
  TbClipboardOff,
  TbFileUpload,
  TbShieldCheck,
} from 'react-icons/tb';
import { citizenNocDocumentDetail, nocDocumentFiles } from 'content/api-urls';
import toast, { Toaster } from 'react-hot-toast';
import { updateNocDocument, updateNocDocumentFile } from 'content/api-urls';
import { useCallback, useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/outline';
import { FetchData } from '@utils/fetcher';
import FileViewer from '@components/fileViewer/FileViewer';
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import { NocFilesType } from '@utils/interface';
import { PaperClipIcon } from '@heroicons/react/solid';
import TravelVia from '@components/travel/TravelVia';
import UploadFile from '@components/citizen/nocDetail/UploadFile';
import authStore from '@store/useAuthStore';
import { nocDocFiles } from 'content/api-urls';
import { nocDocumentType } from '@utils/interface';
import pageTitleStore from '@store/selectUsersStore';
import { useRouter } from 'next/router';

const CitizenProfile: React.FC<{ documentId: string }> = ({ documentId }) => {
  const router = useRouter();
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [detail, setDetail] = useState<nocDocumentType>();
  const [nocFiles, setNocFiles] = useState<NocFilesType[]>();

  const CitizenFields = ({ title, data }: { title: string; data?: string }) => (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900">{data}</dd>
    </div>
  );

  const ApprovedPill = () => (
    <div className="flex items-center justify-center px-4 py-1 space-x-1 text-xs text-white bg-teal-500 rounded-full">
      <TbShieldCheck className="w-5 h-5" />
      <span>Approved</span>
    </div>
  );

  const RejectedPill = () => (
    <div className="flex items-center justify-center px-4 py-1 space-x-1 text-xs text-white bg-red-400 rounded-full">
      <TbBan className="w-5 h-5" />
      <span>Rejected</span>
    </div>
  );

  const ResubmitPill = () => (
    <div className="flex items-center justify-center px-4 py-1 space-x-1 text-xs text-white rounded-full bg-slate-700">
      <TbFileUpload className="w-5 h-5" />
      <span>Submit again</span>
    </div>
  );

  const PendingPill = () => (
    <div className="flex items-center justify-center px-4 py-1 space-x-1 text-xs text-white bg-gray-400 rounded-full">
      <TbClipboardOff className="w-5 h-5" />
      <span>Pending</span>
    </div>
  );

  const nocDocStatus = useCallback((value?: string) => {
    if (value == '3') return <ApprovedPill />;
    else if (value == '1') return <PendingPill />;
    else return <RejectedPill />;
  }, []);

  const StatusBadge = ({
    label,
    className,
    variant,
    color = 'teal',
    children,
  }: {
    label: string;
    variant: string;
    className?: string;
    color?: string;
    children?: React.ReactNode;
  }) => {
    switch (variant) {
      case 'success':
        return (
          <span className="bg-green-200 text-green-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {label}
          </span>
        );
      case 'reject':
        return (
          <span className="bg-red-200 text-red-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {label}
          </span>
        );
      case 're-submit':
        return (
          <span className="bg-yellow-200 text-yellow-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {label}
          </span>
        );
      case 're-verify':
        return (
          <span className="bg-blue-200 text-blue-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {label}
          </span>
        );
      default:
        return (
          <span className="bg-blue-200 text-blue-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ">
            Pending
          </span>
        );
    }
  };

  const fileDocStatus = useCallback((value: string) => {
    if (value == '3') return <StatusBadge label="Approved" variant="success" />;
    else if (value == '2')
      return <StatusBadge label="Rejected" variant="reject" />;
    else return <StatusBadge label="Pending" variant="pending" />;
  }, []);

  const getNocDocumentDetail = async () => {
    const data = await FetchData(token, citizenNocDocumentDetail + documentId);
    setDetail(data);
  };

  const getNocDocumentFiles = async () => {
    const data = await FetchData(token, nocDocumentFiles + documentId);
    setNocFiles(data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    setPageTitle('Noc Document Detail');
    getNocDocumentDetail();
    getNocDocumentFiles();
  }, [router.isReady]);

  const DocAttachments = ({ ...file }: NocFilesType) => (
    <li className="relative flex flex-col items-start justify-start py-3 pl-3 pr-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center flex-1 pb-4 sm:pb-0">
        <PaperClipIcon
          className="flex-shrink-0 w-5 h-5 text-gray-400"
          aria-hidden="true"
        />
        <div className="flex-1 w-0 ml-2 space-x-2 text-ellipsis">
          <a className="cursor-pointer hover:text-blue-600 hover:underline">
            {file.doc_name}
          </a>
          {/* {fileDocStatus(file.verification_status)} */}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3">
        {fileDocStatus(file.verification_status)}
        {file.verification_status == '2' ? (
          <UploadFile
            url={updateNocDocumentFile + file.id}
            getContent={getNocDocumentFiles}
            uploadFor="File"
            label={file.doc_name}
          />
        ) : (
          <></>
        )}
      </div>
    </li>
  );
  const docs = [
    {
      uri: 'http://127.0.0.1:8000/media/Uploaded_Files/Recent_changes_in_the_Embassy_Project_2_rbjbSdS.docx',
    }, // Local File
  ];

  return (
    <>
      <Toaster />
      <div className="mx-4 mt-4 overflow-hidden bg-white shadow sm:rounded-2xl max-w-7xl">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex-1">
            <h3 className="text-lg font-medium leading-6 text-blue-600">
              {detail?.travel_type == 'Connecting' ? (
                'You applied for Connecting Travel'
              ) : detail?.travel_type == 'Direct' ? (
                'You applied for Direct Travel'
              ) : (
                <></>
              )}
            </h3>
          </div>
          {nocDocStatus(detail?.verified_status)}
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
          {/* <FileViewer docs={docs} /> */}
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <CitizenFields data={detail?.full_name} title="Full Name" />
            <CitizenFields data={detail?.email} title="Email address" />
            <CitizenFields data={detail?.dob} title="Date of birth" />
            <CitizenFields
              title="Application for"
              data={detail?.travel_purpose_value}
            />
            <CitizenFields title="Qualification" data="Graduate" />
            <CitizenFields data={detail?.district} title="District" />
            <CitizenFields data={detail?.province} title="Province" />
            <CitizenFields data={detail?.travel_from} title="Travel From" />
            <CitizenFields
              data={detail?.travel_country}
              title="Travel Country"
            />
            <CitizenFields data={detail?.travel_date} title="Travel Date" />
            <CitizenFields data={detail?.return_date} title="Return Date" />
            {detail?.travel_via != '' ? (
              <CitizenFields data={detail?.travel_via} title="Travel Via" />
            ) : (
              <></>
            )}
            <CitizenFields
              data={detail?.travel_purpose_value}
              title="Travel Purpose"
            />
            <CitizenFields
              data={detail?.passport_number.toString()}
              title="Passport Number"
            />

            <CitizenFields
              data={detail?.check_living_in_india ? 'Yes' : 'No'}
              title="Living in India"
            />

            <div className="sm:col-span-3">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul
                  role="list"
                  className="border border-gray-200 divide-y divide-gray-200 rounded-md"
                >
                  <li className="relative flex flex-col items-start justify-start py-3 pl-3 pr-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center flex-1 pb-4 sm:pb-0">
                      <PaperClipIcon
                        className="flex-shrink-0 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="flex-1 w-0 ml-2 text-ellipsis">
                        <span>Payment Screenshot</span>
                        {detail?.payment_verified == '1' &&
                        detail?.payment_screen_shot != null ? (
                          <h1 className="text-xs text-green-800 text-bold">
                            Payment Screenshot has been submitted. Waiting for
                            verification.
                          </h1>
                        ) : detail?.payment_verified == '2' ? (
                          <h1 className="text-xs text-red-500 text-semibold">
                            Your Payment Screenshot has been rejected. Please
                            upload again.
                          </h1>
                        ) : detail?.payment_verified == '3' ? (
                          <h1 className="text-xs text-blue-600 text-semibold">
                            Your Payment Screenshot has been verified.
                          </h1>
                        ) : detail?.payment_screen_shot == null ? (
                          <h1 className="text-xs text-red-500 text-semibold">
                            You have not uploaded Payment Screenshot.
                          </h1>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3">
                      {detail?.payment_verified == '3' ? (
                        <>
                          <a className="px-3 py-2 font-medium text-blue-600 bg-gray-100 rounded cursor-pointer hover:text-blue-500">
                            View
                          </a>
                          <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        </>
                      ) : detail?.payment_verified == '2' ||
                        detail?.payment_screen_shot == null ? (
                        <UploadFile
                          url={updateNocDocument + detail?.id}
                          getContent={getNocDocumentDetail}
                          uploadFor="Document"
                          label="Payment Screenshot"
                        />
                      ) : detail?.payment_screen_shot != null ? (
                        <a className="px-3 py-2 font-medium text-blue-600 bg-gray-100 rounded cursor-pointer hover:text-blue-500">
                          View
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  </li>
                  {nocFiles?.map((file) => (
                    <DocAttachments key={file.id} {...file} />
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
export default CitizenProfile;
export async function getServerSideProps(context: any) {
  const { nocId } = context.params;
  const documentId = nocId;
  return { props: { documentId } };
}
