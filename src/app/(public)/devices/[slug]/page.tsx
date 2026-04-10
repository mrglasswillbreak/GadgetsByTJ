import Link from 'next/link';
import ImageGallery from '@/components/public/ImageGallery';
import ProductCard from '@/components/public/ProductCard';
import { FadeInWhenVisible } from '@/components/animations';

const devices = [
  { id: 1, name: 'iPhone 15 Pro', brand: 'Apple', deviceType: 'Phone', slug: 'iphone-15-pro', image: 'https://images.unsplash.com/photo-1697537980414-5c1f2d0cbf01?w=800&q=80', description: 'The iPhone 15 Pro features a strong and lightweight titanium design, the most powerful iPhone chip ever with the A17 Pro, and a more versatile pro camera system.', specs: { Chip: 'A17 Pro', Display: '6.1" Super Retina XDR', Storage: '128GB - 1TB', Camera: '48MP + 12MP + 12MP', Battery: 'Up to 23 hours', 'Operating System': 'iOS 17', Connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3' } },
  { id: 2, name: 'iPhone 15', brand: 'Apple', deviceType: 'Phone', slug: 'iphone-15', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', description: 'iPhone 15 features the Dynamic Island, a 48MP Main camera, and USB-C. All in a durable color-infused glass and aluminum design.', specs: { Chip: 'A16 Bionic', Display: '6.1" Super Retina XDR', Storage: '128GB - 512GB', Camera: '48MP + 12MP', Battery: 'Up to 20 hours', 'Operating System': 'iOS 17', Connectivity: '5G, Wi-Fi 6, Bluetooth 5.3' } },
  { id: 3, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', deviceType: 'Phone', slug: 'samsung-galaxy-s24-ultra', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', description: 'The Samsung Galaxy S24 Ultra redefines the limits of mobile photography with a 200MP camera and built-in S Pen for precise control.', specs: { Processor: 'Snapdragon 8 Gen 3', Display: '6.8" Dynamic AMOLED 2X', Storage: '256GB - 1TB', Camera: '200MP + 50MP + 10MP + 12MP', Battery: '5000mAh', 'Operating System': 'Android 14', RAM: '12GB' } },
  { id: 4, name: 'Samsung Galaxy S24', brand: 'Samsung', deviceType: 'Phone', slug: 'samsung-galaxy-s24', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', description: 'Samsung Galaxy S24 with the latest Snapdragon chip, a brilliant display, and AI-powered features.', specs: { Processor: 'Snapdragon 8 Gen 3', Display: '6.2" Dynamic AMOLED 2X', Storage: '128GB - 256GB', Camera: '50MP + 12MP + 10MP', Battery: '4000mAh', 'Operating System': 'Android 14', RAM: '8GB' } },
  { id: 5, name: 'Google Pixel 8 Pro', brand: 'Google', deviceType: 'Phone', slug: 'google-pixel-8-pro', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', description: 'Google Pixel 8 Pro with Tensor G3 and the most advanced Pixel camera system ever, plus real-time AI features.', specs: { Chip: 'Google Tensor G3', Display: '6.7" LTPO OLED', Storage: '128GB - 1TB', Camera: '50MP + 48MP + 48MP', Battery: '5050mAh', 'Operating System': 'Android 14', RAM: '12GB' } },
  { id: 6, name: 'iPad Pro 12.9"', brand: 'Apple', deviceType: 'Tablet', slug: 'ipad-pro-12-9', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80', description: 'iPad Pro 12.9" with M2 chip delivers next-level performance and the most advanced display ever on iPad.', specs: { Chip: 'Apple M2', Display: '12.9" Liquid Retina XDR', Storage: '128GB - 2TB', Camera: '12MP Wide + 10MP Ultra Wide', Battery: 'Up to 10 hours', 'Operating System': 'iPadOS 17', Connectivity: 'Wi-Fi 6E, Bluetooth 5.3' } },
  { id: 7, name: 'Samsung Galaxy Tab S9', brand: 'Samsung', deviceType: 'Tablet', slug: 'samsung-galaxy-tab-s9', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80', description: 'Samsung Galaxy Tab S9 with a stunning Dynamic AMOLED 2X display, powerful Snapdragon processor, and included S Pen.', specs: { Processor: 'Snapdragon 8 Gen 2', Display: '11" Dynamic AMOLED 2X', Storage: '128GB - 256GB', Camera: '13MP + 12MP', Battery: '8400mAh', 'Operating System': 'Android 13', RAM: '8GB' } },
  { id: 8, name: 'iPad Air', brand: 'Apple', deviceType: 'Tablet', slug: 'ipad-air', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80', description: 'iPad Air with M1 chip. Serious performance meets stunning portability.', specs: { Chip: 'Apple M1', Display: '10.9" Liquid Retina', Storage: '64GB - 256GB', Camera: '12MP Wide', Battery: 'Up to 10 hours', 'Operating System': 'iPadOS 17', Connectivity: 'Wi-Fi 6, Bluetooth 5.0' } },
  { id: 9, name: 'AirPods Pro', brand: 'Apple', deviceType: 'Accessory', slug: 'airpods-pro', image: 'https://images.unsplash.com/photo-1588423771073-b8903fead714?w=800&q=80', description: 'AirPods Pro with Active Noise Cancellation, Transparency mode, and Spatial Audio for an immersive listening experience.', specs: { 'Noise Cancellation': 'Active Noise Cancellation', Chip: 'H2', 'Battery Life': 'Up to 6 hours (30hrs with case)', Connectivity: 'Bluetooth 5.3', 'Water Resistance': 'IPX4', Charging: 'Lightning / MagSafe' } },
  { id: 10, name: 'Samsung Galaxy Buds2', brand: 'Samsung', deviceType: 'Accessory', slug: 'samsung-galaxy-buds2', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', description: 'Samsung Galaxy Buds2 with ANC, a comfortable ergonomic design, and rich, balanced sound.', specs: { 'Noise Cancellation': 'Active Noise Cancellation', 'Battery Life': 'Up to 5 hours (20hrs with case)', Connectivity: 'Bluetooth 5.2', 'Water Resistance': 'IPX2', Charging: 'USB-C / Wireless' } },
  { id: 11, name: 'Universal Car Mount', brand: 'GadgetsByTJ', deviceType: 'Accessory', slug: 'universal-car-mount', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80', description: 'Magnetic universal car mount compatible with all smartphones. Strong magnetic hold with 360° rotation.', specs: { Compatibility: 'All smartphones up to 7"', Mount: 'Dashboard / Air Vent', Rotation: '360°', Material: 'ABS + Silicone', 'Magnet Strength': 'N52 Neodymium' } },
];

const compatibleProducts = [
  { id: 1, name: 'iPhone 15 Pro Case', price: '$19.99', category: 'Cases', slug: 'iphone-15-pro-case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80' },
  { id: 3, name: 'Tempered Glass Screen Protector', price: '$9.99', category: 'Screen Protectors', slug: 'tempered-glass-screen-protector', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80' },
  { id: 5, name: 'USB-C Fast Charger 65W', price: '$29.99', category: 'Chargers', slug: 'usbc-fast-charger-65w', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80' },
];

export default async function DeviceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const device = devices.find((d) => d.slug === slug);

  if (!device) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Device Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The device you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/devices" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Devices
        </Link>
      </div>
    );
  }

  const images = [
    { src: device.image, alt: device.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/devices" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Devices</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{device.name}</span>
      </nav>

      {/* Device layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image gallery */}
        <FadeInWhenVisible>
          <ImageGallery images={images} productName={device.name} />
        </FadeInWhenVisible>

        {/* Device info */}
        <FadeInWhenVisible delay={0.15}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                  device.deviceType === 'Phone'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : device.deviceType === 'Tablet'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                }`}
              >
                {device.deviceType}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{device.brand}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">{device.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{device.description}</p>

            {/* Specs */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Specifications</h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(device.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <td className="py-2 pr-4 font-medium text-gray-700 dark:text-gray-300 w-1/2">{key}</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>

      {/* Compatible Accessories */}
      <section>
        <FadeInWhenVisible>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Compatible Accessories</h2>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {compatibleProducts.map((product, i) => (
            <FadeInWhenVisible key={product.id} delay={i * 0.1}>
              <ProductCard {...product} />
            </FadeInWhenVisible>
          ))}
        </div>
      </section>
    </div>
  );
}

