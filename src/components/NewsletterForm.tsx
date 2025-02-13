'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Calendar } from 'lucide-react';
import type { NewsletterFormData } from '@/types/newsletter';

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  { ssr: false }
);

interface NewsletterFormProps {
  action: string;
}

export default function NewsletterForm({ action }: NewsletterFormProps) {
  const router = useRouter();
  const isEdit = action !== 'new';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NewsletterFormData>({
    title: '',
    content: '',
    scheduledFor: '',
    template: 'DEFAULT'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/newsletters${isEdit ? `/${action}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save newsletter');
      }

      router.push('/admin/newsletters');
    } catch (error) {
      console.error('Error saving newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Newsletter Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded-md"
          placeholder="Enter newsletter title"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="template" className="block text-sm font-medium">
          Template
        </label>
        <select
          id="template"
          name="template"
          value={formData.template}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="DEFAULT">Default Template</option>
          <option value="MINIMAL">Minimal Template</option>
          <option value="FEATURED">Featured Template</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="scheduledFor" className="block text-sm font-medium">
          Schedule For
        </label>
        <div className="relative">
          <input
            type="datetime-local"
            id="scheduledFor"
            name="scheduledFor"
            value={formData.scheduledFor}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
          <Calendar className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
              'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help',
              'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
          }}
          value={formData.content}
          onEditorChange={handleEditorChange}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Newsletter' : 'Create Newsletter'}
        </button>
      </div>
    </form>
  );
}