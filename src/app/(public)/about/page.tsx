import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — GadgetsByTJ',
  description: 'Learn about GadgetsByTJ — your premier destination for mobile electronics and accessories.',
};

const milestones = [
  { year: '2020', title: 'Founded', description: 'GadgetsByTJ was born out of a passion for mobile technology and a desire to make premium accessories accessible to everyone.' },
  { year: '2021', title: 'First 1,000 Customers', description: 'We reached our first thousand happy customers, driven by our commitment to quality products and exceptional service.' },
  { year: '2022', title: 'Expanded Catalog', description: 'We expanded our product range to include a full suite of mobile accessories, from cases and chargers to screen protectors and audio gear.' },
  { year: '2023', title: 'Online Store Launch', description: 'We launched our full e-commerce platform, bringing our curated gadget selection to customers everywhere.' },
  { year: '2024', title: 'Growing Strong', description: 'Today we serve thousands of satisfied customers and continue to grow our selection of premium mobile electronics.' },
];

const values = [
  { emoji: '✅', title: 'Quality First', description: 'Every product in our catalog is carefully vetted for build quality, durability, and real-world performance.' },
  { emoji: '💡', title: 'Expert Knowledge', description: 'Our team lives and breathes mobile tech. We can help you find exactly what you need for any device.' },
  { emoji: '🤝', title: 'Customer-Centric', description: 'Your satisfaction is our top priority. We stand behind every product we sell with responsive support.' },
  { emoji: '🚀', title: 'Always Innovating', description: 'We stay ahead of the latest tech trends so you always have access to the newest and best accessories.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">📱</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About GadgetsByTJ</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We&apos;re passionate about helping people get the most out of their mobile devices with premium accessories and expert advice.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                GadgetsByTJ started with a simple idea: everyone deserves access to high-quality mobile accessories without breaking the bank. Founded by tech enthusiasts, we set out to curate the best products from trusted manufacturers worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a small operation quickly grew as word spread about our commitment to quality and our knack for finding the perfect accessory for every device. Today, we carry hundreds of products across categories including cases, chargers, screen protectors, and audio gear.
              </p>
              <p className="text-gray-600">
                We&apos;re not just a store — we&apos;re your tech-savvy friends who happen to have access to amazing products at great prices.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
              <div className="text-7xl mb-4">🏪</div>
              <p className="text-2xl font-bold text-gray-900">GadgetsByTJ</p>
              <p className="text-gray-500 mt-2">Your Premier Mobile Electronics Destination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-blue-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-blue-600 mb-1">{m.year}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
                  <p className="text-gray-500">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
