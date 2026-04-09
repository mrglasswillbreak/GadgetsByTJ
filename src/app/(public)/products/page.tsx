import CategoryFilter from '@/components/public/CategoryFilter';

const products = [
  { id: 1, name: 'iPhone 15 Pro Case', price: '$19.99', category: 'Cases', slug: 'iphone-15-pro-case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
  { id: 2, name: 'Samsung S24 Case', price: '$14.99', category: 'Cases', slug: 'samsung-s24-case', image: 'https://images.unsplash.com/photo-1583394293214-0d3c5f8e6b3a?w=400&q=80' },
  { id: 3, name: 'Tempered Glass Screen Protector', price: '$9.99', category: 'Screen Protectors', slug: 'tempered-glass-screen-protector', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
  { id: 4, name: 'Privacy Screen Protector', price: '$12.99', category: 'Screen Protectors', slug: 'privacy-screen-protector', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
  { id: 5, name: 'USB-C Fast Charger 65W', price: '$29.99', category: 'Chargers', slug: 'usbc-fast-charger-65w', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80' },
  { id: 6, name: 'MagSafe Wireless Charger', price: '$39.99', category: 'Chargers', slug: 'magsafe-wireless-charger', image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400&q=80' },
  { id: 7, name: 'iPhone 15 Pro', price: '$999.99', category: 'Phones', slug: 'iphone-15-pro', image: 'https://images.unsplash.com/photo-1697537980414-5c1f2d0cbf01?w=400&q=80' },
  { id: 8, name: 'Samsung Galaxy S24', price: '$799.99', category: 'Phones', slug: 'samsung-galaxy-s24', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80' },
  { id: 9, name: 'iPad Air 5th Gen', price: '$599.99', category: 'Tablets', slug: 'ipad-air-5th-gen', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80' },
  { id: 10, name: 'AirPods Pro 2nd Gen', price: '$249.99', category: 'Audio', slug: 'airpods-pro-2nd-gen', image: 'https://images.unsplash.com/photo-1588423771073-b8903fead714?w=400&q=80' },
  { id: 11, name: 'Samsung Galaxy Buds2', price: '$149.99', category: 'Audio', slug: 'samsung-galaxy-buds2', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
  { id: 12, name: 'Samsung Galaxy Tab S9', price: '$699.99', category: 'Tablets', slug: 'samsung-galaxy-tab-s9', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
];

const categories = Array.from(new Set(products.map((p) => p.category)));

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">Our Products</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Browse our full range of premium mobile electronics and accessories — from flagship phones to everyday essentials.
        </p>
      </div>
      <CategoryFilter products={products} categories={categories} />
    </div>
  );
}

