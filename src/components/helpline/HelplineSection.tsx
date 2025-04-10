import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import { Phone, ShieldCheck, PhoneCall, UserCheck, Siren, Heart } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

const contacts = [
  {
    label: 'Hostel Office',
    number: '044-27453159, 044-27456363, 044-27434506',
    icon: UserCheck,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'SRM College main helpdesk',
    number: '044-27434503, hostel.helpdesk.ktr@srmist.edu.in',
    icon: ShieldCheck,
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    label: 'Local police helpline',
    number: '9498100279',
    icon: PhoneCall,
    bg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    label: 'Women’s Safety Helpline',
    number: '100 / +91-44420-12345',
    icon: Siren,
    bg: 'bg-pink-50', 
    iconColor: 'text-pink-600', 
  },
  {
    label: 'Women’s Safety Helpline',
    number: '100 / +91-44420-12345',
    icon: Siren,
    bg: 'bg-pink-50', 
    iconColor: 'text-pink-600', 
  },
  {
    label: 'Udhavum Ullangul NGO',
    number: 'Contact Number or Website Link (if available)',
    icon: Heart, // You can use an icon like a heart or hands to symbolize care/support
    bg: 'bg-green-50', // Light green background to represent hope and growth
    iconColor: 'text-green-600', // Matching green icon for a calm and supportive feel
  }
  
  
];

const HelplineSection = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        📞 Helpline Contacts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-xl shadow-md ${contact.bg} hover:shadow-lg transition`}
          >
            <div className={`p-2 rounded-full ${contact.iconColor} bg-white shadow`}>
              <contact.icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-700">{contact.label}</span>
              <span className="text-sm text-gray-600">{contact.number}</span>
            </div>
            <div className="ml-auto">
              <a
                href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Call
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default HelplineSection;
