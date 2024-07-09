import { useState, useMemo, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./App.css";
import { Table } from "flowbite-react";
import { Pagination } from "./Pagination";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { exportToExcel, exportToCSV } from "./exportExcel";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { BlobProvider, usePDF, PDFViewer } from "@react-pdf/renderer";
import Sample from "./Pdf";
import MyDocument from "./PDFCreate";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SuccessModal from "./SuccessModal";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
import useTodoStore from "./Zustand";
import { pdf } from "@react-pdf/renderer";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const { text, setText } = useTodoStore();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const [instance, updateInstance] = usePDF({ document: <MyDocument /> });

  const generatePDF = async () => {
    const blob = await pdf(
      <MyDocument title={title} subtitle={subtitle} content={content} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 p-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-32"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
        {pdfUrl && (
          // <iframe
          //   src={pdfUrl}
          //   className="w-full h-[600px] border border-gray-300"
          //   title="PDF Preview"
          // />
          <Sample url={pdfUrl} />
        )}
      </div>
      {/* <div className="flex justify-center">
        <div className="h-fit">
          <input
            type="text"
            value={text.val1}
            onChange={(e) => setText(e.target.value, "val1")}
          />
          <input
            type="text"
            value={text.val2}
            onChange={(e) => setText(e.target.value, "val2")}
          />
        </div>
        {instance.loading && <div>Loading ...</div>}
        {instance.error && <div>Something went wrong: {error}</div>}
      </div> */}
    </>
  );
}

export default App;
