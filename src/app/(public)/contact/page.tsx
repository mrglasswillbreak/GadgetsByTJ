'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Check } from 'lucide-react';
import { FadeInWhenVisible } from '@/components/animations';

const contactDetails = [
  { Icon: Mail, label: 'Email', value: 'hello@gadgetsbytj.com', href: 'mailto:hello@gadgetsbytj.com' },
  { Icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { Icon: MapPin, label: 'Address', value: '123 Main St, City, State 00000', href: null },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission (replace with real API when available)
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('sent');
    setName(''); setEmail(''); setSubject(''); setMessage('');
    setTimeout(() => setStatus('idle'), 5000);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#050d1a] py-24 px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=1920&q=80"
            alt="Customer support"
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
              We&apos;re Here to Help
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">Contact Us</h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <p className="text-xl text-blue-100/80 leading-relaxed">Have a question? We&apos;d love to hear from you.</p>
          </FadeInWhenVisible>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent" />
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeInWhenVisible>
            <div className="space-y-8">
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Reach Out</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get in Touch</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Whether you have a question about our products, need help with an order, or just want to say hello — we&apos;re here for you.
                </p>
              </div>

              <div className="space-y-4">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <detail.Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{detail.label}</p>
                      {detail.href ? (
                        <a href={detail.href} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Hours of Operation</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Contact Form */}
          <FadeInWhenVisible delay={0.15}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>

              {status === 'sent' && (
                <div role="status" className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  Message sent! We&apos;ll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div role="alert" className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-label="Your name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Your email address"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    aria-label="Message subject"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-label="Your message"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Tell us how we can help…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-label="Send message"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-900/20 min-h-[44px]"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}

