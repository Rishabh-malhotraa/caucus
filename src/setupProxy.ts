import { createProxyMiddleware } from "http-proxy-middleware";

function Proxy(app: any) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
}

export default Proxy;
