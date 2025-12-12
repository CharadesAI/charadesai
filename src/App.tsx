import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Forgot from "./pages/Forgot";
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
import Checkout from "./pages/Checkout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthComplete from "./pages/AuthComplete";
import Account from "./pages/Account";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import DashboardProfile from "./pages/dashboard/Profile";
import DashboardBilling from "./pages/dashboard/Billing";
import DashboardAnalytics from "./pages/dashboard/Analytics";
import DashboardResults from "./pages/dashboard/Results";
import DashboardSettings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='dark'>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='/features' element={<Features />} />
              <Route path='/pricing' element={<Pricing />} />
              <Route path='/checkout' element={<Checkout />} />
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
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/auth/login' element={<Signin />} />
              <Route path='/auth/register' element={<Signup />} />
              <Route path='/auth/complete' element={<AuthComplete />} />
              <Route path='/forgot' element={<Forgot />} />
              <Route path='/account' element={<Account />} />

              {/* Protected Dashboard Routes */}
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/dashboard/profile'
                element={
                  <ProtectedRoute>
                    <DashboardProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/dashboard/billing'
                element={
                  <ProtectedRoute>
                    <DashboardBilling />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/dashboard/analytics'
                element={
                  <ProtectedRoute>
                    <DashboardAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/dashboard/results'
                element={
                  <ProtectedRoute>
                    <DashboardResults />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/dashboard/settings'
                element={
                  <ProtectedRoute>
                    <DashboardSettings />
                  </ProtectedRoute>
                }
              />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
