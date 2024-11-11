import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
// import App from "./App.tsx";
import { App } from "./comps/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App app={{}} />
  </StrictMode>
);
