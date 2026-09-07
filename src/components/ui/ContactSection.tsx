"use client";

import React from "react";

type ContactItem = {
  icon: string;
  label: string;
  value: string;
  href?: string;
};

type ContactSectionProps = {
  title?: string;
  description?: string;
  contactItems?: ContactItem[];
  children?: React.ReactNode;
};

const defaultContactItems: ContactItem[] = [
  {
    icon: "📍",
    label: "Address",
    value: "P.O. Box 1495 - 50100, Kakamega, Kenya",
    href: "https://maps.google.com/?q=Kakamega+Kenya",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+254 703 456 604",
    href: "tel:+254703456604",
  },
  {
    icon: "📧",
    label: "Email",
    value: "Kakamegaempowerment1@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=Kakamegaempowerment1@gmail.com",
  },
];

export default function ContactSection({
  title = "Get In Touch",
  description = "Have questions, want to partner, or interested in our work? Reach out to us.",
  contactItems = defaultContactItems,
  children,
}: ContactSectionProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{description}</p>

        <div className="space-y-6">
          {contactItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} className="text-lg text-gray-900 dark:text-white hover:text-green-700 dark:hover:text-green-400 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form or Children */}
      <div>
        {children}
      </div>
    </div>
  );
}