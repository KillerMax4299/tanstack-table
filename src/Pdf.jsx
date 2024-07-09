import React, { useCallback, useState,useEffect } from "react";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page } from "react-pdf";
import { Icon } from "@iconify/react/dist/iconify.js";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min";

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

const maxWidth = 400;

function Sample(instance) {
  const [file, setFile] = useState();
  const [numPages, setNumPages] = useState();
  const [page, setPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState();

  // useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess(e) {
    setNumPages(e.numPages);
  }

  useEffect(() => {
    // console.log(instance);
    if (!instance.loading)
      setFile(instance.url)
  }, [instance])

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
          loading={<div className="w-[474px] h-[670px] bg-white"></div>}
          height={670}
        />
      </Document>
      <div className="flex space-x-4 items-center justify-center p-4">
        <button
          onClick={() => {
            if (page > 1) setPage((page) => page - 1);
          }}
        >
          <Icon className="text-2xl text-orange-500" icon={"ri:arrow-left-s-line"} />
        </button>
        <span onClick={() => setPage(0)}>{page}</span>
        <button
          onClick={() => {
            if (page < numPages) setPage((page) => page + 1);
          }}
        >
          <Icon className="text-2xl text-orange-500" icon={"ri:arrow-right-s-line"} />
        </button>
      </div>
    </div>
  );
}

export default Sample;