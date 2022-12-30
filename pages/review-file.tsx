import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState } from 'react';

import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ViewPdf: NextPage = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  //   const [file, setFile] = useState('./2210.pdf');
  const router = useRouter();
  const { file } = router.query;

  // To prevent right click on screen
  if (typeof window !== 'undefined') {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  // When document gets loaded successfully
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }
  function nextPage() {
    changePage(1);
  }

  return (
    <div className="flex flex-col h-screen w-screen mx-auto justify-start items-center">
      <div className="shadow-2xl w-full h-full mx-auto flex flex-col justify-center items-center p-4 bg-gray-500">
        {/* <object
          data={file}
          type="application/pdf"
          width="100%"
          className="h-full overflow-hidden rounded-3xl shadow-md"
        >
          <p>
            Alternative text - include a link <a href={file}>to the PDF!</a>
          </p>
        </object> */}
      </div>
    </div>
  );
};

export default ViewPdf;
