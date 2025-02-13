//src/app/admin/page.tsx

import prisma from '@/lib/prisma';
import { 
  Users, 
  FileText, 
  Mail,
  LucideIcon } from 'lucide-react';

async function getDashboardStats() {
  const [
    subscriberCount,
    postCount,
    newsletterCount,
    recentPosts,
    recentNewsletters
  ] = await Promise.all([
    prisma.subscriber.count(),
    prisma.post.count(),
    prisma.newsletter.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { title: true, createdAt: true }
    }),
    prisma.newsletter.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { title: true, createdAt: true }
    })
  ]);

  return {
    subscriberCount,
    postCount,
    newsletterCount,
    recentPosts,
    recentNewsletters
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Subscribers"
          value={stats.subscriberCount}
          icon={Users}
        />
        <StatsCard
          title="Blog Posts"
          value={stats.postCount}
          icon={FileText}
        />
        <StatsCard
          title="Newsletters Sent"
          value={stats.newsletterCount}
          icon={Mail}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity
          title="Recent Posts"
          items={stats.recentPosts}
          icon={FileText}
        />
        <RecentActivity
          title="Recent Newsletters"
          items={stats.recentNewsletters}
          icon={Mail}
        />
      </div>
    </div>
  );
}

function StatsCard({ 
  title, 
  value, 
  icon: Icon 
}: { 
  title: string; 
  value: number;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-50">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface ActivityItem {
  title: string;
  createdAt: Date;
}

function RecentActivity({ 
  title, 
  items, 
  icon: Icon 
}: { 
  title: string; 
  items: ActivityItem[]; 
  icon: LucideIcon; 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center text-sm">
            <Icon className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-600">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}