
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import LoggedInDashboard from '@/components/dashboard/LoggedInDashboard';
import WelcomePage from '@/components/home/WelcomePage';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, isLoading } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <AppHeader />
      
      <main className="flex-1 container py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          user ? <LoggedInDashboard /> : <WelcomePage />
        )}
      </main>
      
      <footer className="border-t py-6 bg-muted/40">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-xl mb-2">
              <div className="rounded-lg bg-primary p-1">
                <span className="text-white">Comm</span>
              </div>
              <span className="text-socio-darkgreen">Unity</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting communities for collaborative problem solving
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;