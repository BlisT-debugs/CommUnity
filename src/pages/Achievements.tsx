import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import AchievementBadge from '@/components/gamification/AchievementBadge';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Star, Trophy, Target, Users, Leaf, BookOpen } from 'lucide-react';
import { achievements } from '@/services/mockData';
import { useUserAchievements } from '@/hooks/useUserAchievements';

const Achievements = () => {
  const [tab, setTab] = useState('all');
  const { achievements: userAchievements, isLoading } = useUserAchievements();

  const displayAchievements = userAchievements.length > 0 
    ? userAchievements 
    : achievements.map(a => ({
        ...a,
        badge_image: '',
        required_points: 0,
        achievement_type: a.type,
        type: a.type as 'bronze' | 'silver' | 'gold' | 'platinum',
        unlocked: a.unlocked,
        progress: a.progress
      }));

  const filteredAchievements = tab === 'all' 
    ? displayAchievements
    : displayAchievements.filter(achievement => 
        achievement.type === tab || 
        (tab === 'unlocked' && achievement.unlocked) || 
        (tab === 'locked' && !achievement.unlocked)
      );

  const categories = [
    { title: 'Participation', icon: <Award className="h-5 w-5 text-yellow-500" />, key: 'participation' },
    { title: 'Community', icon: <Users className="h-5 w-5 text-blue-500" />, key: 'community' },
    { title: 'Environmental', icon: <Leaf className="h-5 w-5 text-green-500" />, key: 'environment' },
    { title: 'Leadership', icon: <Trophy className="h-5 w-5 text-red-500" />, key: 'leadership' },
    { title: 'Collaboration', icon: <Target className="h-5 w-5 text-purple-500" />, key: 'collaboration' },
    { title: 'Other Achievements', icon: <BookOpen className="h-5 w-5 text-orange-500" />, key: 'other' }
  ];

  const getCategoryAchievements = (key: string) => {
    switch (key) {
      case 'participation':
        return filteredAchievements.filter(a => a.name?.toLowerCase().includes('contribution') || a.name?.toLowerCase().includes('first'));
      case 'community':
        return filteredAchievements.filter(a => a.name?.toLowerCase().includes('community'));
      case 'environment':
        return filteredAchievements.filter(a => a.name?.toLowerCase().includes('eco') || a.name?.toLowerCase().includes('environment'));
      case 'leadership':
        return filteredAchievements.filter(a => a.name?.toLowerCase().includes('leader'));
      case 'collaboration':
        return filteredAchievements.filter(a => a.name?.toLowerCase().includes('collaborat'));
      case 'other':
        return filteredAchievements.filter(a => 
          !a.name?.toLowerCase().includes('contribution') && 
          !a.name?.toLowerCase().includes('first') &&
          !a.name?.toLowerCase().includes('eco') &&
          !a.name?.toLowerCase().includes('environment') &&
          !a.name?.toLowerCase().includes('community') &&
          !a.name?.toLowerCase().includes('leader') &&
          !a.name?.toLowerCase().includes('collaborat')
        );
      default:
        return [];
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-slate-100">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />

          <main className="flex-1 container py-6">
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold mb-2 text-primary">Your Achievements</h1>
              <p className="text-muted-foreground text-lg">Level up your journey with every badge earned!</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-xl p-6 flex flex-col items-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-muted-foreground/20"></div>
                    <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
                    <div className="h-3 w-32 bg-muted-foreground/20 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Tabs defaultValue="all" className="mb-8" onValueChange={setTab}>
                  <div className="border-b">
                    <TabsList className="bg-white">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="bronze">Bronze</TabsTrigger>
                      <TabsTrigger value="silver">Silver</TabsTrigger>
                      <TabsTrigger value="gold">Gold</TabsTrigger>
                      <TabsTrigger value="platinum">Platinum</TabsTrigger>
                      <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
                      <TabsTrigger value="locked">Locked</TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>

                <div className="space-y-12">
                  {categories.map(({ title, icon, key }) => {
                    const items = getCategoryAchievements(key);
                    if (!items.length) return null;
                    return (
                      <div key={key} className="animate-fade-in-up">
                        <div className="flex items-center gap-2 mb-4">
                          {icon}
                          <h2 className="text-2xl font-semibold text-primary/90">{title}</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {items.map((achievement) => (
                            <div
                              key={achievement.id}
                              className={`rounded-xl p-6 flex flex-col items-center text-center space-y-4 border-2 transition-shadow hover:shadow-lg hover:border-primary bg-white`}
                            >
                              <AchievementBadge
                                name={achievement.name}
                                description={achievement.description}
                                type={achievement.type}
                                unlocked={!!achievement.unlocked}
                                progress={achievement.progress}
                                icon={<Star className="h-6 w-6 text-yellow-400" />}
                                className="w-16 h-16"
                              />
                              <h3 className="font-semibold text-lg text-primary/90">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <Badge variant={achievement.unlocked ? "default" : "outline"} className="text-xs px-3 py-1">
                                {achievement.unlocked ? "Unlocked" : achievement.progress ? `${achievement.progress}% Complete` : "Locked"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {filteredAchievements.length === 0 && (
                    <div className="text-center py-12">
                      <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No achievements found</h3>
                      <p className="text-muted-foreground">No achievements match your current filter</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Achievements;
