import CategoryFilter from '@/components/public/CategoryFilter';

const products = [
  { id: 1, name: 'iPhone 15 Pro Case', price: '$19.99', category: 'Cases', slug: 'iphone-15-pro-case', emoji: '📱' },
  { id: 2, name: 'Samsung S24 Case', price: '$14.99', category: 'Cases', slug: 'samsung-s24-case', emoji: '📱' },
  { id: 3, name: 'Tempered Glass Screen Protector', price: '$9.99', category: 'Screen Protectors', slug: 'tempered-glass-screen-protector', emoji: '🛡️' },
  { id: 4, name: 'Privacy Screen Protector', price: '$12.99', category: 'Screen Protectors', slug: 'privacy-screen-protector', emoji: '🛡️' },
  { id: 5, name: 'USB-C Fast Charger 65W', price: '$29.99', category: 'Chargers', slug: 'usbc-fast-charger-65w', emoji: '⚡' },
  { id: 6, name: 'MagSafe Wireless Charger', price: '$39.99', category: 'Chargers', slug: 'magsafe-wireless-charger', emoji: '⚡' },
  { id: 7, name: 'iPhone 15 Pro', price: '$999.99', category: 'Phones', slug: 'iphone-15-pro', emoji: '📲' },
  { id: 8, name: 'Samsung Galaxy S24', price: '$799.99', category: 'Phones', slug: 'samsung-galaxy-s24', emoji: '📲' },
  { id: 9, name: 'iPad Air 5th Gen', price: '$599.99', category: 'Tablets', slug: 'ipad-air-5th-gen', emoji: '💻' },
  { id: 10, name: 'AirPods Pro 2nd Gen', price: '$249.99', category: 'Audio', slug: 'airpods-pro-2nd-gen', emoji: '🎧' },
  { id: 11, name: 'Samsung Galaxy Buds2', price: '$149.99', category: 'Audio', slug: 'samsung-galaxy-buds2', emoji: '🎧' },
  { id: 12, name: 'Samsung Galaxy Tab S9', price: '$699.99', category: 'Tablets', slug: 'samsung-galaxy-tab-s9', emoji: '💻' },
];

const categories = Array.from(new Set(products.map((p) => p.category)));

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Products</h1>
        <p className="text-gray-600 max-w-2xl">
          Browse our full range of premium mobile electronics and accessories — from flagship phones to everyday essentials.
        </p>
      </div>
      <CategoryFilter products={products} categories={categories} />
    </div>
  );
}
