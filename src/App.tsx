import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DocLayout } from "./components/layout/DocLayout";
import { Overview } from "./pages/Overview";
import { GettingStarted } from "./pages/GettingStarted";
import { Authentication } from "./pages/Authentication";
import { ServerToServer } from "./pages/ServerToServer";
import { Webhook } from "./pages/Webhook";
import { GatewayIntegration } from "./pages/GatewayIntegration";
import { PaymentChannel } from "./pages/PaymentChannel";
import { EndToEndTest } from "./pages/EndToEndTest";
import ScrollToTop from "./components/commons/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <DocLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/server-to-server/*" element={<ServerToServer />} />
          <Route path="/gateway-integration" element={<GatewayIntegration />} />
          <Route path="/gateway-integration/payment-channel" element={<PaymentChannel />} />
          <Route path="/gateway-integration/end-to-end-test" element={<EndToEndTest />} />
          <Route path="/webhook" element={<Webhook />} />
        </Routes>
      </DocLayout>
    </Router>
  );
}

export default App;
