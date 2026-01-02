import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import FAQs from "./pages/FAQs";
import Support from "./pages/Support";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
    <FaviconUpdater />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="/features" element={<Index />} />
      <Route path="/how-it-works" element={<Index />} />
      <Route path="/pricing" element={<Index />} />
      <Route path="/clients" element={<Index />} />
      <Route path="/contact" element={<Index />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/support" element={<Support />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
