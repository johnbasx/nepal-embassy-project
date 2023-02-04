import {
  BASE_URL,
  nocDocDetail,
  nocDocFiles,
  updateNocDoc,
  updateNocDocFile,
} from 'content/api-urls';
import { FetchData, PostData, Update } from '@utils/fetcher';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import CitizenFields from '@components/citizen/nocDetail/CitizenFields';
import DocVerifyCard from '@components/admin/review/DocVerifyCard';
import HeadingUserDetails from '@components/admin/review/HeadingUserDetails';
import IssueNoc from '@components/admin/review/IssueNoc';
import Loading from '@components/common/Loading';
import MessageModal from '@components/admin/review/MessageModal';
import { NocFilesType } from '@utils/interface';
import NocMessageModal from '@components/admin/review/NocMessageModal';
import NocStatusPill from '@components/citizen/nocDetail/NocStatusPill';
import PaymentVerifyCard from '@components/admin/review/PaymentVerifyCard';
import authStore from '@store/adminAuthStore';
import { nocDocumentType } from '@utils/interface';
import pageTitleStore from '@store/selectUsersStore';
import { useRouter } from 'next/router';
import { dateReverseFormat } from '@utils/helpers';

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
  const [readyPayLoading, setReadyPayLoading] = useState(false);

  const getNocDocumentDetail = async () => {
    const data = await FetchData(token, nocDocDetail + documentId);
    // console.log(data);
    setDetail(data);
  };

  const getNocDocumentFiles = async () => {
    const data = await FetchData(token, nocDocFiles + documentId);
    // console.log(data);
    setNocFiles(data);
  };

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

    returnValue == 1
      ? toast.success('File approved!')
      : toast.error('Cannot approve file!');
    getNocDocumentFiles();
    setIsLoading(false);
  };

  const approvePaymentScreenshot = async () => {
    const returnValue = await Update(token, updateNocDoc + documentId, {
      payment_verified: '3',
    });

    returnValue == 1
      ? toast.success('Payment screenshot verified')
      : toast.error('Cannot verify Payment screenshot');
    getNocDocumentDetail();
  };

  const readyForPayment = async (noc_doc_id: string | undefined) => {
    setReadyPayLoading(true);
    const res = await PostData(token, BASE_URL + 'approveToUploadPayment', {
      doc_id: noc_doc_id,
    });
    console.log(res.response.data);
    if (res.response.data.success) {
      toast.success(res.response.data.message);
    } else {
      // toast.error(res.response.data.message);
      toast.error('Cannot approved for payment');
    }
    getNocDocumentDetail();
    setReadyPayLoading(false);
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
          {detail?.verified_status && (
            <NocStatusPill verified_status={detail?.verified_status} />
          )}
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <CitizenFields
              data={detail?.profile.full_name}
              title={'Full Name'}
            />
            <CitizenFields data={detail?.profile.email} title="Email address" />
            <CitizenFields
              title="Date of birth"
              data={dateReverseFormat(detail?.profile.dob)}
            />
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
            <CitizenFields
              data={dateReverseFormat(detail?.travel_date)}
              title="Travel Date"
            />
            {detail?.return_date && (
              <CitizenFields
                data={dateReverseFormat(detail?.return_date)}
                title="Return Date"
              />
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
                      docStatus={detail?.verified_status}
                      getNocDocumentDetail={getNocDocumentDetail}
                      approvedFile={approvedFile}
                      setFileIdToReject={setFileIdToReject}
                      setOpen={setOpen}
                      {...file}
                      key={'doc file' + index + file.id}
                    />
                  ))}
                  {detail?.payment_screen_shot != null && (
                    <PaymentVerifyCard
                      {...detail}
                      getNocDocumentDetail={getNocDocumentDetail}
                      setOpenNocModal={setOpenNocModal}
                      approvePaymentScreenshot={approvePaymentScreenshot}
                    />
                  )}
                </ul>
              </dd>
            </div>
          </dl>
          {detail?.verified_status === '2' ? (
            <div className="flex justify-end p-2 mt-1 font-medium text-gray-800">
              This document has been&nbsp;{' '}
              <span className="font-bold text-red-500">rejected</span>
            </div>
          ) : (
            <div className="flex justify-end w-full p-4 mt-3 space-x-4">
              {!detail?.upload_payment_screen_shot && (
                <>
                  {readyPayLoading ? (
                    <LoadingButton btnWidth="w-32" />
                  ) : (
                    <button
                      className="inline-flex px-4 py-3 text-xs font-medium text-white duration-150 bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => {
                        readyForPayment(detail?.id);
                      }}
                    >
                      Ready for payment
                    </button>
                  )}
                </>
              )}

              {detail?.upload_payment_screen_shot &&
                detail.payment_verified === '3' &&
                detail?.verified_status != '3' && (
                  <IssueNoc
                    documentId={documentId}
                    getNocDocumentDetail={getNocDocumentDetail}
                  />
                )}
              {detail?.verified_status != '3' && (
                <button
                  onClick={() => {
                    setOpenNocModal(true);
                  }}
                  className="inline-flex items-center px-4 py-3 text-xs font-medium text-white duration-150 bg-red-500 rounded-md hover:bg-red-600"
                >
                  Reject NOC
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const LoadingButton: React.FC<{ btnWidth: string }> = ({ btnWidth }) => {
  return (
    <button
      className={`px-3 py-2 text-xs font-medium text-white duration-150 bg-blue-600 rounded-md hover:bg-blue-700 flex justify-center ${btnWidth}`}
    >
      <Loading />
      Loading
    </button>
  );
};

export default CitizenProfile;
export async function getServerSideProps(context: any) {
  const { uid } = context.params;
  const documentId = uid;
  return { props: { documentId } };
}
