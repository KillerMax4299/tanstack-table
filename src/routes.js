
import DynamicInputs from "./DynamicInputs/DynamicInputs";
import PdfPage from "./PdfPage";
import ReactHook from "./ReactHook";
import Tanstack from "./Tanstack";
import Salting from "./Salting";
import FramerMotion from "./FramerMotion";
import CustomEditor from "./Richtexteditor";
import DataFetchingComponent from "./UseCallback";

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
  {
    name: "Framer motion",
    path: "/framer",
    Component: FramerMotion,
  },
  {
    name: "Rict Text Editor",
    path: "/editor",
    Component: CustomEditor,
  },
  {
    name: "useCallback()",
    path: "/use_callback",
    Component: DataFetchingComponent,
  },
  // Add more routes here...
];
