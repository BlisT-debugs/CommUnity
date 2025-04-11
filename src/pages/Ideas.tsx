import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';

type Idea = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
};

const Ideas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      title: 'Dark Mode Toggle',
      description: 'Add a dark mode toggle to the application for better user experience during night time usage.',
      category: 'UI/UX',
      createdAt: '2023-10-15',
      user: {
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
      },
    },
    {
      id: '2',
      title: 'Keyboard Shortcuts',
      description: 'Implement keyboard shortcuts for common actions to improve productivity for power users.',
      category: 'Feature',
      createdAt: '2023-10-10',
      user: {
        name: 'Sam Wilson',
        avatar: '/avatars/sam.jpg',
      },
    },
    {
      id: '3',
      title: 'Mobile App Version',
      description: 'Create a mobile version of the application to allow users to access features on the go.',
      category: 'Mobile',
      createdAt: '2023-09-28',
      user: {
        name: 'Taylor Smith',
        avatar: '/avatars/taylor.jpg',
      },
    },
  ]);

  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'UI/UX', 'Feature', 'Mobile', 'Performance', 'Security', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.title || !newIdea.description || !newIdea.category) return;
    
    const idea: Idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      category: newIdea.category,
      createdAt: new Date().toISOString().split('T')[0],
      user: {
        name: 'You',
        avatar: '/avatars/you.jpg',
      },
    };
    
    setIdeas([idea, ...ideas]);
    setNewIdea({ title: '', description: '', category: '' });
  };

  const filteredIdeas = ideas
    .filter(idea => 
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(idea => filterCategory === 'All' || idea.category === filterCategory);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 flex flex-col min-h-screen">
          
          <main className="flex-1 container py-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Ideas</h1>
                <p className="text-muted-foreground">Share and explore ideas for improving our product</p>
              </div>
              <Button className="gap-2">
                <Plus size={16} />
                Submit Idea
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Filter size={16} />
                    Filters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search ideas..." 
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-4">Submit Your Idea</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input 
                        placeholder="What's your idea?" 
                        value={newIdea.title}
                        onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea 
                        placeholder="Describe your idea in detail..." 
                        rows={3}
                        value={newIdea.description}
                        onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Select 
                        value={newIdea.category} 
                        onValueChange={(value) => setNewIdea({...newIdea, category: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c !== 'All').map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full gap-2">
                      <Plus size={16} />
                      Submit Idea
                    </Button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                {filteredIdeas.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-12 rounded-lg text-center shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">No ideas found</h2>
                    <p className="text-muted-foreground">
                      {searchTerm || filterCategory !== 'All' 
                        ? 'Try adjusting your search or filters'
                        : 'Be the first to submit an idea!'}
                    </p>
                  </div>
                ) : (
                  filteredIdeas.map(idea => (
                    <div key={idea.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                          {idea.user.avatar ? (
                            <img src={idea.user.avatar} alt={idea.user.name} className="w-full h-full rounded-full" />
                          ) : (
                            idea.user.name.charAt(0)
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <span className="font-medium">{idea.user.name}</span>
                            <span className="text-muted-foreground text-sm">{idea.createdAt}</span>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                          <p className="text-muted-foreground mb-4">{idea.description}</p>
                          
                          <Badge variant="outline" className="px-3 py-1 text-sm">
                            {idea.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Ideas;