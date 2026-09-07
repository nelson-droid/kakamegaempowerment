"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { Navigation, Footer } from "@/components/ui";

// Load Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];
const MPESA_NUMBER = "0703456604";
const MPESA_SHORTCODE = "247247"; // Default till number; replace with actual

type Step = "amount" | "method" | "details" | "payment" | "success" | "error";

export default function DonationsPage() {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "mpesa" | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [mpesaCheckoutId, setMpesaCheckoutId] = useState<string | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-select the donorName/email into fields for the success page
  useEffect(() => {
    if (step === "success" && isAnonymous) {
      setDonorName("Anonymous Donor");
    }
  }, [step, isAnonymous]);

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmount = (val: string) => {
    setCustomAmount(val);
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0) setAmount(n);
  };

  const proceedToMethod = () => {
    if (amount <= 0) {
      setError("Please select or enter a valid amount");
      return;
    }
    setError(null);
    setStep("method");
  };

  const proceedToDetails = (method: "stripe" | "mpesa") => {
    setPaymentMethod(method);
    setError(null);
    setStep("details");
  };

  const validateDetails = () => {
    if (!isAnonymous && !donorName.trim()) {
      setError("Please enter your name or check 'Donate Anonymously'");
      return false;
    }
    if (!donorEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (paymentMethod === "mpesa" && !donorPhone.trim()) {
      setError("Phone number is required for M-Pesa donations");
      return false;
    }
    return true;
  };

  const initiatePayment = async () => {
    if (!validateDetails()) return;
    setError(null);
    setLoading(true);

    try {
      if (paymentMethod === "stripe") {
        const res = await fetch("/api/donations/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency: "usd",
            donorName: isAnonymous ? "Anonymous" : donorName,
            donorEmail,
            isAnonymous,
            message,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to create payment");
        }

        setClientSecret(data.clientSecret);
        setDonationId(data.donationId);
        setStep("payment");
      } else if (paymentMethod === "mpesa") {
        const res = await fetch("/api/donations/mpesa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            donorName: isAnonymous ? "Anonymous" : donorName,
            donorEmail,
            donorPhone,
            isAnonymous,
            message,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to initiate M-Pesa payment");
        }

        setMpesaCheckoutId(data.checkoutRequestId);
        setDonationId(data.donationId);
        setStep("payment");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to process payment");
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative py-20 md:py-24 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span>💚</span>
              <span className="text-white/90 text-sm font-medium">Make a Donation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Support Our Mission
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Your generosity empowers communities, restores forests, and protects Kakamega's environment for future generations.
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-12 md:py-16 bg-white dark:bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-10">
              {/* Progress Steps */}
              <StepIndicator step={step} />

              {error && step !== "error" && (
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
              )}

              {/* Step 1: Choose Amount */}
              {step === "amount" && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Choose an amount
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Every contribution, big or small, makes a difference.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {PRESET_AMOUNTS.map((val) => (
                      <button
                        key={val}
                        onClick={() => handleAmountSelect(val)}
                        className={`py-4 px-4 rounded-xl font-bold text-lg transition-all ${
                          amount === val && !customAmount
                            ? "bg-green-700 text-white shadow-lg scale-105"
                            : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Or enter a custom amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={proceedToMethod}
                    className="mt-8 w-full px-6 py-4 bg-green-700 hover:bg-green-800 text-white font-bold text-lg rounded-full transition-all hover:scale-[1.02] shadow-xl"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2: Choose Method */}
              {step === "method" && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Choose payment method
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Select how you'd like to donate ${amount.toFixed(2)} USD
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => proceedToDetails("stripe")}
                      className="p-6 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 hover:border-green-500 dark:hover:border-green-500 rounded-2xl transition-all text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
                          💳
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Card / Bank</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        International & regional partners. Pay with credit/debit card or bank transfer via Stripe.
                      </p>
                    </button>

                    <button
                      onClick={() => proceedToDetails("mpesa")}
                      className="p-6 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 hover:border-green-500 dark:hover:border-green-500 rounded-2xl transition-all text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl">
                          📱
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">M-Pesa</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Local Kenyan mobile money. Pay with M-Pesa to number <strong>{MPESA_NUMBER}</strong>.
                      </p>
                    </button>
                  </div>

                  <button
                    onClick={() => setStep("amount")}
                    className="mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ← Back to amount
                  </button>
                </div>
              )}

              {/* Step 3: Donor Details */}
              {step === "details" && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Your details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We'll send your receipt and updates on the impact of your gift.
                  </p>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Make my donation anonymous
                      </span>
                    </label>

                    {!isAnonymous && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Full name *
                        </label>
                        <input
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="John Mwangi"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email address *
                      </label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    {paymentMethod === "mpesa" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          M-Pesa phone number *
                        </label>
                        <input
                          type="tel"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="0712345678 or 254712345678"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Format: 2547XXXXXXXX or 07XXXXXXXX
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Message (optional)
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Leave a message of support..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Donation amount:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${amount.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>Payment method:</span>
                      <span className="font-semibold text-gray-900 dark:text-white capitalize">
                        {paymentMethod === "stripe" ? "Card / Bank" : "M-Pesa"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep("method")}
                      className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-full transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={initiatePayment}
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full transition-all disabled:opacity-50"
                    >
                      {loading ? "Processing..." : `Donate $${amount.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === "payment" && paymentMethod === "stripe" && clientSecret && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Complete payment
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Enter your card details to complete your donation of ${amount.toFixed(2)}.
                  </p>

                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                    <StripePaymentForm
                      amount={amount}
                      onSuccess={() => setStep("success")}
                      onError={(err) => {
                        setError(err);
                        setStep("error");
                      }}
                    />
                  </Elements>

                  <button
                    onClick={() => setStep("details")}
                    className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  >
                    ← Back to details
                  </button>
                </div>
              )}

              {step === "payment" && paymentMethod === "mpesa" && mpesaCheckoutId && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Complete via M-Pesa
                  </h2>

                  <div className="mt-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-6 text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Check your phone
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      An M-Pesa payment request has been sent to <strong>{donorPhone}</strong>.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Enter your M-Pesa PIN to authorize the payment of{" "}
                      <strong>${amount.toFixed(2)}</strong> to Kakamega Empowerment CBO.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 p-3 rounded-lg font-mono">
                      Checkout ID: {mpesaCheckoutId.slice(0, 24)}...
                    </div>
                  </div>

                  <MpesaPollStatus
                    checkoutId={mpesaCheckoutId}
                    onSuccess={() => setStep("success")}
                    onError={(err) => {
                      setError(err);
                      setStep("error");
                    }}
                  />
                </div>
              )}

              {/* Success */}
              {step === "success" && (
                <div className="mt-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-5xl">✅</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Thank you!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Your generous donation of <strong>${amount.toFixed(2)}</strong> has been received.
                    A receipt has been sent to {donorEmail}.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Your support empowers communities and protects Kakamega's environment.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setStep("amount");
                        setAmount(50);
                        setCustomAmount("");
                        setDonorName("");
                        setDonorEmail("");
                        setDonorPhone("");
                        setMessage("");
                        setIsAnonymous(false);
                        setError(null);
                        setClientSecret(null);
                        setMpesaCheckoutId(null);
                        setDonationId(null);
                      }}
                      className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors"
                    >
                      Make another donation
                    </button>
                    <a
                      href="/"
                      className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-full transition-colors"
                    >
                      Back to home
                    </a>
                  </div>
                </div>
              )}

              {/* Error */}
              {step === "error" && (
                <div className="mt-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <span className="text-5xl">⚠️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Something went wrong
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    {error || "We couldn't process your donation. Please try again."}
                  </p>
                  <button
                    onClick={() => {
                      setError(null);
                      setStep("amount");
                    }}
                    className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>

            {/* Trust signals */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🔒", label: "Secure", desc: "Encrypted payment" },
                { icon: "📧", label: "Receipt", desc: "Email confirmation" },
                { icon: "💚", label: "Impact", desc: "100% to programs" },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "amount", label: "Amount" },
    { key: "method", label: "Method" },
    { key: "details", label: "Details" },
    { key: "payment", label: "Payment" },
  ];

  const currentIdx = steps.findIndex((s) => s.key === step);
  const isFinal = step === "success" || step === "error";

  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => {
        const isComplete = isFinal || i < currentIdx;
        const isCurrent = !isFinal && i === currentIdx;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  isComplete
                    ? "bg-green-700 text-white"
                    : isCurrent
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-2 ring-green-700"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-500"
                }`}
              >
                {isComplete ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  isCurrent ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded ${
                  isComplete ? "bg-green-700" : "bg-gray-200 dark:bg-slate-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StripePaymentForm({
  amount,
  onSuccess,
  onError,
}: {
  amount: number;
  onSuccess: () => void;
  onError: (err: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrMsg(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donations?status=success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrMsg(error.message || "Payment failed");
      onError(error.message || "Payment failed");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();
    } else {
      setErrMsg("Payment was not completed");
      onError("Payment was not completed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errMsg && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-300">{errMsg}</p>
        </div>
      )}
      <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-900 mb-4">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-4 bg-green-700 hover:bg-green-800 text-white font-bold text-lg rounded-full transition-all disabled:opacity-50"
      >
        {loading ? "Processing..." : `Donate $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

function MpesaPollStatus({
  checkoutId,
  onSuccess,
  onError,
}: {
  checkoutId: string;
  onSuccess: () => void;
  onError: (err: string) => void;
}) {
  const [status, setStatus] = useState<string>("Polling...");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const maxAttempts = 60; // ~3 min
    let attempts = 0;

    const poll = async () => {
      try {
        const res = await fetch(`/api/donations/mpesa/status?checkoutId=${checkoutId}`);
        const data = await res.json();
        if (data.status === "completed") {
          onSuccess();
          return;
        } else if (data.status === "failed" || data.status === "cancelled") {
          onError(data.message || "Payment failed or was cancelled");
          return;
        }
        setStatus(data.message || "Waiting for M-Pesa confirmation...");
      } catch (e) {
        console.error(e);
      }
      attempts += 1;
      setCount(attempts);
      if (attempts < maxAttempts) {
        setTimeout(poll, 3000);
      } else {
        onError("Payment timed out. Please try again.");
      }
    };

    poll();
  }, [checkoutId, onSuccess, onError]);

  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
      <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
        <span className="inline-block animate-pulse">⏳</span> {status}
      </p>
      <p className="text-xs text-blue-700 dark:text-blue-400 text-center mt-1">
        Polling {count} / 60 — keep this page open
      </p>
    </div>
  );
}