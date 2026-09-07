"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Empowering Communities
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Be part of the movement to build a just, inclusive, and climate-resilient society
            in Kakamega County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-1">
                <img
                  src="/kakamega-empowerment-logo-transparent.png"
                  alt="Kakamega Empowerment CBO"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-xl">Kakamega Empowerment CBO</p>
                <p className="text-sm text-gray-400">Community-Based Organization</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
              Empowering Communities, Advancing Rights, Transforming Lives. We work across
              Kakamega County to promote social justice, accountable governance, environmental
              sustainability, and community rights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/our-work" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Our Work</Link></li>
              <li><Link href="/impact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Impact</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Projects</Link></li>
              <li><Link href="/stories" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Stories</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Events</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Resources</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Work</h3>
            <ul className="space-y-2">
              <li><Link href="/governance" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Governance & Advocacy</Link></li>
              <li><Link href="/climate-action" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Climate & Environment</Link></li>
              <li><Link href="/land-rights" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Land Rights</Link></li>
              <li><Link href="/human-rights" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Human Rights</Link></li>
              <li><Link href="/get-involved" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Get Involved</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <span>📍</span>
                <span>P.O. Box 1495 - 50100<br />Kakamega, Kenya</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>📞</span>
                <a href="tel:+254703456604" className="hover:text-green-400 transition-colors">
                  +254 703 456 604
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>📧</span>
                <a href="mailto:Kakamegaempowerment1@gmail.com" className="hover:text-green-400 transition-colors">
                  Kakamegaempowerment1@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Kakamega Empowerment CBO. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> in Kakamega, Kenya 🇰🇪
          </p>
        </div>
      </div>
    </footer>
  );
}