"use client";

import { useState } from "react";

/**
 * Newsletter signup form — Client Component
 * Connected to database via API
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("success");
        setEmail("");
        if (data.message) {
          setMessage(data.message);
        }
        // Reset after 3 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setStatus("error");
        setMessage(errorData.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 p-6 bg-green-500/20 border border-green-500/30 rounded-2xl max-w-lg mx-auto">
        <span className="text-2xl">✅</span>
        <div>
          <p className="text-white font-semibold">
            Thank you for subscribing to Kakamega Empowerment!
          </p>
          {message && (
            <p className="text-white/80 text-sm mt-1">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
          if (message) setMessage("");
        }}
        placeholder="Enter your email address"
        required
        disabled={status === "loading"}
        className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
