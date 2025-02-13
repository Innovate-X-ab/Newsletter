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