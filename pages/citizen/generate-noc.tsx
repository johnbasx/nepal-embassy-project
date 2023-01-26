import React, { useEffect, useState } from 'react';
import PDF from '@components/PDF';
// import Layout from '@components/PDF/invoice/layout';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { NOCType } from '@utils/interface';
import pageTitleStore from '@store/selectUsersStore';
import { BASE_URL, IMAGE_BASE_URL } from '@content/api-urls';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Footer from '@components/citizen/layout/Footer';

const GenerateNOC: React.FC<{ certificateData: NOCType }> = ({
  certificateData,
}) => {
  const { setPageTitle } = pageTitleStore();
  const [isLoading, setIsLoading] = useState(false);

  const [qrCodeValue, setQrCodeValue] = useState(
    `${IMAGE_BASE_URL}:3000/verify-by-qr/` + certificateData.id
  );

  useEffect(() => {
    setPageTitle('Download NOC');
  }, []);
  return (
    <div className="p-0 mx-auto overflow-scroll max-w-7xl print:p-0 print:w-auto print:m-0">
      {/* {isClient && <div stle={{ width: '100vw', height: '100vh' }}></div>} */}
      {/* <PDFViewer width="100%" height="100%">
        <Main />
    </PDFViewer> */}

      {/* <Layout /> */}

      {/* <embed src={"/2210.pdf"} type="application/pdf" /> */}

      {/* Download */}
      {/* <PDFDownloadLink document={<Layout />} fileName="invoice.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download")}
      </PDFDownloadLink> */}
      <PDF {...certificateData} qrCodeValue={qrCodeValue} />
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token, nocId } = context.query;
  if (!nocId) {
    return {
      redirect: {
        permanent: false,
        destination: '/citizen/get-noc',
      },
    };
  }
  let certificateData;
  const url = `${BASE_URL}getNoObjectionCertificate/${nocId}`;
  try {
    const response = await axios(url, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    certificateData = response.data;
    console.log(response.data);
  } catch (e: any) {
    throw new Error(e);
  }

  return { props: { certificateData } };
}
export default GenerateNOC;
