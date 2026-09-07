import React from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
  titleClassName?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  alignment = "center",
  titleClassName = "",
  className = "",
}: SectionHeadingProps) {
  const alignmentClasses = alignment === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses} ${className}`}>
      {eyebrow && (
        <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}