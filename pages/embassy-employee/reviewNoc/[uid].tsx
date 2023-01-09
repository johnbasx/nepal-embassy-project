import { FetchData, Update } from '@utils/fetcher';
import {
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

import { NocFilesType } from '@utils/interface';
import NocMessageModal from '@components/admin/review/NocMessageModal';
import { PaperClipIcon } from '@heroicons/react/solid';
import authStore from '@store/adminAuthStore';
import { nocDocumentType } from '@utils/interface';
import pageTitleStore from '@store/selectUsersStore';
import { useRouter } from 'next/router';
import CitizenFields from '@components/citizen/nocDetail/CitizenFields';
import NocStatusPill from '@components/citizen/nocDetail/NocStatusPill';
import HeadingUserDetails from '@components/admin/review/HeadingUserDetails';
import PaymentVerifyCard from '@components/admin/review/PaymentVerifyCard';
import DocVerifyCard from '@components/admin/review/DocVerifyCard';
import { HiThumbDown, HiThumbUp } from 'react-icons/hi';

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

  // useEffect(() => {
  //   console.log(nocFiles);
  // }, [nocFiles]);

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

  const getNocDocumentDetail = async () => {
    const data = await FetchData(token, nocDocDetail + documentId);
    console.log(data);
    setDetail(data);
  };

  const getNocDocumentFiles = async () => {
    const data = await FetchData(token, nocDocFiles + documentId);
    console.log(data);
    setNocFiles(data);
    console.log(data);
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
      <div className="mx-4 mt-4 mb-6 overflow-hidden bg-white shadow sm:rounded-2xl">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <HeadingUserDetails {...detail} />
          {/* {nocButtonStatus(detail?.verified_status)} */}

          {/* {nocDocStatus(detail?.verified_status)} */}
          {detail?.verified_status && (
            <NocStatusPill verified_status={detail?.verified_status} />
          )}
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
            {detail?.return_date && (
              <CitizenFields data={detail?.return_date} title="Return Date" />
            )}
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
              <dt className="text-lg font-semibold text-gray-900">
                Attachments
              </dt>
              <p className="py-2 text-xs text-red-500 md:text-sm">
                All uploaded and rejected files will be shown here and you can
                verify or reject the user submitted files when there is any
                false information.
              </p>
              <dd className="mt-1 text-sm text-gray-900">
                <ul role="list">
                  {nocFiles?.map((file, index) => (
                    <DocVerifyCard
                      getNocDocumentDetail={getNocDocumentDetail}
                      approvedFile={approvedFile}
                      setFileIdToReject={setFileIdToReject}
                      setOpen={setOpen}
                      {...file}
                      key={'doc file' + index + file.id}
                    />
                    // <DocAttachments
                    //   key={'doc file' + index + file.id}
                    //   {...file}
                    // />
                  ))}
                  <PaymentVerifyCard
                    {...detail}
                    getNocDocumentDetail={getNocDocumentDetail}
                    setOpenNocModal={setOpenNocModal}
                    approvePaymentScreenshot={approvePaymentScreenshot}
                  />
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
                className="inline-flex items-center px-4 py-2 space-x-1 text-sm font-semibold text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-400"
              >
                <HiThumbUp className="w-4 h-4" />
                <span>Approve for payment</span>
              </button>

              <button
                onClick={() => {
                  setOpenNocModal(true);
                }}
                className="inline-flex items-center px-4 py-2 space-x-1 text-sm font-semibold text-white duration-150 bg-red-600 rounded-md hover:bg-red-700"
              >
                <HiThumbDown className="w-4 h-4" />
                <span>Reject NOC</span>
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
