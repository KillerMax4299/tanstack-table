import { useState, useEffect } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
import "./App.css";
import useTodoStore from "./Zustand";
import { pdf } from "@react-pdf/renderer";
import { usePDF } from "@react-pdf/renderer";
import { pdfjs } from "react-pdf";
import Sample from "./Pdf";
import MyDocument from "./PDFCreate";
import { Route, Routes, Link } from "react-router-dom";

const PdfPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePDF = async () => {
    const blob = await pdf(
      <MyDocument />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };
  return (
    <>
      <div className="flex flex-col items-start space-y-4 p-4">
        {/* <input
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
        /> */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
        {pdfUrl && <Sample url={pdfUrl} />}
      </div>
    </>
  );
};

export default PdfPage;
