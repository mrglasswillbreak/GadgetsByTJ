import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import bcrypt from 'bcryptjs';
import * as schema from './schema';

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log('🌱 Seeding database...');

  // Admin
  const passwordHash = await bcrypt.hash('Admin1234!', 12);
  await db.insert(schema.admins).values({
    email: 'admin@gadgetsbytj.com',
    passwordHash,
  }).onConflictDoNothing();
  console.log('✅ Admin seeded');

  // Categories
  const categoryData = [
    { name: 'Phones', slug: 'phones', description: 'Latest smartphones and mobile devices', displayOrder: 1 },
    { name: 'Tablets', slug: 'tablets', description: 'Tablets and e-readers', displayOrder: 2 },
    { name: 'Cases & Covers', slug: 'cases-covers', description: 'Protective cases and covers for your devices', displayOrder: 3 },
    { name: 'Chargers & Cables', slug: 'chargers-cables', description: 'Charging solutions and cables', displayOrder: 4 },
    { name: 'Screen Protectors', slug: 'screen-protectors', description: 'Tempered glass and film screen protectors', displayOrder: 5 },
    { name: 'Audio', slug: 'audio', description: 'Headphones, earbuds, and speakers', displayOrder: 6 },
  ];

  const insertedCategories = await db.insert(schema.categories).values(categoryData).onConflictDoNothing().returning();
  console.log('✅ Categories seeded');

  // Use inserted or fetch existing
  const allCategories = insertedCategories.length > 0 ? insertedCategories : await db.query.categories.findMany();
  const catMap: Record<string, number> = {};
  for (const c of allCategories) catMap[c.slug] = c.id;

  // Products
  const productData = [
    {
      name: 'iPhone 15 Pro Max Case - Clear Shield',
      slug: 'iphone-15-pro-max-case-clear-shield',
      description: 'Military-grade drop protection with crystal-clear design. Compatible with MagSafe.',
      price: '29.99',
      categoryId: catMap['cases-covers'],
      inStock: true,
      featured: true,
      displayOrder: 1,
      specs: { material: 'Polycarbonate + TPU', compatibility: 'iPhone 15 Pro Max', magsafe: 'Yes', protection: 'Military Grade MIL-STD-810G' } as Record<string, string>,
    },
    {
      name: 'Samsung Galaxy S24 Ultra Leather Case',
      slug: 'samsung-galaxy-s24-ultra-leather-case',
      description: 'Premium genuine leather case with card slots and stand feature.',
      price: '39.99',
      categoryId: catMap['cases-covers'],
      inStock: true,
      featured: true,
      displayOrder: 2,
      specs: { material: 'Genuine Leather', compatibility: 'Samsung Galaxy S24 Ultra', slots: '3 Card Slots', feature: 'Kickstand' } as Record<string, string>,
    },
    {
      name: '65W GaN Fast Charger',
      slug: '65w-gan-fast-charger',
      description: 'Ultra-compact 65W GaN charger with dual USB-C ports. Charges laptop, phone, and tablet simultaneously.',
      price: '49.99',
      categoryId: catMap['chargers-cables'],
      inStock: true,
      featured: true,
      displayOrder: 1,
      specs: { wattage: '65W', ports: '2x USB-C, 1x USB-A', technology: 'GaN III', compatibility: 'Universal' } as Record<string, string>,
    },
    {
      name: 'iPhone 15 Tempered Glass Screen Protector',
      slug: 'iphone-15-tempered-glass-screen-protector',
      description: '9H hardness tempered glass with oleophobic coating. Pack of 2.',
      price: '14.99',
      categoryId: catMap['screen-protectors'],
      inStock: true,
      featured: false,
      displayOrder: 1,
      specs: { hardness: '9H', compatibility: 'iPhone 15 / 15 Plus', pack: '2 Pack', coating: 'Oleophobic' } as Record<string, string>,
    },
    {
      name: 'Wireless Earbuds Pro',
      slug: 'wireless-earbuds-pro',
      description: 'Active noise cancellation, 30-hour battery life, IPX5 water resistance.',
      price: '79.99',
      categoryId: catMap['audio'],
      inStock: true,
      featured: true,
      displayOrder: 1,
      specs: { battery: '30 Hours (ANC Off)', anc: 'Active Noise Cancellation', waterproof: 'IPX5', connectivity: 'Bluetooth 5.3' } as Record<string, string>,
    },
    {
      name: '6-in-1 USB-C Cable Bundle',
      slug: '6-in-1-usb-c-cable-bundle',
      description: 'Braided nylon cables: 2x USB-C to USB-C, 2x USB-C to Lightning, 2x USB-C to Micro-USB.',
      price: '24.99',
      categoryId: catMap['chargers-cables'],
      inStock: true,
      featured: false,
      displayOrder: 2,
      specs: { quantity: '6 Cables', material: 'Braided Nylon', length: '1m each', compatibility: 'Universal' } as Record<string, string>,
    },
  ];

  await db.insert(schema.products).values(productData).onConflictDoNothing();
  console.log('✅ Products seeded');

  // Devices
  const deviceData = [
    {
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      brand: 'Apple',
      deviceType: 'phone',
      description: "Apple's most powerful iPhone with A17 Pro chip and titanium design.",
      featured: true,
      displayOrder: 1,
      specs: { display: '6.1" Super Retina XDR OLED', chip: 'A17 Pro', storage: '128GB - 1TB', camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto', battery: 'Up to 23 hours', os: 'iOS 17' } as Record<string, string>,
    },
    {
      name: 'Samsung Galaxy S24',
      slug: 'samsung-galaxy-s24',
      brand: 'Samsung',
      deviceType: 'phone',
      description: "Samsung's flagship with Galaxy AI features and Snapdragon 8 Gen 3.",
      featured: true,
      displayOrder: 2,
      specs: { display: '6.2" Dynamic AMOLED 2X 120Hz', chip: 'Snapdragon 8 Gen 3', storage: '128GB - 512GB', camera: '50MP Main + 12MP Ultra Wide + 10MP Telephoto', battery: '4000mAh', os: 'Android 14 (One UI 6.1)' } as Record<string, string>,
    },
    {
      name: 'iPad Pro 12.9"',
      slug: 'ipad-pro-12-9',
      brand: 'Apple',
      deviceType: 'tablet',
      description: 'The ultimate iPad experience with M2 chip and Liquid Retina XDR display.',
      featured: true,
      displayOrder: 3,
      specs: { display: '12.9" Liquid Retina XDR', chip: 'Apple M2', storage: '128GB - 2TB', pencil: 'Apple Pencil 2nd gen compatible', battery: 'Up to 10 hours', os: 'iPadOS 17' } as Record<string, string>,
    },
    {
      name: 'Samsung Galaxy Tab S9',
      slug: 'samsung-galaxy-tab-s9',
      brand: 'Samsung',
      deviceType: 'tablet',
      description: 'Premium Android tablet with Dynamic AMOLED display and S Pen included.',
      featured: false,
      displayOrder: 4,
      specs: { display: '11" Dynamic AMOLED 2X 120Hz', chip: 'Snapdragon 8 Gen 2', storage: '128GB - 256GB', spen: 'Included', battery: '8400mAh', os: 'Android 13 (One UI 5.1)' } as Record<string, string>,
    },
  ];

  await db.insert(schema.devices).values(deviceData).onConflictDoNothing();
  console.log('✅ Devices seeded');

  // Site Settings
  const settingsData = [
    { key: 'site_name', value: 'GadgetsByTJ' },
    { key: 'hero_title', value: 'Your One-Stop Mobile Electronics Shop' },
    { key: 'hero_subtitle', value: 'Premium phones, tablets, cases, chargers, and accessories at unbeatable prices.' },
    { key: 'hero_cta_text', value: 'Shop Now' },
    { key: 'contact_email', value: 'hello@gadgetsbytj.com' },
    { key: 'contact_phone', value: '+1 (555) 123-4567' },
    { key: 'contact_address', value: '123 Tech Street, Mobile City, CA 90210' },
    { key: 'facebook_url', value: 'https://facebook.com/gadgetsbytj' },
    { key: 'instagram_url', value: 'https://instagram.com/gadgetsbytj' },
    { key: 'twitter_url', value: 'https://twitter.com/gadgetsbytj' },
    { key: 'about_text', value: 'GadgetsByTJ is your trusted source for mobile electronics and accessories. We carry the latest smartphones, tablets, and everything you need to keep them protected and powered up. Our mission is to deliver quality products at fair prices with exceptional customer service.' },
  ];

  await db.insert(schema.siteSettings).values(settingsData).onConflictDoNothing();
  console.log('✅ Site settings seeded');

  console.log('🎉 Database seeding complete!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
