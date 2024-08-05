import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://a.khalti.com/api/v2/epayment/initiate/",
      changeOrigin: true,
    }),
  );
}
