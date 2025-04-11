
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';

const WasteManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="flex-1 flex flex-col min-h-screen">
          
          <main className="flex-1 container py-6">
            <h1 className="text-3xl font-bold mb-6">Management</h1>
            
            <div className="bg-muted p-12 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">
                The Waste Management page is currently under development. Check back later!
              </p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default WasteManagement;
