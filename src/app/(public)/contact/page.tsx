'use client';

import { useState } from 'react';

const contactDetails = [
  { icon: '📧', label: 'Email', value: 'hello@gadgetsbytj.com', href: 'mailto:hello@gadgetsbytj.com' },
  { icon: '📞', label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { icon: '📍', label: 'Address', value: '123 Main St, City, State 00000', href: null },
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
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">Have a question? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-500">
                Whether you have a question about our products, need help with an order, or just want to say hello — we&apos;re here for you.
              </p>
            </div>

            <div className="space-y-4">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">{detail.label}</p>
                    {detail.href ? (
                      <a href={detail.href} className="text-blue-600 hover:text-blue-700 font-medium">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-gray-700">{detail.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2">⏰ Hours of Operation</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 10:00 AM – 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>

            {status === 'sent' && (
              <div role="status" className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                ✅ Message sent! We&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  aria-label="Message subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Your message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  placeholder="Tell us how we can help…"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                aria-label="Send message"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors min-h-[44px]"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
