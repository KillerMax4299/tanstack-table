
import DynamicInputs from "./DynamicInputs/DynamicInputs";
import PdfPage from "./PdfPage";
import ReactHook from "./ReactHook";
import Tanstack from "./Tanstack";
import Salting from "./Salting";

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
  {
    name: "Tanstack Query ",
    path: "/api",
    Component: Tanstack,
  },
  {
    name: "Salting and Encryption ",
    path: "/salt",
    Component: Salting,
  },
  // Add more routes here...
];
