import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, Plus, Hash, Users, Bell, X, Send, ThumbsUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

type Community = {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  recentActivity: string;
};

type Discussion = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  community: string;
  replies: number;
  views: number;
  lastActivity: string;
  createdAt: string;
};

type Message = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
};

const Discussions = () => {
  // State management
  const [activeTab, setActiveTab] = useState<'communities' | 'discussions'>('communities');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    avatar: string;
    role?: string;
    joinDate: string;
    discussions: number;
    replies: number;
  } | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    community: ''
  });

  // Sample data
  const [userMessages, setUserMessages] = useState([
    {
      id: '1',
      content: 'Hey, what do you think about the new update?',
      author: {
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
      },
      createdAt: '2 days ago',
      isCurrentUser: false,
    },
    {
      id: '2',
      content: 'I really like the new dashboard design!',
      author: {
        name: 'You',
        avatar: '/avatars/you.jpg',
      },
      createdAt: '1 day ago',
      isCurrentUser: true,
    },
    {
      id: '3',
      content: 'Glad you like it! We have more improvements coming soon.',
      author: {
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
      },
      createdAt: '12 hours ago',
      isCurrentUser: false,
    },
  ]);

  const [communities, setCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'Product Feedback',
      description: 'Share your thoughts about our product',
      members: 1243,
      icon: '💡',
      recentActivity: '2 min ago',
    },
    {
      id: '2',
      name: 'Feature Requests',
      description: 'Suggest new features you\'d like to see',
      members: 892,
      icon: '✨',
      recentActivity: '15 min ago',
    },
    {
      id: '3',
      name: 'Announcements',
      description: 'Latest updates and news',
      members: 2105,
      icon: '📢',
      recentActivity: '1 hour ago',
    },
    {
      id: '4',
      name: 'General Discussion',
      description: 'Talk about anything related to our platform',
      members: 1567,
      icon: '💬',
      recentActivity: '30 min ago',
    },
  ]);

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: '1',
      title: 'Dark mode implementation',
      content: 'Would love to see a dark mode option in the next update!',
      author: {
        name: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
        role: 'Power User',
      },
      community: '1',
      replies: 24,
      views: 156,
      lastActivity: '5 min ago',
      createdAt: '2023-10-15',
    },
    {
      id: '2',
      title: 'Mobile app performance',
      content: 'The mobile app seems to lag when loading large files. Anyone else experiencing this?',
      author: {
        name: 'Sam Wilson',
        avatar: '/avatars/sam.jpg',
      },
      community: '1',
      replies: 12,
      views: 89,
      lastActivity: '1 hour ago',
      createdAt: '2023-10-14',
    },
    {
      id: '3',
      title: 'Request: Export to PDF',
      content: 'Would be great to have a PDF export option for reports',
      author: {
        name: 'Taylor Smith',
        avatar: '/avatars/taylor.jpg',
        role: 'Pro User',
      },
      community: '2',
      replies: 18,
      views: 112,
      lastActivity: '2 hours ago',
      createdAt: '2023-10-13',
    },
  ]);

  const messages: Message[] = [
    {
      id: '1',
      content: 'I completely agree! Dark mode would be a great addition, especially for late-night work sessions.',
      author: {
        name: 'Jordan Lee',
        avatar: '/avatars/jordan.jpg',
      },
      createdAt: '5 min ago',
      likes: 8,
    },
    {
      id: '2',
      content: 'We actually have this on our roadmap for Q1 next year. Stay tuned for updates!',
      author: {
        name: 'Dev Team',
        avatar: '/avatars/dev.jpg',
        role: 'Admin',
      },
      createdAt: '2 min ago',
      likes: 15,
    },
    {
      id: '3',
      content: 'In the meantime, you could try using browser extensions like Dark Reader as a temporary solution.',
      author: {
        name: 'Riley Park',
        avatar: '/avatars/riley.jpg',
      },
      createdAt: 'Just now',
      likes: 3,
    },
  ];

  // Filtering logic
  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDiscussions = discussions
    .filter(discussion => 
      (discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCommunity || discussion.community === selectedCommunity)
    );

  // Handlers
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussion.title || !newDiscussion.content) return;
    
    const discussion: Discussion = {
      id: Date.now().toString(),
      title: newDiscussion.title,
      content: newDiscussion.content,
      author: {
        name: 'You',
        avatar: '/avatars/you.jpg',
      },
      community: selectedCommunity || '1',
      replies: 0,
      views: 0,
      lastActivity: 'Just now',
      createdAt: new Date().toISOString(),
    };
    
    setDiscussions([discussion, ...discussions]);
    setNewDiscussion({
      title: '',
      content: '',
      community: ''
    });
    setSelectedDiscussion(discussion.id);
  };

  const handleLikeMessage = (messageId: string) => {
    console.log(`Liked message ${messageId}`);
  };

  const handleSendDirectMessage = () => {
    if (!messageContent.trim() || !selectedUser) return;
    
    const newMsg = {
      id: Date.now().toString(),
      content: messageContent,
      author: {
        name: 'You',
        avatar: '/avatars/you.jpg',
      },
      createdAt: 'Just now',
      isCurrentUser: true,
    };
    
    setUserMessages([...userMessages, newMsg]);
    setIsMessageSent(true);
    setTimeout(() => setIsMessageSent(false), 3000);
    setMessageContent('');
  };

  const openUserProfile = (user: { name: string; avatar: string; role?: string }) => {
    setSelectedUser({
      ...user,
      joinDate: 'January 2023',
      discussions: 24,
      replies: 56,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />
          
          <main className="flex-1 container py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">Discussions</h1>
                <p className="text-muted-foreground">
                  {selectedDiscussion 
                    ? 'Thread discussion' 
                    : selectedCommunity 
                      ? 'Community discussions' 
                      : 'Join the conversation'}
                </p>
              </div>
              
              {!selectedDiscussion && (
                <div className="flex gap-2">
                  <Button 
                    variant={activeTab === 'communities' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('communities')}
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    Communities
                  </Button>
                  <Button 
                    variant={activeTab === 'discussions' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('discussions')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discussions
                  </Button>
                </div>
              )}
            </div>

            {selectedDiscussion ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={() => setSelectedDiscussion(null)}
                  >
                    Back to discussions
                  </Button>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="font-semibold mb-2">Discussion Info</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="cursor-pointer">
                            <Avatar onClick={() => 
                              openUserProfile(discussions.find(d => d.id === selectedDiscussion)?.author!)
                            }>
                              <AvatarImage src={discussions.find(d => d.id === selectedDiscussion)?.author.avatar} />
                              <AvatarFallback>
                                {discussions.find(d => d.id === selectedDiscussion)?.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <div className="flex justify-between items-center">
                              <DialogTitle>User Profile</DialogTitle>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </DialogHeader>
                          
                          {selectedUser && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage src={selectedUser.avatar} />
                                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                                  {selectedUser.role && (
                                    <Badge variant="secondary" className="mt-1">
                                      {selectedUser.role}
                                    </Badge>
                                  )}
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Member since {selectedUser.joinDate}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                  <p className="text-sm text-muted-foreground">Discussions</p>
                                  <p className="text-xl font-bold">{selectedUser.discussions}</p>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                  <p className="text-sm text-muted-foreground">Replies</p>
                                  <p className="text-xl font-bold">{selectedUser.replies}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3">Recent Interactions</h4>
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                  {userMessages.map(msg => (
                                    <div 
                                      key={msg.id} 
                                      className={`p-3 rounded-lg ${msg.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}
                                    >
                                      <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium">{msg.author.name}</span>
                                        <span className="text-xs text-muted-foreground">{msg.createdAt}</span>
                                      </div>
                                      <p>{msg.content}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-3">Send Message</h4>
                                <div className="flex gap-2">
                                  <Input
                                    placeholder={`Message ${selectedUser.name}...`}
                                    value={messageContent}
                                    onChange={(e) => setMessageContent(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendDirectMessage()}
                                  />
                                  <Button onClick={handleSendDirectMessage}>
                                    <Send className="w-4 h-4" />
                                  </Button>
                                </div>
                                {isMessageSent && (
                                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                                    Message sent!
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <div>
                        <p className="font-medium">
                          {discussions.find(d => d.id === selectedDiscussion)?.author.name}
                        </p>
                        {discussions.find(d => d.id === selectedDiscussion)?.author.role && (
                          <Badge variant="secondary" className="text-xs">
                            {discussions.find(d => d.id === selectedDiscussion)?.author.role}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Started {discussions.find(d => d.id === selectedDiscussion)?.createdAt}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {discussions.find(d => d.id === selectedDiscussion)?.replies} replies •{' '}
                      {discussions.find(d => d.id === selectedDiscussion)?.views} views
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {discussions.find(d => d.id === selectedDiscussion)?.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {discussions.find(d => d.id === selectedDiscussion)?.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last activity: {discussions.find(d => d.id === selectedDiscussion)?.lastActivity}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {messages.map(message => (
                      <div key={message.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div className="flex gap-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="cursor-pointer">
                                <Avatar 
                                  className="hover:ring-2 hover:ring-primary"
                                  onClick={() => openUserProfile(message.author)}
                                >
                                  <AvatarImage src={message.author.avatar} />
                                  <AvatarFallback>{message.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <div className="flex justify-between items-center">
                                  <DialogTitle>User Profile</DialogTitle>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-6">
                                  {/* User profile content */}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{message.author.name}</p>
                              {message.author.role && (
                                <Badge variant="secondary" className="text-xs">
                                  {message.author.role}
                                </Badge>
                              )}
                              <span className="text-sm text-muted-foreground">{message.createdAt}</span>
                            </div>
                            <p className="mb-2">{message.content}</p>
                            <div className="flex items-center gap-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`gap-1 ${message.isLiked ? 'text-blue-500' : ''}`}
                                onClick={() => handleLikeMessage(message.id)}
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{message.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <MessageSquare className="w-4 h-4" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <Textarea
                      placeholder="Write your reply..."
                      rows={3}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex justify-end">
                      <Button type="submit">Post Reply</Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : selectedCommunity ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={() => setSelectedCommunity(null)}
                  >
                    Back to communities
                  </Button>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">
                        {communities.find(c => c.id === selectedCommunity)?.icon}
                      </div>
                      <h3 className="font-semibold text-lg">
                        {communities.find(c => c.id === selectedCommunity)?.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {communities.find(c => c.id === selectedCommunity)?.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        <Users className="inline w-4 h-4 mr-1" />
                        {communities.find(c => c.id === selectedCommunity)?.members} members
                      </span>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Follow
                      </Button>
                    </div>
                  </div>
                  
                  {/* Discussion Creation Form */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Create New Discussion</h3>
                    <form onSubmit={handleCreateDiscussion} className="space-y-3">
                      <Input
                        placeholder="Discussion title"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                        required
                      />
                      <Textarea
                        placeholder="What's your discussion about?"
                        rows={3}
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                        required
                      />
                      <Button type="submit" className="w-full gap-2">
                        <Plus className="w-4 h-4" />
                        Post Discussion
                      </Button>
                    </form>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search discussions..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {filteredDiscussions.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-12 rounded-lg text-center shadow-sm">
                      <h2 className="text-xl font-semibold mb-2">No discussions found</h2>
                      <p className="text-muted-foreground">
                        {searchTerm 
                          ? 'Try adjusting your search'
                          : 'Be the first to start a discussion!'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredDiscussions.map(discussion => (
                        <div 
                          key={discussion.id} 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedDiscussion(discussion.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button 
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openUserProfile(discussion.author);
                                  }}
                                >
                                  <Avatar>
                                    <AvatarImage src={discussion.author.avatar} />
                                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <div className="flex justify-between items-center">
                                    <DialogTitle>User Profile</DialogTitle>
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-6">
                                    {/* User profile content */}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{discussion.author.name}</p>
                                {discussion.author.role && (
                                  <Badge variant="secondary" className="text-xs">
                                    {discussion.author.role}
                                  </Badge>
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {discussion.createdAt}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold mb-1">{discussion.title}</h3>
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {discussion.content}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-muted-foreground">
                                  <MessageSquare className="inline w-4 h-4 mr-1" />
                                  {discussion.replies} replies
                                </span>
                                <span className="text-muted-foreground">
                                  {discussion.views} views
                                </span>
                                <span className="text-muted-foreground">
                                  Last activity: {discussion.lastActivity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder={`Search ${activeTab}...`} 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        All {activeTab}
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Popular
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Recent
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  {activeTab === 'communities' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredCommunities.map(community => (
                        <div 
                          key={community.id} 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedCommunity(community.id)}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="text-2xl p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              {community.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{community.name}</h3>
                              <p className="text-muted-foreground text-sm">
                                {community.members} members
                              </p>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-3">{community.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Last activity: {community.recentActivity}
                            </span>
                            <Button variant="outline" size="sm">
                              Join
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredDiscussions.map(discussion => (
                        <div 
                          key={discussion.id} 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedDiscussion(discussion.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button 
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openUserProfile(discussion.author);
                                  }}
                                >
                                  <Avatar>
                                    <AvatarImage src={discussion.author.avatar} />
                                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <div className="flex justify-between items-center">
                                    <DialogTitle>User Profile</DialogTitle>
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-6">
                                    {/* User profile content */}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{discussion.author.name}</p>
                                {discussion.author.role && (
                                  <Badge variant="secondary" className="text-xs">
                                    {discussion.author.role}
                                  </Badge>
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {discussion.createdAt}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold mb-1">{discussion.title}</h3>
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {discussion.content}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-muted-foreground">
                                  <MessageSquare className="inline w-4 h-4 mr-1" />
                                  {discussion.replies} replies
                                </span>
                                <span className="text-muted-foreground">
                                  {discussion.views} views
                                </span>
                                <span className="text-muted-foreground">
                                  Last activity: {discussion.lastActivity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Discussions;