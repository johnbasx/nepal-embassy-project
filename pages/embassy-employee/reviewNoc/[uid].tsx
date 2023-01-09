import {
  BASE_URL,
  nocDocDetail,
  nocDocFiles,
  nocVerification,
  updateNocDoc,
  updateNocDocFile,
} from 'content/api-urls';
import { FetchData, PostData, Update } from '@utils/fetcher';
import {
  TbBan,
  TbClipboardOff,
  TbDownload,
  TbFileUpload,
  TbShieldCheck,
} from 'react-icons/tb';
import toast, { Toaster } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/outline';
import MessageModal from '@components/admin/review/MessageModal';
import { NocDetailTypes } from '@components/admin/userList/UserListTable';
import { NocFilesType } from '@utils/interface';
import NocMessageModal from '@components/admin/review/NocMessageModal';
import { PaperClipIcon } from '@heroicons/react/solid';
import ReviewOptionSelect from '@components/admin/review/ReviewOptionSelect';
import authStore from '@store/adminAuthStore';
import { nocDocumentType } from '@utils/interface';
import pageTitleStore from '@store/selectUsersStore';
import { useRouter } from 'next/router';

const CitizenProfile: React.FC<{ documentId: string }> = ({ documentId }) => {
  const router = useRouter();
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [detail, setDetail] = useState<nocDocumentType>();
  const [nocFiles, setNocFiles] = useState<NocFilesType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fileIdToReject, setFileIdToReject] = useState('');
  const [openNocModal, setOpenNocModal] = useState(false);
  // const [nocToReject, setnocToReject] = useState('');

  useEffect(() => {
    console.log(nocFiles);
  }, [nocFiles]);

  const CitizenFields = ({ title, data }: { title: string; data?: string }) => (
    <div className="sm:col-span-1">
      <dt className="text-xs text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm font-medium text-gray-900">{data}</dd>
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

  //   This will help to render the correct pill based on the type of status from the backend/API
  const nocDocStatus = useCallback((value?: string) => {
    if (value == '3') return <ApprovedPill />;
    else if (value == '1') return <PendingPill />;
    else return <RejectedPill />;
  }, []);

  const nocButtonStatus = useCallback((value?: string) => {
    if (value == '1')
      return (
        <div className="px-4">
          <button
            onClick={() => approvedNocDocument()}
            className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Ready for payment
          </button>
        </div>
      );
    else return <></>;
  }, []);

  //   This will help to render the correct pill based on the type of status from the backend/API

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
          <span className="bg-blue-200 text-blue-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">
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
    const data = await FetchData(token, nocDocDetail + documentId);
    console.log(data);
    setDetail(data);
  };

  const getNocDocumentFiles = async () => {
    const data = await FetchData(token, nocDocFiles + documentId);
    console.log(data);
    setNocFiles(data);
    // nocFiles?.map(file =file.verification_status=='3')
  };

  const [allFilesState, setAllFilesState] = useState(false);
  useEffect(() => {
    function filesCheck() {
      // let fileState = false;

      return nocFiles?.every((file) => {
        file.verification_status == '3';
      });

      // return fileState;
    }
    // setAllFilesState(filesCheck());
    console.log(filesCheck());
  }, [nocFiles]);

  useEffect(() => {
    if (!router.isReady) return;
    setPageTitle('Noc Document Detail');
    getNocDocumentDetail();
    getNocDocumentFiles();
  }, [router.isReady]);

  const approvedFile = async (file_id: string) => {
    setIsLoading(true);
    const returnValue = await Update(token, updateNocDocFile + file_id, {
      verification_status: '3',
    });
    console.log(returnValue);
    returnValue == 1
      ? toast.success('File approved!')
      : toast.error('Cannot approve file!');
    getNocDocumentFiles();
    setIsLoading(false);
  };

  const approvedNocDocument = async () => {
    const returnValue = await Update(token, nocVerification + documentId, {
      verified_status: '3',
    });
    console.log(returnValue);
    returnValue == 1
      ? toast.success('NOC approved')
      : toast.error('Please verify all files and Payment screenshot!');
    getNocDocumentDetail();
  };

  const approvePaymentScreenshot = async () => {
    const returnValue = await Update(token, updateNocDoc + documentId, {
      payment_verified: '3',
    });
    console.log(returnValue);
    returnValue == 1
      ? toast.success('Payment screenshot verified')
      : toast.error('Cannot verify Payment screenshot');
    getNocDocumentDetail();
  };

  const DocAttachments = ({ ...file }: NocFilesType) => (
    <li className="relative flex flex-col items-start justify-start py-3 pl-3 pr-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center flex-1 pb-4 sm:pb-0">
        <PaperClipIcon
          className="flex-shrink-0 w-5 h-5 text-gray-400 rotate-45"
          aria-hidden="true"
        />
        <span className="flex-1 w-0 ml-2 text-ellipsis">{file.doc_name}</span>
      </div>

      <div className="flex items-center justify-end space-x-3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={file.document_file}
          // onClick={() => {
          //   router.push(
          //     {
          //       pathname: '/review-file',
          //       query: { file: file.document_file },
          //     },
          //     '/review-file'
          //   );
          // }}
          className="px-3 py-2 text-xs font-medium text-blue-600 rounded-md cursor-pointer hover:text-blue-500 bg-gray-50"
        >
          View
        </a>
        {file.verification_status == '3' ? (
          <StatusBadge label="Approved" variant="success" />
        ) : file.verification_status == '2' ? (
          <StatusBadge label="Rejected" variant="reject" />
        ) : (
          <>
            <button
              onClick={() => {
                approvedFile(file.id), getNocDocumentDetail();
              }}
              className="px-3 py-2 text-xs font-medium text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Approve
            </button>
            <button
              onClick={() => {
                setFileIdToReject(file.id);
                setOpen(true);
                getNocDocumentDetail();
              }}
              className="px-3 py-2 text-xs font-medium text-white duration-150 bg-red-500 rounded-md hover:bg-red-600"
            >
              Reject
            </button>
          </>
        )}

        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
          <TbDownload className="w-5 h-5" />
        </a>
      </div>
    </li>
  );

  const readyForPayment = async (noc_doc_id: string | undefined) => {
    const res = await PostData(token, BASE_URL + 'approveToUploadPayment', {
      doc_id: noc_doc_id,
    });
    if (res.response.data.status == 'success') {
      toast.success(res.response.data.message);
    } else {
      toast.error('Cannot approved');
    }
  };
  return (
    <>
      <MessageModal
        open={open}
        setOpen={setOpen}
        file_id={fileIdToReject}
        getNocDocumentFiles={getNocDocumentFiles}
      />
      <NocMessageModal
        openNocModal={openNocModal}
        setOpenNocModal={setOpenNocModal}
        noc_doc_id={documentId}
        getNocDocumentDetail={getNocDocumentDetail}
      />
      <Toaster />
      <div className="mx-4 mt-4 mb-6 overflow-hidden bg-white shadow sm:rounded-2xl max-w-7xl">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-700">
              NOC detail for -
            </h3>
            <span className="text-blue-700">
              {detail?.full_name +
                '(' +
                detail?.email +
                ') - ' +
                detail?.travel_type +
                ' Travel '}
              <span className="text-base font-base leading-6 text-gray-700">
                (Applied on {detail?.created_at})
              </span>
            </span>
          </div>
          {/* {nocButtonStatus(detail?.verified_status)} */}

          {nocDocStatus(detail?.verified_status)}
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <CitizenFields data={detail?.full_name} title={'Full Name'} />
            <CitizenFields data={detail?.email} title="Email address" />
            <CitizenFields title="Date of birth" data="12/10/1998" />
            <CitizenFields
              title="Application for"
              data={detail?.travel_purpose_value}
            />
            <CitizenFields title="Qualification" data="Graduate" />
            <CitizenFields data={detail?.province} title="District" />
            <CitizenFields data={detail?.district} title="Province" />
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
                  {detail?.upload_payment_screen_shot == true && (
                    <li className="relative flex flex-col items-start justify-start py-3 pl-3 pr-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center flex-1 pb-4 sm:pb-0">
                        <PaperClipIcon
                          className="flex-shrink-0 w-5 h-5 text-gray-400 rotate-45"
                          aria-hidden="true"
                        />
                        <div className="flex-1 w-0 ml-2 text-ellipsis">
                          <span>Payment Screenshot</span>
                          {detail?.payment_verified == '1' &&
                          detail?.payment_screen_shot != null ? (
                            <h1 className="text-xs text-green-800 text-bold">
                              Verify the payment screenshot
                            </h1>
                          ) : detail?.payment_verified == '2' ? (
                            <h1 className="text-xs text-red-500 text-semibold">
                              Payment Screenshot rejected
                            </h1>
                          ) : detail?.payment_verified == '3' ? (
                            <h1 className="text-xs text-blue-600 text-semibold">
                              Payment Screenshot verified
                            </h1>
                          ) : detail?.payment_screen_shot == null ? (
                            <h1 className="text-xs text-red-500 text-semibold">
                              Payment Screenshot has not been uploaded yet
                            </h1>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-3">
                        {detail?.payment_verified == '3' ? (
                          <>
                            <a
                              className="px-3 py-2 text-xs font-medium text-blue-600 rounded-md cursor-pointer hover:text-blue-500 bg-gray-50"
                              href={detail.payment_screen_shot}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                          </>
                        ) : detail?.payment_verified == '1' &&
                          detail?.payment_screen_shot != null ? (
                          <button
                            onClick={() => approvePaymentScreenshot()}
                            className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                          >
                            Approve Payment
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </li>
                  )}

                  {nocFiles?.map((file, index) => (
                    <DocAttachments
                      key={'doc file' + index + file.id}
                      {...file}
                    />
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="flex justify-end w-full p-4 mt-3 space-x-4">
            {!detail?.upload_payment_screen_shot && (
              <button
                className="px-3 py-2 text-xs font-medium text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={() => {
                  readyForPayment(detail?.id);
                }}
              >
                Ready for payment
              </button>
            )}
            <button
              onClick={() => {
                setOpenNocModal(true);
              }}
              className="px-3 py-2 text-xs font-medium text-white duration-150 bg-red-500 rounded-md hover:bg-red-600"
            >
              Reject NOC
            </button>
          </div>
          {/* {detail?.verified_status == '1' && (
            <div className="flex justify-end w-full p-4 mt-3 space-x-4">
              <button
                onClick={() => approvedNocDocument()}
                className="px-3 py-2 text-xs font-medium text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Approve document to upload payment
              </button>

              <button
                onClick={() => {
                  setOpenNocModal(true);
                }}
                className="px-3 py-2 text-xs font-medium text-white duration-150 bg-red-500 rounded-md hover:bg-red-600"
              >
                Reject NOC
              </button>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};
export default CitizenProfile;
export async function getServerSideProps(context: any) {
  const { uid } = context.params;
  const documentId = uid;
  return { props: { documentId } };
}
