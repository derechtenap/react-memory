import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

const CONTAINER = document.getElementById("app");
const ROOT = createRoot(CONTAINER);

ROOT.render(
  <StrictMode>
    <App />
  </StrictMode>
);
