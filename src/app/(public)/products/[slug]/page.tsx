import Link from 'next/link';
import ImageGallery from '@/components/public/ImageGallery';
import ProductCard from '@/components/public/ProductCard';
import { FadeInWhenVisible } from '@/components/animations';

const products = [
  { id: 1, name: 'iPhone 15 Pro Case', price: '$19.99', category: 'Cases', slug: 'iphone-15-pro-case', emoji: '📱', description: 'Premium protective case for iPhone 15 Pro with military-grade drop protection and slim profile.', specs: { Material: 'Polycarbonate + TPU', Compatibility: 'iPhone 15 Pro', 'Drop Protection': 'MIL-STD-810G', 'Wireless Charging': 'Compatible', Weight: '28g' } },
  { id: 2, name: 'Samsung S24 Case', price: '$14.99', category: 'Cases', slug: 'samsung-s24-case', emoji: '📱', description: 'Sleek and durable case for the Samsung Galaxy S24 with precise cutouts and raised edges.', specs: { Material: 'TPU + Hard PC', Compatibility: 'Samsung Galaxy S24', 'Drop Protection': '1.5m', 'Wireless Charging': 'Compatible', Weight: '22g' } },
  { id: 3, name: 'Tempered Glass Screen Protector', price: '$9.99', category: 'Screen Protectors', slug: 'tempered-glass-screen-protector', emoji: '🛡️', description: 'Ultra-clear tempered glass screen protector with 9H hardness and oleophobic coating.', specs: { Hardness: '9H', Thickness: '0.33mm', Compatibility: 'Universal', Type: 'Tempered Glass', Finish: 'Clear' } },
  { id: 4, name: 'Privacy Screen Protector', price: '$12.99', category: 'Screen Protectors', slug: 'privacy-screen-protector', emoji: '🛡️', description: 'Privacy screen protector that blocks side-angle viewing to keep your screen content private.', specs: { Hardness: '9H', Thickness: '0.33mm', 'Privacy Angle': '30°', Type: 'Tempered Glass', Finish: 'Anti-Glare' } },
  { id: 5, name: 'USB-C Fast Charger 65W', price: '$29.99', category: 'Chargers', slug: 'usbc-fast-charger-65w', emoji: '⚡', description: '65W USB-C GaN fast charger compatible with laptops, tablets, and smartphones for rapid charging.', specs: { Power: '65W', Connector: 'USB-C', Technology: 'GaN', Compatibility: 'Universal USB-C', 'Cable Included': 'Yes' } },
  { id: 6, name: 'MagSafe Wireless Charger', price: '$39.99', category: 'Chargers', slug: 'magsafe-wireless-charger', emoji: '⚡', description: 'MagSafe-compatible wireless charger delivering up to 15W for iPhone 12 and later models.', specs: { Power: '15W (MagSafe)', Type: 'Wireless', Compatibility: 'iPhone 12 and later', Connector: 'USB-C', Alignment: 'Magnetic' } },
  { id: 7, name: 'iPhone 15 Pro', price: '$999.99', category: 'Phones', slug: 'iphone-15-pro', emoji: '📲', description: 'The iPhone 15 Pro with titanium design, A17 Pro chip, and a versatile pro camera system.', specs: { Chip: 'A17 Pro', Display: '6.1" Super Retina XDR', Storage: '128GB - 1TB', Camera: '48MP + 12MP + 12MP', Battery: 'Up to 23 hours', OS: 'iOS 17' } },
  { id: 8, name: 'Samsung Galaxy S24', price: '$799.99', category: 'Phones', slug: 'samsung-galaxy-s24', emoji: '📲', description: 'Samsung Galaxy S24 powered by Snapdragon 8 Gen 3 with AI features and a stunning display.', specs: { Processor: 'Snapdragon 8 Gen 3', Display: '6.2" Dynamic AMOLED 2X', Storage: '128GB - 256GB', Camera: '50MP + 12MP + 10MP', Battery: '4000mAh', OS: 'Android 14' } },
  { id: 9, name: 'iPad Air 5th Gen', price: '$599.99', category: 'Tablets', slug: 'ipad-air-5th-gen', emoji: '💻', description: 'iPad Air with M1 chip delivers powerful performance in a thin and light design.', specs: { Chip: 'Apple M1', Display: '10.9" Liquid Retina', Storage: '64GB - 256GB', Camera: '12MP Wide', Battery: 'Up to 10 hours', OS: 'iPadOS 17' } },
  { id: 10, name: 'AirPods Pro 2nd Gen', price: '$249.99', category: 'Audio', slug: 'airpods-pro-2nd-gen', emoji: '🎧', description: 'AirPods Pro 2nd generation with Active Noise Cancellation and Adaptive Transparency.', specs: { 'Noise Cancellation': 'Active', Chip: 'H2', 'Battery Life': 'Up to 6 hours', Connectivity: 'Bluetooth 5.3', 'Water Resistance': 'IPX4', Charging: 'Lightning / MagSafe' } },
  { id: 11, name: 'Samsung Galaxy Buds2', price: '$149.99', category: 'Audio', slug: 'samsung-galaxy-buds2', emoji: '🎧', description: 'Samsung Galaxy Buds2 with ANC, lightweight design, and rich balanced sound.', specs: { 'Noise Cancellation': 'Active', 'Battery Life': 'Up to 5 hours', Connectivity: 'Bluetooth 5.2', 'Water Resistance': 'IPX2', Charging: 'USB-C / Wireless' } },
  { id: 12, name: 'Samsung Galaxy Tab S9', price: '$699.99', category: 'Tablets', slug: 'samsung-galaxy-tab-s9', emoji: '💻', description: 'Samsung Galaxy Tab S9 with Dynamic AMOLED 2X display and S Pen included.', specs: { Processor: 'Snapdragon 8 Gen 2', Display: '11" Dynamic AMOLED 2X', Storage: '128GB - 256GB', Camera: '13MP + 12MP', Battery: '8400mAh', OS: 'Android 13' } },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/products" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5">
          Back to Products
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const images = [
    { src: '', alt: product.name, emoji: product.emoji },
    { src: '', alt: product.name, emoji: '🔒' },
    { src: '', alt: product.name, emoji: '✨' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
      </nav>

      {/* Product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image gallery */}
        <FadeInWhenVisible>
          <ImageGallery images={images} productName={product.name} />
        </FadeInWhenVisible>

        {/* Product info */}
        <FadeInWhenVisible delay={0.15}>
          <div>
            <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">{product.price}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{product.description}</p>

            {/* Specs */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Specifications</h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <td className="py-2 pr-4 font-medium text-gray-700 dark:text-gray-300 w-1/2">{key}</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-900/20 text-lg">
              Add to Cart
            </button>
          </div>
        </FadeInWhenVisible>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <FadeInWhenVisible>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <FadeInWhenVisible key={p.id} delay={i * 0.1}>
                <ProductCard {...p} />
              </FadeInWhenVisible>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
