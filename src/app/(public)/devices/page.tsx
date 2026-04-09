import DeviceCard from '@/components/public/DeviceCard';
import { FadeInWhenVisible, StaggerChildren } from '@/components/animations';

const devices = [
  { id: 1, name: 'iPhone 15 Pro', brand: 'Apple', deviceType: 'Phone', slug: 'iphone-15-pro', emoji: '📱', description: 'Latest flagship from Apple with titanium design and A17 Pro chip.' },
  { id: 2, name: 'iPhone 15', brand: 'Apple', deviceType: 'Phone', slug: 'iphone-15', emoji: '📱', description: 'Apple iPhone 15 with Dynamic Island and USB-C.' },
  { id: 3, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', deviceType: 'Phone', slug: 'samsung-galaxy-s24-ultra', emoji: '📱', description: 'Samsung flagship with built-in S Pen and 200MP camera.' },
  { id: 4, name: 'Samsung Galaxy S24', brand: 'Samsung', deviceType: 'Phone', slug: 'samsung-galaxy-s24', emoji: '📱', description: 'Samsung Galaxy S24 with Snapdragon 8 Gen 3.' },
  { id: 5, name: 'Google Pixel 8 Pro', brand: 'Google', deviceType: 'Phone', slug: 'google-pixel-8-pro', emoji: '📱', description: 'Google Pixel 8 Pro with Tensor G3 chip and AI features.' },
  { id: 6, name: 'iPad Pro 12.9"', brand: 'Apple', deviceType: 'Tablet', slug: 'ipad-pro-12-9', emoji: '💻', description: 'Apple iPad Pro with M2 chip and stunning Liquid Retina XDR display.' },
  { id: 7, name: 'Samsung Galaxy Tab S9', brand: 'Samsung', deviceType: 'Tablet', slug: 'samsung-galaxy-tab-s9', emoji: '💻', description: 'Samsung Galaxy Tab S9 with AMOLED display and S Pen included.' },
  { id: 8, name: 'iPad Air', brand: 'Apple', deviceType: 'Tablet', slug: 'ipad-air', emoji: '💻', description: 'Apple iPad Air with M1 chip - power and portability combined.' },
  { id: 9, name: 'AirPods Pro', brand: 'Apple', deviceType: 'Accessory', slug: 'airpods-pro', emoji: '🎧', description: 'Apple AirPods Pro with Active Noise Cancellation and Spatial Audio.' },
  { id: 10, name: 'Samsung Galaxy Buds2', brand: 'Samsung', deviceType: 'Accessory', slug: 'samsung-galaxy-buds2', emoji: '🎧', description: 'Samsung Galaxy Buds2 with Active Noise Cancellation.' },
  { id: 11, name: 'Universal Car Mount', brand: 'GadgetsByTJ', deviceType: 'Accessory', slug: 'universal-car-mount', emoji: '🚗', description: 'Universal magnetic car mount compatible with all smartphones.' },
];

const sections: { type: string; label: string }[] = [
  { type: 'Phone', label: 'Phones' },
  { type: 'Tablet', label: 'Tablets' },
  { type: 'Accessory', label: 'Accessories' },
];

export default function DevicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <FadeInWhenVisible>
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Devices</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore the latest phones, tablets, and accessories we carry and support with premium accessories.
          </p>
        </div>
      </FadeInWhenVisible>

      {sections.map((section) => {
        const sectionDevices = devices.filter((d) => d.deviceType === section.type);
        return (
          <section key={section.type} className="mb-16">
            <FadeInWhenVisible>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-200">
                {section.label}
              </h2>
            </FadeInWhenVisible>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sectionDevices.map((device) => (
                <DeviceCard key={device.id} {...device} />
              ))}
            </StaggerChildren>
          </section>
        );
      })}
    </div>
  );
}
