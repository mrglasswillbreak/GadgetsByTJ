import type { Metadata } from 'next';
import Image from 'next/image';
import { BadgeCheck, Lightbulb, Users, Rocket, Store } from 'lucide-react';
import { FadeInWhenVisible, StaggerChildren } from '@/components/animations';

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
  { Icon: BadgeCheck, title: 'Quality First', description: 'Every product in our catalog is carefully vetted for build quality, durability, and real-world performance.', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { Icon: Lightbulb, title: 'Expert Knowledge', description: 'Our team lives and breathes mobile tech. We can help you find exactly what you need for any device.', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30' },
  { Icon: Users, title: 'Customer-Centric', description: 'Your satisfaction is our top priority. We stand behind every product we sell with responsive support.', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
  { Icon: Rocket, title: 'Always Innovating', description: 'We stay ahead of the latest tech trends so you always have access to the newest and best accessories.', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#050d1a] py-24 px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
            alt="Tech workspace"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-blue-950/70 to-indigo-950/80" />
        </div>
        {/* Decorative orbs */}
        <div aria-hidden="true" className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeInWhenVisible delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 font-medium mb-8">
              <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Our Story
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <div className="flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mx-auto mb-6">
              <Store className="w-10 h-10 text-white" aria-hidden="true" />
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">About GadgetsByTJ</h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3}>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              We&apos;re passionate about helping people get the most out of their mobile devices with premium accessories and expert advice.
            </p>
          </FadeInWhenVisible>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInWhenVisible>
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Who We Are</p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  GadgetsByTJ started with a simple idea: everyone deserves access to high-quality mobile accessories without breaking the bank. Founded by tech enthusiasts, we set out to curate the best products from trusted manufacturers worldwide.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  What began as a small operation quickly grew as word spread about our commitment to quality and our knack for finding the perfect accessory for every device. Today, we carry hundreds of products across categories including cases, chargers, screen protectors, and audio gear.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We&apos;re not just a store — we&apos;re your tech-savvy friends who happen to have access to amazing products at great prices.
                </p>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.15}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4">
                  <Store className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">GadgetsByTJ</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Your Premier Mobile Electronics Destination</p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">What We Stand For</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Values</h2>
            </div>
          </FadeInWhenVisible>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center">
                <div className={`${v.bg} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <v.Icon className={`w-7 h-7 ${v.color}`} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{v.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Milestones</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
            </div>
          </FadeInWhenVisible>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-blue-200 dark:bg-blue-800 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{m.year}</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{m.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{m.description}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

