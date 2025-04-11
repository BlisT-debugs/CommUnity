import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Settings, 
  UserRound,
  Home, 
  Lightbulb, 
  ListTodo, 
  Map, 
  MessageSquare, 
  Plus, 
  Recycle, 
  School, 
  ShieldAlert, 
  Trophy, 
  Users,
  BadgeCheck,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import GlobalSearch from '@/components/search/GlobalSearch';
import LanguageSelector from '@/components/settings/LanguageSelector';
import NetworkIndicator from '@/components/ui/network-indicator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { useCommunities } from '@/hooks/useCommunities';
import CreateCommunityDialog from '@/components/community/CreateCommunityDialog';

const categories = [
  { id: 'waste', name: 'Waste Management', icon: Recycle, color: 'text-green-600' },
  { id: 'education', name: 'Education', icon: School, color: 'text-blue-600' },
  { id: 'safety', name: 'Safety', icon: ShieldAlert, color: 'text-red-600' },
];

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Communities', href: '/communities', icon: Users },
  { name: 'Explore Issues', href: '/issues', icon: Map },
  { name: 'My Projects', href: '/projects', icon: ListTodo },
  { name: 'Discussions', href: '/discussions', icon: MessageSquare },
  { name: 'Ideas', href: '/ideas', icon: Lightbulb },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Helpline', href: '/helpline', icon: BadgeCheck },
];

const AppHeader = () => {
  const { user, profile, signOut } = useAuth();
  const { isMobile } = useApp();
  const { toggleSidebar } = useApp();
  const { t } = useLanguage();
  const { connectionStatus } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { communities, isLoading } = useCommunities({ userId: user?.id, limit: 5 });
  
  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-8 w-8 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="hidden md:flex items-center gap-2 mr-4">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <div className="rounded-lg bg-primary p-1">
          <span className="text-white">Comm</span>
        </div>
        <span className="text-foreground">Unity</span>
      </Link>
    </div>

          {/* Logo - only show on mobile or when sidebar is closed */}
          <div className="flex items-center gap-2 font-bold text-xl md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-1">
                <span className="text-white">Comm</span>
              </div>
              <span>Unity</span>
            </Link>
          </div>
          
          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {/* Main Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Menu <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Issue Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/category/${category.id}`} className="flex items-center">
                      <category.icon className={cn("mr-2 h-4 w-4", category.color)} />
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Communities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  My Communities <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Communities</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isLoading ? (
                  <div className="px-2 py-1 text-sm text-muted-foreground">Loading...</div>
                ) : communities.length > 0 ? (
                  communities.map((community) => (
                    <DropdownMenuItem key={community.id} asChild>
                      <Link to={`/community/${community.id}`} className="flex items-center">
                        <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
                          {community.name.charAt(0).toUpperCase()}
                        </span>
                        <span>{community.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-2 py-1 text-sm text-muted-foreground">
                    No communities joined yet
                  </div>
                )}
                <DropdownMenuSeparator />
                {user && (
                  <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create Community</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search and User Controls */}
          <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
            <GlobalSearch />
            
            {/* Language selector */}
            <LanguageSelector variant="minimal" />
            
            {/* Network status indicator */}
            {!isMobile && <NetworkIndicator />}
            
            {/* Notifications */}
            {user && (
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                    {/* Unread indicator */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>{t('Notifications')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {connectionStatus === 'offline' ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      {t('Notifications unavailable offline')}
                    </div>
                  ) : (
                    <>
                      <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                        <div className="font-medium">{t('New issue created in your community')}</div>
                        <div className="text-sm text-muted-foreground">2 hours ago</div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                        <div className="font-medium">{t('Your issue was upvoted')}</div>
                        <div className="text-sm text-muted-foreground">Yesterday</div>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/notifications" className="w-full text-center cursor-pointer">
                      {t('View all notifications')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.username || 'User'} />
                      <AvatarFallback>{profile?.username?.charAt(0) || profile?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    {/* Online indicator */}
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.full_name || profile?.username}</p>
                      {profile?.username && (
                        <p className="text-xs leading-none text-muted-foreground">@{profile?.username}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <UserRound className="mr-2 h-4 w-4" />
                      {t('Profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('Settings')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    {t('Log out')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm">
                <Link to="/auth">{t('Log in')}</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <CreateCommunityDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </>
  );
};

export default AppHeader;