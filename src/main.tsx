import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { Route, Routes } from "react-router";
import LoginPages from "./pages/LoginPages.tsx";
import Dashboard from "./pages/dashboard/Monitoring.tsx";
import Layout from "./layout/Layout.tsx";
import User from "./pages/dashboard/UserPage.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import IpAddress from "./pages/dashboard/IpAddressPage.tsx";
import Angkatan from "./pages/dashboard/Angkatan.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VirtualMachines from "./pages/dashboard/Virtual-Machine/VirtualMachinesPage.tsx";
import DetailVirtualMachine from "./pages/dashboard/Virtual-Machine/DetailVirtualMachinePage.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
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
                <Route path="virtual-desktop" element={<VirtualMachines />} />
                <Route
                  path="virtual-desktop/:vmid"
                  element={<DetailVirtualMachine />}
                />
                <Route path="ip-address" element={<IpAddress />} />
                <Route path="angkatan" element={<Angkatan />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  </QueryClientProvider>,
);
