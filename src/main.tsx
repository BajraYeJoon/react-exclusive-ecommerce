import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/useAuthContext";

const options = {
  api_host: "https://us.i.posthog.com",
};

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <PostHogProvider
        apiKey="phc_fQcn9SW8lEM635UzO6NIJQwS4OPo2tsakZJriWF44Nx"
        options={options}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </PostHogProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
