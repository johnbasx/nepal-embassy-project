import { TbDownload } from 'react-icons/tb';
import { printDocument } from './pdfSaver';

// NOC Document Download button
export const PdfButtons = () => (
  <div className="flex justify-start py-4 space-x-3 print:hidden">
    <button
      className="inline-flex items-center px-4 py-2 font-semibold text-white duration-200 bg-blue-600 rounded-md shadow-md hover:bg-blue-700 print:hidden gap-x-2"
      onClick={() => printDocument()}
    >
      Download
      <TbDownload className="w-4 h-4" />
    </button>
  </div>
);
