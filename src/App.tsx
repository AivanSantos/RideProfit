import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
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
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import PrivateRoute from "@/components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <TransactionProvider>
            <ShoppingListProvider>
              <Toaster />
              <Sonner />
              <Router>
                <SettingsProvider>
                  <div className="min-h-screen flex flex-col">
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
                              <Dashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/expenses"
                          element={
                            <PrivateRoute>
                              <Expenses />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/income"
                          element={
                            <PrivateRoute>
                              <Income />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/shopping-list"
                          element={
                            <PrivateRoute>
                              <ShoppingList />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/reports"
                          element={
                            <PrivateRoute>
                              <Reports />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/notifications"
                          element={
                            <PrivateRoute>
                              <Notifications />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/transactions"
                          element={
                            <PrivateRoute>
                              <Transactions />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            <PrivateRoute>
                              <Profile />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/settings"
                          element={
                            <PrivateRoute>
                              <Settings />
                            </PrivateRoute>
                          }
                        />
                        <Route path="/family" element={<Family />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </SettingsProvider>
              </Router>
            </ShoppingListProvider>
          </TransactionProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
