import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContext";
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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <div className="flex flex-col min-h-screen">
          {!user && <Navbar />}
          <main className="flex-grow">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
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
          </main>
          {!user && <Footer />}
        </div>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
