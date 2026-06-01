import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { Route, Routes } from "react-router";
import LoginPages from "./pages/LoginPages.tsx";
import Dashboard from "./pages/dashboard/Monitoring.tsx";
import Layout from "./layout/Layout.tsx";
import User from "./pages/dashboard/User.tsx";
import VirtualDesktop from "./pages/dashboard/VirtualDesktop.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import IpAddress from "./pages/dashboard/IpAddress.tsx";
import Angkatan from "./pages/dashboard/Angkatan.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route path="/login" element={<LoginPages />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<User />} />
              <Route path="virtual-desktop" element={<VirtualDesktop />} />
              <Route path="ip-address" element={<IpAddress />} />
              <Route path="angkatan" element={<Angkatan />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
