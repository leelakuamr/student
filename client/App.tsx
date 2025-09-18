import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Instructor from "./pages/Instructor";
import Admin from "./pages/Admin";
import Parent from "./pages/Parent";
import Discussions from "./pages/Discussions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudyGroups from "./pages/StudyGroups";
import Gamification from "./pages/Gamification";
import CalendarPage from "./pages/Calendar";
import { Layout } from "./components/app/Layout";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/instructor" element={<Instructor />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/parent" element={<Parent />} />
              <Route path="/discussions" element={<Discussions />} />
              <Route path="/study-groups" element={<StudyGroups />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/calendar" element={<CalendarPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
