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
