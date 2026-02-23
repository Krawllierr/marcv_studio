"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { FORM_WEBHOOK_URL } from "@/lib/constants";
import { submitLeadMagnet } from "@/lib/form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LeadMagnetModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const titleId = useId();
  const emailId = useId();
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => emailInputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const result = await submitLeadMagnet({ email: email.trim() }, FORM_WEBHOOK_URL);
    setStatus(result.ok ? "success" : "error");
    if (result.ok) setEmail("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative bg-surface-dark border border-white/10 rounded-xl p-8 max-w-md w-full shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h3 id={titleId} className="text-xl font-bold text-white">
          Interactive Sales Gallery Checklist (PDF)
        </h3>
        <p className="mt-2 text-gray-400 text-sm">
          Get our free checklist to prepare your sales stand for interactive
          presentations.
        </p>
        {status === "success" ? (
          <p role="status" aria-live="polite" className="mt-6 text-green-400 text-sm">
            Check your email — we sent you the checklist.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor={emailId} className="sr-only">
              Email
            </label>
            <input
              id={emailId}
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              autoComplete="email"
              inputMode="email"
              required
              className="w-full px-4 py-3 bg-surface-light border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
            {status === "error" && (
              <p role="alert" className="mt-2 text-red-400 text-xs">
                Something went wrong. Try again or email us.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 w-full py-3 bg-accent hover:bg-accent-light disabled:opacity-50 text-surface-dark font-semibold rounded-lg transition-colors"
            >
              {status === "loading" ? "Sending..." : "Send me the checklist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
