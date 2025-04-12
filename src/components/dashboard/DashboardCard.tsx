import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
        <div className="text-white text-2xl">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-extrabold mb-1">{value}</div>
        <p className="text-sm text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
