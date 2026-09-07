"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    text: string;
    href: string;
    external?: boolean;
  };
  backgroundImage?: string;
  pattern?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  overlay?: boolean;
  className?: string;
};

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  pattern = false,
  size = "xl",
  overlay = true,
  className = "",
}: HeroSectionProps) {
  const sizeClasses = {
    sm: "py-16 md:py-20",
    md: "py-20 md:py-24",
    lg: "py-24 md:py-32",
    xl: "py-32 md:py-40 lg:py-48"
  };

  const sectionStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <section className={`relative ${sizeClasses[size]} ${className}`} style={sectionStyle}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700" />

      {pattern && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={
            {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }
          } />
        </div>
      )}

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Subtitle */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <span className="text-yellow-300">🇰🇪</span>
            <span className="text-white/90 text-sm font-medium">{subtitle}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              primaryCta.external ? (
                <a
                  href={primaryCta.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
                >
                  {primaryCta.text}
                </a>
              ) : (
                <Link
                  href={primaryCta.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
                >
                  {primaryCta.text}
                </Link>
              )
            )}

            {secondaryCta && (
              secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-all hover:scale-105 border border-white/30"
                >
                  {secondaryCta.text}
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-all hover:scale-105 border border-white/30"
                >
                  {secondaryCta.text}
                </Link>
              )
            )}
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <a href="#mission" className="inline-flex flex-col items-center text-white/60 hover:text-white transition-colors">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}