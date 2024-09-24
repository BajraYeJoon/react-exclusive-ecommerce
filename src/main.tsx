import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
// import { PostHogProvider } from "posthog-js/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./user-portal/context/useAuthContext";
import { Toaster } from "sonner";
import { RecoilRoot, useRecoilValue } from "recoil";
import { IntlProvider } from "react-intl";
import { Analytics } from "@vercel/analytics/react";
import en_msg from "./user-portal/locales/en.json";
import es_msg from "./user-portal/locales/es.json";
import np_msg from "./user-portal/locales/np.json";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { languageState } from "./user-portal/atoms/languageState";
// import * as Sentry from "@sentry/react";

const messages: { [key: string]: Record<string, string> } = {
  en: en_msg,
  es: es_msg,
  np: np_msg,
};

// const options = {
//   api_host: "https://us.i.posthog.com",
// };

const query = new QueryClient();

// {
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//       refetchOnWindowFocus: true,
//     },
//   },
// }

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const lang = useRecoilValue(languageState);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      {children}
    </IntlProvider>
  );
};

// Sentry.init({
//   dsn: "https://4f4232c9ac40c5d92c1055cf551e0dec@o4506301865918464.ingest.us.sentry.io/4507859866419200",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration(),
//   ],
//   // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: [
//     "localhost",
//     "https://nest-ecommerce-1fqk.onrender.com",
//     "https://react-exclusive-ecommerce.vercel.app/",
//     /^https:\/\/yourserver\.io\/api/,
//   ],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      {/* <PostHogProvider
        apiKey="phc_fQcn9SW8lEM635UzO6NIJQwS4OPo2tsakZJriWF44Nx"
        options={options}
      > */}
      <RecoilRoot>
        <LanguageWrapper>
          <AuthProvider>
            <App />
            <Analytics />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </AuthProvider>
        </LanguageWrapper>
      </RecoilRoot>
      {/* </PostHogProvider> */}
    </QueryClientProvider>
  </React.StrictMode>,
);
