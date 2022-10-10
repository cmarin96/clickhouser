import React from "react";
import { createRoot } from "react-dom/client";

import "allotment/dist/style.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "../node_modules/@blueprintjs/table/lib/css/table.css";
import "../node_modules/normalize.css/normalize.css";

import App from "./components/App";
import { QueryFormProvider } from "./components/QueryForm";
import { initialState } from "./components/QueryForm/QueryForm.reducer";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryFormProvider initialState={initialState}>
      <App />
    </QueryFormProvider>
  </React.StrictMode>
);
