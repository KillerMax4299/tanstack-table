
import DynamicInputs from "./DynamicInputs/DynamicInputs";
import PdfPage from "./PdfPage";

export const routes = [
  {
    name: "PDF",
    path: "/pdf",
    Component: PdfPage,
  },
  {
    name: "Dynamic Inputs",
    path: "/input",
    Component: DynamicInputs
  },
  // Add more routes here...
];
