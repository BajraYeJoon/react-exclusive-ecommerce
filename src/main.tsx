import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
