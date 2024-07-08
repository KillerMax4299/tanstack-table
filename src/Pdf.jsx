import React, { useCallback, useState } from "react";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page } from "react-pdf";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min";

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

const maxWidth = 500;

export default function Sample() {
  const [file, setFile] = useState("/sample.pdf");
  const [numPages, setNumPages] = useState();
  const [page, setPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState();

  // useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess(e) {
    setNumPages(e.numPages);
    console.log(e);
  }

  return (
    <div className="w-fit bg-zinc-100 p-8 px-10">
      <Document
        className={"bg-white shadow-lg"}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}

        // options={options}
      >
        <Page
          // key={`page_${index + 1}`}
          pageNumber={page}
          // width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
          height={670}
        />
      </Document>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => {
              if (page > 1) setPage((page) => page - 1);
            }}
          >
            prev
          </button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (page < numPages) setPage((page) => page + 1);
            }}
          >
            next
          </button>
        </div>
    </div>
  );
}
