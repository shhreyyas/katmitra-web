import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import Index from "./pages/Index";
import PricingEntry from "./pages/PricingEntry";
import FAQs from "./pages/FAQs";
import Support from "./pages/Support";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAccessCodes from "./pages/admin/AdminAccessCodes";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminQuotations from "./pages/admin/AdminQuotations";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
};

// Component to ensure favicon is properly set on all routes (fixes Safari issue)
const FaviconUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // Aggressively update favicon to force Safari to reload new icon
    const forceFaviconUpdate = () => {
      // Remove ALL existing favicon links to clear cache
      const allFaviconLinks = document.querySelectorAll(
        'link[rel*="icon"], link[rel*="shortcut"], link[rel*="apple-touch"]'
      );
      allFaviconLinks.forEach((link) => link.remove());

      // Create new favicon links with strong cache-busting
      const timestamp = Date.now();
      const version = "v3-katmitra";

      // Primary ICO favicon (Safari prefers this)
      const icoLink = document.createElement("link");
      icoLink.rel = "icon";
      icoLink.type = "image/x-icon";
      icoLink.href = `/favicon.ico?${version}&t=${timestamp}`;
      document.head.appendChild(icoLink);

      // JPG fallback
      const jpgLink = document.createElement("link");
      jpgLink.rel = "icon";
      jpgLink.type = "image/jpeg";
      jpgLink.href = `/favicon.jpg?${version}&t=${timestamp}`;
      document.head.appendChild(jpgLink);

      // Shortcut icon (ICO)
      const shortcutIco = document.createElement("link");
      shortcutIco.rel = "shortcut icon";
      shortcutIco.type = "image/x-icon";
      shortcutIco.href = `/favicon.ico?${version}&t=${timestamp}`;
      document.head.appendChild(shortcutIco);

      // Shortcut icon (JPG)
      const shortcutJpg = document.createElement("link");
      shortcutJpg.rel = "shortcut icon";
      shortcutJpg.type = "image/jpeg";
      shortcutJpg.href = `/favicon.jpg?${version}&t=${timestamp}`;
      document.head.appendChild(shortcutJpg);

      // Apple Touch Icon
      const appleIcon = document.createElement("link");
      appleIcon.rel = "apple-touch-icon";
      appleIcon.sizes = "180x180";
      appleIcon.href = `/favicon.jpg?${version}&t=${timestamp}`;
      document.head.appendChild(appleIcon);

      // Force reload by creating a temporary image element
      const img = new Image();
      img.src = `/favicon.ico?${version}&t=${timestamp}`;
    };

    // Run immediately and also after a small delay
    forceFaviconUpdate();
    const timer = setTimeout(forceFaviconUpdate, 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Also run on initial mount
  useEffect(() => {
    const forceFaviconUpdate = () => {
      const allFaviconLinks = document.querySelectorAll(
        'link[rel*="icon"], link[rel*="shortcut"], link[rel*="apple-touch"]'
      );
      allFaviconLinks.forEach((link) => link.remove());

      const timestamp = Date.now();
      const version = "v3-katmitra";

      const icoLink = document.createElement("link");
      icoLink.rel = "icon";
      icoLink.type = "image/x-icon";
      icoLink.href = `/favicon.ico?${version}&t=${timestamp}`;
      document.head.appendChild(icoLink);
    };

    forceFaviconUpdate();
  }, []);

  return null;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <FaviconUpdater />
    <Routes>
      {/* PricingEntry: normal visit = Index; ?session_id= = app checkout (avoids /pricing 404 on hosts without SPA rewrites) */}
      <Route path="/" element={<PricingEntry />} />
      <Route path="/home" element={<Index />} />
      <Route path="/features" element={<Index />} />
      <Route path="/how-it-works" element={<Index />} />
      <Route path="/pricing" element={<PricingEntry />} />
      <Route path="/clients" element={<Index />} />
      <Route path="/contact" element={<Index />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/support" element={<Support />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/access-codes" element={<AdminAccessCodes />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/quotations" element={<AdminQuotations />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
        </Route>
      </Route>
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <ThemeProvider>
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
  </ThemeProvider>
);

export default App;
