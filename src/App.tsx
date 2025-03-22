import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardLayout from "@/components/Dashboard/Layout";
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
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <SettingsProvider>
            <ThemeProvider>
              <TransactionProvider>
                <ShoppingListProvider>
                  <Toaster />
                  <Sonner />
                  <Router>
                    <div className="min-h-screen flex flex-col bg-background text-foreground">
                      <Navbar />
                      <main className="flex-grow">
                        <ScrollToTop />
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/cookies" element={<Cookies />} />
                          <Route path="/gdpr" element={<GDPR />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route
                            path="/dashboard"
                            element={
                              <PrivateRoute>
                                <DashboardLayout />
                              </PrivateRoute>
                            }
                          >
                            <Route index element={<Dashboard />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                          </Route>
                          <Route path="/expenses" element={<Expenses />} />
                          <Route path="/income" element={<Income />} />
                          <Route path="/shopping-list" element={<ShoppingList />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/family" element={<Family />} />
                          <Route path="/transactions" element={<Transactions />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </Router>
                </ShoppingListProvider>
              </TransactionProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
