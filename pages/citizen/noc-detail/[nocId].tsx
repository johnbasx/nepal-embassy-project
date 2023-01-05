import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import {
  updateNocDocument,
  updateNocDocumentFile,
  uploadPaymentScreenShot,
  citizenNocDocumentDetail,
  nocDocumentFiles,
} from 'content/api-urls';
import { FetchData } from '@utils/fetcher';
import { nocDocumentType, NocFilesType } from '@utils/interface';
import authStore from '@store/useAuthStore';

import { CheckCircleIcon } from '@heroicons/react/outline';
import { PaperClipIcon } from '@heroicons/react/solid';

import pageTitleStore from '@store/selectUsersStore';
import Footer from '@components/citizen/layout/Footer';
import UploadFile from '@components/citizen/nocDetail/UploadFile';
import DocAttachmentCard from '@components/citizen/nocDetail/DocAttachmentCard';
import CitizenFields from '@components/citizen/nocDetail/CitizenFields';
import NocStatusPill from '@components/citizen/nocDetail/NocStatusPill';
import PaymentAttachmentCard from '@components/citizen/nocDetail/PaymentAttachmentCard';

const NocDetail: React.FC<{ documentId: string }> = ({ documentId }) => {
  const router = useRouter();
  const { token } = authStore();
  const { setPageTitle } = pageTitleStore();
  const [detail, setDetail] = useState<nocDocumentType>();
  const [nocFiles, setNocFiles] = useState<NocFilesType[]>();

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

  return (
    <div className="px-4">
      <Toaster />
      <div className="p-2 mx-auto my-4 overflow-hidden bg-white shadow rounded-2xl">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              You applied for{' '}
              <span className="font-bold text-blue-700">
                {detail?.travel_type == 'Connecting' ? (
                  'Connecting Travel '
                ) : detail?.travel_type == 'Direct' ? (
                  'Direct Travel '
                ) : (
                  <></>
                )}
                <span className="text-base font-base leading-6 text-gray-700">
                  (Applied on {detail?.created_at})
                </span>
              </span>
            </h3>
            <p className="py-2 text-sm text-gray-600">
              Applied on:{' '}
              <span className="font-semibold text-gray-800">
                {detail?.created_at}
              </span>
            </p>
          </div>

          {/* Refactored to component */}
          {detail?.verified_status && (
            <NocStatusPill verified_status={detail?.verified_status} />
          )}
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
              <dt className="text-lg font-semibold text-gray-900">
                Attachments
              </dt>
              <p className="py-2 text-xs text-gray-600 md:text-sm">
                Your uploaded and rejected files will be shown here and you can
                update your submitted files when there is any verification
                error.
              </p>
              <dd className="mt-1 text-sm text-gray-900">
                <ul role="list" className="">
                  {nocFiles?.map((file) => (
                    <DocAttachmentCard
                      key={'attachment' + file.id}
                      {...file}
                      getNocDocumentFiles={getNocDocumentFiles}
                    />
                  ))}

                  {/* {/* {nocFiles?.map((file) => (
                    <DocAttachments key={file.id} {...file} />
                  ))} */}
                  <PaymentAttachmentCard
                    {...detail}
                    getNocDocumentDetail={getNocDocumentDetail}
                  />
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default NocDetail;
export async function getServerSideProps(context: any) {
  const { nocId } = context.params;
  const documentId = nocId;
  return { props: { documentId } };
}
