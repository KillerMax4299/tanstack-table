
import DynamicInputs from "./DynamicInputs/DynamicInputs";
import PdfPage from "./PdfPage";
import ReactHook from "./ReactHook";

export const routes = [
  {
    name: "PDF",
    path: "/pdf",
    Component: PdfPage,
  },
  {
    name: "Dynamic Inputs",
    path: "/input",
    Component: DynamicInputs,
  },
  {
    name: "ReactHook Form",
    path: "/form",
    Component: ReactHook,
  },
  // Add more routes here...
];
