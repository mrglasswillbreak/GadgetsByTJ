import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { CategorySchema } from '@/lib/validations';

export async function GET() {
  try {
    const all = await db.query.categories.findMany({
      orderBy: (c, { asc }) => [asc(c.displayOrder), asc(c.name)],
    });
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = CategorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Validation error' }, { status: 400 });
    }
    const [created] = await db.insert(categories).values(parsed.data).returning();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Create failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
