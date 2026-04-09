import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { ProductSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get('category');

    const allProducts = await db.query.products.findMany({
      orderBy: (p, { asc }) => [asc(p.displayOrder), asc(p.name)],
      with: { category: true } as never,
    });

    const filtered = category
      ? allProducts.filter((p: Record<string, unknown> & { category?: { slug?: string } | null }) => p.category?.slug === category)
      : allProducts;

    return NextResponse.json(filtered);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = ProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Validation error' }, { status: 400 });
    }

    const [created] = await db.insert(products).values(parsed.data as typeof products.$inferInsert).returning();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Create failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
