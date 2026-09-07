"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about#our-story", label: "Our Story" },
      { href: "/about#values", label: "Our Values" },
      { href: "/about#where-we-work", label: "Where We Work" },
    ],
  },
  {
    href: "/our-work",
    label: "Our Work",
    children: [
      { href: "/governance", label: "Governance & Advocacy" },
      { href: "/climate-action", label: "Climate & Environment" },
      { href: "/land-rights", label: "Land Rights" },
      { href: "/human-rights", label: "Human Rights" },
    ],
  },
  { href: "/impact", label: "Impact" },
  { href: "/projects", label: "Projects" },
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  {
    href: "/get-involved",
    label: "Get Involved",
    children: [
      { href: "/volunteer", label: "Volunteer" },
      { href: "/donations", label: "Donate" },
      { href: "/get-involved#partner", label: "Partner With Us" },
    ],
  },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
              <img
                src="/kakamega-empowerment-logo-transparent.png"
                alt="Kakamega Empowerment CBO"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-green-800 dark:text-green-400 text-base md:text-lg leading-tight">
                Kakamega Empowerment
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 -mt-0.5">
                Community-Based Organization
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors text-sm"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-100 dark:border-slate-700 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-slate-700 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-involved"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-700/25"
            >
              Get Involved
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-slate-700 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-700 dark:hover:text-green-400 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-700 dark:hover:text-green-400 rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/get-involved"
                onClick={() => setMobileOpen(false)}
                className="block mx-4 mt-4 text-center px-4 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}