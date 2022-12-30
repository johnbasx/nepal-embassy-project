import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const TestFileViewer: React.FC = () => {
  const docs = [
    {
      uri: 'http://64.227.136.150/media/Uploaded_Files/Maam_Sapna_Book_Cover-01_LrFCdDW.pdf',
    },
    // {
    //   uri: 'http://64.227.136.150/media/Uploaded_Files/National_Entrepreneurship_Day_2022_Invitation_-_MTU_1_KZATRgj.pdf',
    // },
  ];
  return (
    <div className="flex-col p-4 space-y-4 bg-white">
      <p>Check out:</p>
      <a
        href={docs[0].uri}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        View File
      </a>

      {/* <DocViewer
        prefetchMethod="GET"
        initialActiveDocument={docs[1]}
        pluginRenderers={DocViewerRenderers}
        documents={docs}
      /> */}
    </div>
  );
};

export default TestFileViewer;
