import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BadgeCheck, 
  Home, 
  LightbulbIcon, 
  ListTodo, 
  Map, 
  MessageSquare, 
  Plus, 
  Recycle, 
  School, 
  ShieldAlert, 
  Trophy, 
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateCommunityDialog from '@/components/community/CreateCommunityDialog';
import { useAuth } from '@/hooks/useAuth';

const AppMain = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex-1 p-4">
      {/* Main content area */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome to Community</h1>
        
        {/* Add your main page content here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Community Features</h2>
          <p className="mb-4">
            This is the main content area where you can display your application's 
            primary content, features, or dashboard.
          </p>
          
          {user && (
            <Button 
              onClick={() => setShowCreateDialog(true)} 
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Community</span>
            </Button>
          )}
        </div>
      </div>

      {/* Keep the dialog for creating communities if needed */}
      <CreateCommunityDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};

export default AppMain;