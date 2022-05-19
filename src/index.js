import React from "react";

import App from "./App";
 
import * as ReactDOMClient from "react-dom/client";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App  />);
