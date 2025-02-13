//src/app/admin/newsletters/page.tsx

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Plus, Edit, Mail, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import DeleteDialog from '@/components/admin/delete-dialog';

// Newsletter status badge component
type NewsletterStatus = 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED';

interface Newsletter {
  id: string;
  title: string;
  status: NewsletterStatus;
  scheduledFor?: string;
  analytics?: {
    opens: number;
    clicks: number;
  };
}

function StatusBadge({ status }: { status: NewsletterStatus }) {
  const statusColors = {
    DRAFT: 'bg-gray-100 text-gray-800',
    SCHEDULED: 'bg-yellow-100 text-yellow-800',
    SENT: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

const handleSend = async (newsletterId: string) => {
    if (!confirm('Are you sure you want to send this newsletter now?')) {
      return;
    }
  
    try {
      const response = await fetch('/api/admin/newsletters/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newsletterId }),
      });
  
  if (!response.ok) {
    throw new Error('Failed to send newsletter');
  }
  const data = await response.json();
      alert(`Newsletter sent successfully to ${data.recipientCount} subscribers!`);
      window.location.reload();
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('Failed to send newsletter. Please try again.');
    }
  };

export default function NewslettersPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  // Add loading and error states
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/newsletters');
        if (!response.ok) throw new Error('Failed to fetch newsletters');
        const data = await response.json();
        setNewsletters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/admin/newsletters/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete newsletter');
      }

      setNewsletters(newsletters.filter(newsletter => newsletter.id !== id));
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Failed to delete newsletter. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Newsletters</h1>
        <Link
          href="/admin/newsletters/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Newsletter
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading newsletters...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-600">{error}</div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Analytics
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newsletters.map((newsletter) => (
              <tr key={newsletter.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {newsletter.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={newsletter.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {newsletter.scheduledFor
                      ? formatDistanceToNow(new Date(newsletter.scheduledFor), { addSuffix: true })
                      : 'Not scheduled'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {newsletter.analytics && (
                    <div className="text-sm text-gray-500">
                      Opens: {newsletter.analytics.opens} | 
                      Clicks: {newsletter.analytics.clicks}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/newsletters/${newsletter.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    {newsletter.status === 'DRAFT' && (
                      <button
                        onClick={() => handleSend(newsletter.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                    )}
                    <DeleteDialog
                      title={newsletter.title}
                      onConfirm={() => handleDelete(newsletter.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}