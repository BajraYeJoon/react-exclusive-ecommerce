import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/useAuthContext";
import { Toaster } from "sonner";
import { RecoilRoot } from "recoil";
import { IntlProvider } from "react-intl";

import en_msg from "./locales/en.json";
import es_msg from "./locales/es.json";

const messages = {
  en: en_msg,
  es: es_msg,
};

const options = {
  api_host: "https://us.i.posthog.com",
};

const query = new QueryClient();
const locale = "es";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <PostHogProvider
        apiKey="phc_fQcn9SW8lEM635UzO6NIJQwS4OPo2tsakZJriWF44Nx"
        options={options}
      >
        <RecoilRoot>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <AuthProvider>
              <App />
              <Toaster />
            </AuthProvider>
          </IntlProvider>
        </RecoilRoot>
      </PostHogProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
