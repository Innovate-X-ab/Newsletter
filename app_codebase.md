# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# eslint.config.mjs

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "newsletter-blog",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.7.4",
    "@hookform/resolvers": "^3.10.0",
    "@prisma/client": "^6.3.1",
    "@radix-ui/react-dialog": "^1.1.5",
    "@radix-ui/react-dropdown-menu": "^2.1.5",
    "@radix-ui/react-slot": "^1.1.1",
    "@tinymce/tinymce-react": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.474.0",
    "next": "15.1.6",
    "next-auth": "^5.0.0-beta.25",
    "nodemailer": "^6.10.0",
    "prisma": "^6.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "resend": "^4.1.2",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# prisma\schema.prisma

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String      @id @default(cuid())
  email         String      @unique
  name          String?
  password      String
  role          Role        @default(USER)
  posts         Post[]
  newsletters   Newsletter[]
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Subscriber {
  id            String      @id @default(cuid())
  email         String      @unique
  name          String?
  verified      Boolean     @default(false)
  token         String?     
  interests     Interest[]
  subscribed    Boolean     @default(true)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Newsletter {
  id            String      @id @default(cuid())
  title         String
  content       String      @db.Text
  status        Status      @default(DRAFT)
  scheduledFor  DateTime?
  sentAt        DateTime?
  author        User        @relation(fields: [authorId], references: [id])
  authorId      String
  analytics     Analytics?
  template      Template    @default(DEFAULT)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Post {
  id            String      @id @default(cuid())
  title         String
  slug          String      @unique
  content       String      @db.Text
  published     Boolean     @default(false)
  author        User        @relation(fields: [authorId], references: [id])
  authorId      String
  categories    Category[]
  tags          Tag[]
  featuredImage String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Analytics {
  id            String      @id @default(cuid())
  newsletter    Newsletter  @relation(fields: [newsletterId], references: [id])
  newsletterId  String      @unique
  opens         Int         @default(0)
  clicks        Int         @default(0)
  bounces       Int         @default(0)
  unsubscribes  Int         @default(0)
}

model Category {
  id            String      @id @default(cuid())
  name          String      @unique
  posts         Post[]
}

model Tag {
  id            String      @id @default(cuid())
  name          String      @unique
  posts         Post[]
}

model Interest {
  id            String      @id @default(cuid())
  name          String      @unique
  subscribers   Subscriber[]
}

enum Role {
  USER
  ADMIN
  EDITOR
}

enum Status {
  DRAFT
  SCHEDULED
  SENT
  FAILED
}

enum Template {
  DEFAULT
  MINIMAL
  FEATURED
}
```

# public\file.svg

This is a file of the type: SVG Image

# public\globe.svg

This is a file of the type: SVG Image

# public\next.svg

This is a file of the type: SVG Image

# public\vercel.svg

This is a file of the type: SVG Image

# public\window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src\app\(auth)\signin\page.tsx

```tsx
// src/app/(auth)/signin/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await signIn('credentials', {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        redirect: false,
      });

      if (response?.error) {
        setError(response.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
        console.error(error);
      setError('An error occurred during sign in');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

# src\app\(auth)\signup\page.tsx

```tsx
// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to sign up');
      }

      router.push('/signin');
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'Failed to sign up');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create admin account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

# src\app\admin\categories\page.tsx

```tsx
//src/app/admin/categories/page.tsx

'use client';

import { useState } from 'react';

export default function CategoriesPage() {
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      setNewCategory('');
      window.location.reload(); // Temporary solution - better to use React Query or SWR
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>

        {/* Categories list will be added here */}
      </div>
    </div>
  );
}
```

# src\app\admin\layout.tsx

```tsx
//src/app/admin/layout.tsx

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import AdminSidebar from '@/components/admin/sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
```

# src\app\admin\newsletters\[action]\page.tsx

```tsx
//src/app/admin/newsletters/[action]/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Calendar } from 'lucide-react';

// Import TinyMCE with SSR disabled
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export default function NewsletterForm({ params }: { params: { action: string } }) {
  const router = useRouter();
  const isEdit = params.action !== 'new';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    scheduledFor: '',
    template: 'DEFAULT',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/newsletters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save newsletter');
      }

      router.push('/admin/newsletters');
      router.refresh();
    } catch (error) {
      console.error('Error saving newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Newsletter' : 'Create Newsletter'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Editor
                apiKey="your-tinymce-api-key"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
                value={formData.content}
                onEditorChange={(content) => setFormData({ ...formData, content })}
              />
            </div>

            <div>
              <label htmlFor="scheduledFor" className="block text-sm font-medium text-gray-700">
                Schedule Send (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  id="scheduledFor"
                  value={formData.scheduledFor}
                  onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                  className="block w-full pl-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                Template
              </label>
              <select
                id="template"
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="DEFAULT">Default Template</option>
                <option value="MINIMAL">Minimal Template</option>
                <option value="FEATURED">Featured Template</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Newsletter'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
```

# src\app\admin\newsletters\page.tsx

```tsx
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
```

# src\app\admin\page.tsx

```tsx
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
```

# src\app\admin\posts\[action]\page.tsx

```tsx
//src/app/admin/posts/[action]/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import TinyMCE with SSR disabled
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export default function PostForm({ params }: { params: { action: string } }) {
  const router = useRouter();
  const isEdit = params.action !== 'new';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle error (show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Editor
                apiKey="your-tinymce-api-key"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
                value={formData.content}
                onEditorChange={(content) => setFormData({ ...formData, content })}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                Publish immediately
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
```

# src\app\admin\posts\page.tsx

```tsx
//src/app/admin/posts/page.tsx

import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { Plus, Edit } from 'lucide-react';
import DeleteDialog from '@/components/admin/delete-dialog';

async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

export default async function AdminPosts() {
  const posts = await getPosts();

  async function handleDelete(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>

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
                Categories
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {post.categories.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.author.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteDialog
                        title={post.title}
                        onConfirm={() => handleDelete(post.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

# src\app\api\admin\categories\route.ts

```ts
//src/app/api/admin/categories/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name }
    });

    return NextResponse.json(category);
  } catch (error: unknown) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
```

# src\app\api\admin\newsletters\route.ts

```ts
//src/app/api/admin/newsletters/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newsletters = await prisma.newsletter.findMany({
      include: {
        analytics: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(newsletters);
  } catch (error) {
    console.error('Failed to fetch newsletters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletters' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, scheduledFor, template } = await req.json();

    const newsletter = await prisma.newsletter.create({
      data: {
        title,
        content,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        template,
        status: scheduledFor ? 'SCHEDULED' : 'DRAFT',
        author: {
          connect: { id: session.user.id },
        },
      },
    });

    return NextResponse.json(newsletter, { status: 201 });
  } catch (error) {
    console.error('Failed to create newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to create newsletter' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Newsletter ID is required' },
        { status: 400 }
      );
    }

    await prisma.newsletter.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Newsletter deleted successfully' });
  } catch (error) {
    console.error('Failed to delete newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to delete newsletter' },
      { status: 500 }
    );
  }
}
```

# src\app\api\admin\newsletters\send\route.ts

```ts
// src/app/api/admin/newsletters/send/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sendNewsletter } from '@/lib/email';

interface NewsletterError extends Error {
  newsletterId?: string;
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newsletterId } = await req.json();

    // Get newsletter and active subscribers
    const [newsletter, subscribers] = await Promise.all([
      prisma.newsletter.findUnique({
        where: { id: newsletterId },
      }),
      prisma.subscriber.findMany({
        where: {
          verified: true,
          subscribed: true,
        },
        select: {
          email: true,
          name: true,
        },
      }),
    ]);

    if (!newsletter) {
      return NextResponse.json(
        { error: 'Newsletter not found' },
        { status: 404 }
      );
    }

    // Create analytics record
    await prisma.analytics.create({
      data: {
        newsletter: { connect: { id: newsletterId } },
        opens: 0,
        clicks: 0,
        bounces: 0,
        unsubscribes: 0,
      },
    });

    // Send newsletter
    await sendNewsletter(newsletter, subscribers);

    // Update newsletter status
    await prisma.newsletter.update({
      where: { id: newsletterId },
      data: {
        status: 'SENT',
        sentAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Newsletter sent successfully',
      recipientCount: subscribers.length,
    });
  } catch (error) {
    console.error('Failed to send newsletter:', error);
    
    // Update newsletter status to FAILED
    if (error instanceof Error) {
      const newsletterError = error as NewsletterError;
      if (newsletterError.newsletterId) {
        await prisma.newsletter.update({
          where: { id: newsletterError.newsletterId },
          data: {
            status: 'FAILED',
          },
        });
      }
    }

    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}
```

# src\app\api\admin\posts\route.ts

```ts
//src/app/api/admin/posts/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, published, categoryIds, slug } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        slug,
        author: {
          connect: { id: session.user.id },
        },
        categories: {
          connect: categoryIds.map((id: string) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
    try {
      const session = await auth();
  
      if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const { searchParams } = new URL(req.url);
      const postId = searchParams.get('id');
  
      if (!postId) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
      }
  
      await prisma.post.delete({
        where: { id: postId },
      });
  
      return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Failed to delete post:', error);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }
  }
```

# src\app\api\auth\[...nextauth]\route.ts

```ts
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers
```

# src\app\api\auth\signup\route.ts

```ts
// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Check if this is the first user (make them admin)
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? 'ADMIN' : 'USER';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
```

# src\app\api\subscribe\route.ts

```ts
//src/app/api/subscribe/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        await prisma.subscriber.update({
          where: { email },
          data: { subscribed: true },
        });
        return NextResponse.json(
          { message: 'Subscription reactivated successfully' },
          { status: 200 }
        );
      }
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: {
        email,
        name: name || null,
        verified: false, // Will be set to true after email verification
        subscribed: true,
      },
    });

    // TODO: Send verification email
    // We'll implement this later when we set up email functionality

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your subscription' },
      { status: 500 }
    );
  }
}
```

# src\app\blog\[slug]\page.tsx

```tsx
//src/app/blog/[slug]/page.tsx

import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: true,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={1024}
            height={256}
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
          />
        )}

        <div className="flex items-center gap-2 mb-4">
          {post.categories.map((category) => (
            <span
              key={category.id}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {category.name}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center text-gray-600 mb-8">
          <span>{post.author.name}</span>
          <span className="mx-2">&middot;</span>
          <time dateTime={post.createdAt.toISOString()}>
            {format(post.createdAt, 'MMMM d, yyyy')}
          </time>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
    </article>
  );
}
```

# src\app\blog\page.tsx

```tsx
//src/app/blog/page.tsx

import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

async function getPublishedPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Latest Articles
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our collection of articles, insights, and updates
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
            >
              {post.featuredImage && (
                  <Image
                    className="h-48 w-full object-cover"
                    src={post.featuredImage}
                    alt={post.title}
                    width={800}
                    height={400}
                  />
              )}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.content.substring(0, 150)}...
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span>{post.author.name}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={post.createdAt.toISOString()}>
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">No posts published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

# src\app\favicon.ico

This is a binary file of the type: Binary

# src\app\globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0F172A;
  --background-secondary: #1E293B;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --primary: #3B82F6;
  --secondary: #10B981;
}

body {
  color: var(--text-primary);
  background: var(--background);
  font-family: var(--font-geist-sans);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background);
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Animation classes */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s linear infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

# src\app\layout.tsx

```tsx
//src/app/layout.tsx

import { AuthProvider } from '@/components/providers/auth-provider';
import Navbar from '@/components/layouts/navbar';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Atul's Blog",
  description: "Exploring technology, development, and innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}>
        <div className="min-h-screen bg-dark bg-cyber-grid bg-[size:50px_50px]">
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
```

# src\app\newsletter\page.tsx

```tsx
//src/app/newsletter/page.tsx

'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! Please check your email to confirm your subscription.');
        setEmail('');
        setName('');
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get weekly updates, articles, and insights delivered to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name (optional)"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email address"
              />
            </div>
          </div>

          {status === 'success' && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

# src\app\page.tsx

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-theme-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-subtle-grid bg-[size:30px_30px] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-theme-text-primary">
                <span className="block">Stay Updated with</span>
                <span className="bg-gradient-to-r from-theme-main to-theme-accent bg-clip-text text-transparent">
                  Atul&apos;s Newsletter
                </span>
              </h1>
              
              <p className="mt-6 text-xl text-theme-text-secondary max-w-2xl mx-auto">
                Exploring technology, development, and innovation. 
                Join my journey through code and creativity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href="/newsletter"
                className="px-8 py-3 bg-theme-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>

              <Link
                href="/blog"
                className="px-8 py-3 bg-theme-surface border border-theme-border text-theme-text-primary rounded-lg hover:border-theme-main transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Read Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="relative bg-theme-darker py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-theme-main to-theme-accent bg-clip-text text-transparent">
              Latest Posts
            </h2>
            <p className="mt-4 text-theme-text-secondary">
              Explore my latest thoughts and insights
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="group bg-theme-surface rounded-lg overflow-hidden border border-theme-border hover:border-theme-main transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="h-48 mb-4 bg-theme-dark rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-theme-main/5 to-theme-accent/5"></div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-theme-main/10 text-theme-main rounded-full text-sm mb-4">
                    Technology
                  </span>
                  <h3 className="text-xl font-semibold text-theme-text-primary mb-2 group-hover:text-theme-main transition-colors">
                    Sample Blog Post {i}
                  </h3>
                  <p className="text-theme-text-secondary">
                    Exploring the latest developments in web technology and software engineering.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-theme-surface border border-theme-border rounded-lg text-theme-text-primary hover:border-theme-main transition-all duration-300"
            >
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

# src\components\admin\delete-dialog.tsx

```tsx
//src/components/admin/delete-dialog.tsx

'use client';

import { useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

interface DeleteDialogProps {
  title: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteDialog({ title, onConfirm }: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-medium">Confirm Deletion</h3>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete &quot;{title}&quot;? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

# src\components\admin\sidebar.tsx

```tsx
//src/components/admin/sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Mail, 
  Users, 
  BarChart,
  LogOut 
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Blog Posts', icon: FileText },
  { href: '/admin/newsletters', label: 'Newsletters', icon: Mail },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-bold text-gray-800">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
```

# src\components\layouts\navbar.tsx

```tsx
//src/components/layouts/navbar.tsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full bg-dark/80 backdrop-blur-md border-b border-neon-blue/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-heading text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink transition-all duration-300">
                Atul&apos;s Blog
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/blog" 
              className={`relative group font-mono text-sm transition-colors ${
                pathname === '/blog' ? 'text-neon-blue' : 'text-gray-400 hover:text-neon-blue'
              }`}
            >
              <span>Blog</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/newsletter" 
              className={`px-4 py-2 font-mono text-sm rounded border transition-all duration-300 ${
                pathname === '/newsletter' 
                  ? 'bg-neon-blue/10 text-neon-blue border-neon-blue'
                  : 'border-neon-purple/50 text-neon-purple hover:border-neon-purple hover:text-neon-purple hover:bg-neon-purple/10'
              }`}
            >
              Newsletter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

# src\components\providers\auth-provider.tsx

```tsx
// src/components/providers/auth-provider.tsx
'use client';

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

# src\lib\auth.ts

```ts
// src/lib/auth.ts
import type { NextAuthConfig } from 'next-auth';
import type { JWT } from '@auth/core/jwt';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

// Define a more specific User type
interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

declare module '@auth/core/types' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
    }
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          });

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user && typeof user.id === 'string' && typeof user.role === 'string') {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === 'string' && typeof token.role === 'string') {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
          }
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
```

# src\lib\email.ts

```ts
// src/lib/email.ts

import { Resend } from 'resend';
import type { Newsletter } from '@prisma/client';

type NewsletterWithoutRelations = Omit<Newsletter, 'author' | 'analytics'>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(
    newsletter: NewsletterWithoutRelations,
  subscribers: { email: string; name?: string | null }[]
) {
  try {
    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    const batches = [];
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }

    for (const batch of batches) {
        const emailPromises = batch.map((subscriber) => {
          return resend.emails.send({
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
            to: subscriber.email,
            subject: newsletter.title,
            html: newsletter.content,
          });
        });

      await Promise.all(emailPromises);
    }

    return true;
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
}

```

# src\lib\prisma.ts

```ts
//src/lib/prisma.ts

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

# src\types\next-auth.d.ts

```ts
// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark theme colors
        theme: {
          dark: "#0A0F1E",        // Deep blue-black
          darker: "#050914",      // Darker shade
          main: "#3B4EF8",        // Vibrant blue
          accent: "#9333EA",      // Rich purple
          muted: "#4B5563",       // Muted text
          surface: "#111827",     // Card background
          border: "#1F2937",      // Border color
          text: {
            primary: "#F9FAFB",   // Primary text
            secondary: "#9CA3AF", // Secondary text
          }
        }
      },
      fontFamily: {
        'heading': ['var(--font-orbitron)', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
        'sans': ['var(--font-geist-sans)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-grid': 'linear-gradient(to right, #1F2937 1px, transparent 1px), linear-gradient(to bottom, #1F2937 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
};

export default config;
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

