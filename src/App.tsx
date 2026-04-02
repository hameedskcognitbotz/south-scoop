import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        {/* Liquid Background Blobs */}
        <div className="liquid-blob top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30" />
        <div className="liquid-blob bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-secondary/40 animation-delay-2000" />
        <div className="liquid-blob top-[40%] left-[30%] w-[300px] h-[300px] bg-primary/20 animation-delay-4000" />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
