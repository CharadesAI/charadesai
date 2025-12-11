import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import UseCases from "./pages/UseCases";
import API from "./pages/API";
import Changelog from "./pages/Changelog";
import APIStatus from "./pages/APIStatus";
import CodeExamples from "./pages/CodeExamples";
import Community from "./pages/Community";
import Forum from "./pages/Forum";
import PressKit from "./pages/PressKit";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='dark'>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/features' element={<Features />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:slug' element={<BlogPost />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/use-cases' element={<UseCases />} />
            <Route path='/api' element={<API />} />
            <Route path='/changelog' element={<Changelog />} />
            <Route path='/status' element={<APIStatus />} />
            <Route path='/examples' element={<CodeExamples />} />
            <Route path='/community' element={<Community />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/press-kit' element={<PressKit />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/cookie-policy' element={<CookiePolicy />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
