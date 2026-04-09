import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { siteSettings } from '@/lib/db/schema';
import { SettingsBatchSchema } from '@/lib/validations';

export async function GET() {
  try {
    const rows = await db.query.siteSettings.findMany();
    const result = rows.reduce<Record<string, string>>((acc, row) => {
      if (row.value !== null) acc[row.key] = row.value;
      return acc;
    }, {});
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = SettingsBatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }

    const { settings } = parsed.data;
    for (const [key, value] of Object.entries(settings) as [string, string][]) {
      await db
        .insert(siteSettings)
        .values({ key, value, updatedAt: new Date() })
        .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Save failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
