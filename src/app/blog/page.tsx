//src/app/blog/page.tsx

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
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-theme-text-primary sm:text-4xl">
            Latest Articles
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-theme-text-secondary sm:mt-4">
            Explore our collection of articles, insights, and updates
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 bg-theme-surface rounded-lg p-8 text-center">
            <h2 className="text-xl font-heading font-semibold text-theme-text-primary mb-2">
              No posts published yet
            </h2>
            <p className="text-theme-text-secondary">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-theme-surface hover:shadow-xl transition-shadow duration-300"
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
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-mono bg-theme-main/10 text-theme-main"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="block mt-2">
                      <p className="text-xl font-heading font-semibold text-theme-text-primary hover:text-theme-main">
                        {post.title}
                      </p>
                      <p className="mt-3 text-theme-text-secondary">
                        {post.content.substring(0, 150)}...
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-theme-text-secondary">
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
        )}
      </div>
    </div>
  );
}