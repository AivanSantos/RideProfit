import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "./contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import ShoppingList from "./pages/ShoppingList";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import GDPR from "./pages/GDPR";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Family from "./pages/Family";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ScrollToTop />
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/family" element={<Family />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" richColors />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
