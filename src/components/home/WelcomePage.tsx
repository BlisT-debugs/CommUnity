import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart3, Trophy, ArrowRight, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommunityCard from '@/components/community/CommunityCard';
import FeatureCard from '@/components/home/FeatureCard';
import { useCommunities } from '@/hooks/useCommunities';

const WelcomePage: React.FC = () => {
  const { communities, isLoading } = useCommunities({ limit: 3 });

  return (
    <div className="flex flex-col" style={{ backgroundColor: '#FFF7F3' }}>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 text-black" style={{ backgroundColor: '#FFF7F3' }}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Build Stronger Communities Together</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with neighbors, solve local problems, and earn rewards for your contributions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-md px-8 py-6" asChild>
                <Link to="/auth?tab=signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/40 backdrop-blur-sm text-md px-8 py-6 hover:bg-white/60" asChild>
                <Link to="/communities">Explore Communities</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16" style={{ backgroundColor: '#FFF7F3' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How CommUnity Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to get involved, collaborate, and make a real difference in your local community.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mt-12">
            <FeatureCard 
              title="Connect" 
              description="Find and join communities based on your location and interests" 
              icon={<Users className="h-10 w-10 text-primary" />} 
            />
            <FeatureCard 
              title="Collaborate" 
              description="Work with others to identify and solve real community problems" 
              icon={<BarChart3 className="h-10 w-10 text-primary" />} 
            />
            <FeatureCard 
              title="Earn Rewards" 
              description="Get recognition for your contributions with points and achievement badges" 
              icon={<Trophy className="h-10 w-10 text-primary" />} 
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16" style={{ backgroundColor: '#FFF7F3' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                  alt="People collaborating" 
                  className="w-full rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-1/2 text-black">
              <h2 className="text-3xl font-bold mb-6">Why Join CommUnity?</h2>
              <ul className="space-y-4">
                {[
                  "Connect with like-minded neighbors who care about your community",
                  "Identify and tackle local issues that matter to you",
                  "Collaborate on meaningful projects that create real impact",
                  "Earn recognition through our gamified achievement system",
                  "Build valuable skills while helping your community thrive"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="h-5 w-5 text-secondary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Communities Section */}
      <div className="py-16" style={{ backgroundColor: '#FFF7F3' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Featured Communities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join these active communities or create your own to start making a difference
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : communities.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {communities.map((community) => (
                <CommunityCard 
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  description={community.description || ''}
                  memberCount={community.member_count}
                  categories={['Community']}
                  imageUrl={community.image_url || undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No communities found. Be the first to create one!</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/communities">View All Communities <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-black text-center" style={{ backgroundColor: '#FFF7F3' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our platform today and start collaborating with your neighbors to create the community you've always wanted.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-primary text-white hover:bg-primary/90"
            asChild
          >
            <Link to="/auth?tab=signup">Create Your Free Account</Link>
          </Button>
        </div>
      </div>

    </div>
  );
};

export default WelcomePage;
