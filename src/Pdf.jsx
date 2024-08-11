import React, { useCallback, useState,useEffect } from "react";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page } from "react-pdf";
import { Icon } from "@iconify/react/dist/iconify.js";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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
          pageNumber={1}
          // width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
          loading={<div className="bg-white"></div>}
          height={1000}
        />
        
      </Document>
    </div>
  );
}

export default Sample;