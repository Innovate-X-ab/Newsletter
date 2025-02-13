import type { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter Management',
  description: 'Create and edit newsletters',
}

export default function NewsletterPage({
  params,
}: {
  params: { action: string }
}) {
  return (
    <div className="container mx-auto py-6">
      <NewsletterForm action={params.action} />
    </div>
  )
}