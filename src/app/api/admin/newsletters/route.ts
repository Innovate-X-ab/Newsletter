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