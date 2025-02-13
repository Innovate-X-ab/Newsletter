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