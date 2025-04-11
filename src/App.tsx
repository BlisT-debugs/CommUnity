
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import Issues from "./pages/Issues";
import Projects from "./pages/Projects";
import Discussions from "./pages/Discussions";
import Ideas from "./pages/Ideas";
import Achievements from "./pages/Achievements";
import WasteManagement from "./pages/issues/WasteManagement";
import Education from "./pages/issues/Education";
//import Safety from "./pages/issues/Safety";import CommunityDetail from "./pages/CommunityDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import TranslateComponent from "@/components/TranslateComponent";
import HelplineSection from "./components/helpline/HelplineSection";


// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <AppProvider>
              <BrowserRouter>
              <TranslateComponent />

          
  

                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/community/:id" element={<CommunityDetail />} />
                  <Route path="/issues" element={<Issues />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/discussions" element={<Discussions />} />
                  <Route path="/ideas" element={<Ideas />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/helpline" element={<HelplineSection />} />
                  <Route path="/issues/waste-management" element={<WasteManagement />} />
<Route path="/issues/education" element={<Education />} />
                </Routes>
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </AppProvider>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
