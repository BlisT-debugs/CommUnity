import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, Leaf, Recycle, Lightbulb } from 'lucide-react';

const EducationPage = () => {
  const resources = [
    {
      id: 1,
      title: "Community Recycling Guide",
      icon: <Recycle className="w-5 h-5" />,
      content: "Learn proper recycling practices for your area",
      link: "#"
    },
    {
      id: 2,
      title: "Local Composting",
      icon: <Leaf className="w-5 h-5" />,
      content: "Find composting facilities near you",
      link: "#"
    }
  ];

  return (
    <div className="community-education">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          Community Education
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="flex flex-row items-center gap-3">
              {resource.icon}
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{resource.content}</p>
              <a href={resource.link} className="text-primary hover:underline">
                Learn more →
              </a>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default EducationPage;