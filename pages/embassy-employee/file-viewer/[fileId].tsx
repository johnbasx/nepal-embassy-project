import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

type Props = {};

const DocViewerPage = () => {
  const docs = [
    {
      uri: 'https://internal.gredu.co/files/user_scores/1633600395-FORMATIMPORTNILAIPENGETAHUANKELAS1A-1633600395-15.xlsx',
    },
    // { uri: require('../../public/images/logo-only.png') },
    {
      uri: 'https://api.core.sowat.dev/v2/assets?url=https://s3.ap-southeast-1.amazonaws.com/internal.gredu.co/dev/lesson_attachments/%282%29%20Aljabar%20Fisika-2-1637294567.pdf',
    },
  ];

  return (
    <div className="bg-gray-300">
      <h1>Sample react-doc-viewer</h1>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default DocViewerPage;

export async function getServerSideProps(context: any) {
  const { fileId } = context.params;
  return { props: { fileId } };
}
