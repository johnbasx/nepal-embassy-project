import { NextPage } from 'next';
import React, { useState } from 'react';
import TestFileViewer from '@components/fileViewer/TestFileViewer';

const DocViewerPage: NextPage = () => {
  return (
    <div className="bg-gray-300">
      <h1>Sample react-doc-viewer</h1>
      <TestFileViewer />
    </div>
  );
};

export default DocViewerPage;
