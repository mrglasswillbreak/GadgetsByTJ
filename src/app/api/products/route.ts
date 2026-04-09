import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { products, categories } from '@/lib/db/schema';
import { ProductSchema } from '@/lib/validations';
import { eq, asc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get('category');

    if (category) {
      // Filter by category slug via join — pushes filtering to the DB
      const rows = await db
        .select({ product: products, category: categories })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(eq(categories.slug, category))
        .orderBy(asc(products.displayOrder), asc(products.name));
      return NextResponse.json(rows.map((r) => ({ ...r.product, category: r.category })));
    }

    const rows = await db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(asc(products.displayOrder), asc(products.name));
    return NextResponse.json(rows.map((r) => ({ ...r.product, category: r.category })));
  } catch {
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
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }

    const [created] = await db.insert(products).values(parsed.data as typeof products.$inferInsert).returning();
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
