import { createProxyMiddleware } from "http-proxy-middleware";

function Proxy(app: any) {
  app.use(
    "/",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
    })
  );
  app.use(
    "/",
    createProxyMiddleware({
      target: process.env.REACT_APP_CONVERGENCE_URL,
      changeOrigin: true,
    })
  );
}

export default Proxy;
