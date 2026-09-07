"use client";

import React from "react";
import Link from "next/link";

type ThematicAreaCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
  color?: string;
  className?: string;
};

export default function ThematicAreaCard({
  icon,
  title,
  description,
  href,
  color = "from-green-500 to-emerald-600",
  className = "",
}: ThematicAreaCardProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${color}`} />

      <div className="p-8">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold group-hover:gap-3 transition-all">
          Learn More
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}