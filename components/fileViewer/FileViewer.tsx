import DocViewer, {
  DocRenderer,
  DocViewerRenderers,
  PDFRenderer,
  PNGRenderer,
} from 'react-doc-viewer';

import React from 'react';

const MyCustomPNGRenderer: DocRenderer = ({
  mainState: { currentDocument },
}) => {
  if (!currentDocument) return null;

  return (
    <div id="my-png-renderer">
      <img id="png-img" src={currentDocument.fileData as string} />
    </div>
  );
};

MyCustomPNGRenderer.fileTypes = ['png', 'image/png'];
MyCustomPNGRenderer.weight = 1;

type FileViewerProps = {
  uri: string;
};
const FileViewer = ({ docs }: { docs: FileViewerProps[] }) => (
  <DocViewer pluginRenderers={[PNGRenderer, PDFRenderer]} documents={docs} />
);

export default FileViewer;
