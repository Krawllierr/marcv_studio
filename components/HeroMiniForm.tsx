"use client";

import { useState } from "react";

const PROJECT_TYPES = [
  "Launch / new development",
  "Subdivision / lot",
  "Interiors",
  "Other",
];

export default function HeroMiniForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [projectType, setProjectType] = useState("");
  const [cityState, setCityState] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectType && cityState) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("projectType", projectType);
      formData.append("cityState", cityState);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("source", "hero-mini-form");
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setStep(1);
        setProjectType("");
        setCityState("");
        setName("");
        setEmail("");
        setPhone("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-xl bg-accent/10 border border-accent/30">
        <p role="status" aria-live="polite" className="text-accent font-medium">
          Thanks! We&apos;ll reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={step === 1 ? handleStep1 : handleSubmit}
      className="space-y-4"
    >
      {step === 1 ? (
        <>
          <div>
            <label htmlFor="hero-project-type" className="sr-only">
              Project type
            </label>
            <select
              id="hero-project-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
            >
              <option value="">Project type</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="hero-city-state" className="sr-only">
              City and state
            </label>
            <input
              id="hero-city-state"
              type="text"
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              placeholder="City, State (US)"
              autoComplete="address-level2"
              required
              className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-lg transition-colors"
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <label htmlFor="hero-name" className="sr-only">
            Name
          </label>
          <input
            id="hero-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            autoComplete="name"
            required
            className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
          <label htmlFor="hero-email" className="sr-only">
            Email
          </label>
          <input
            id="hero-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
          <label htmlFor="hero-phone" className="sr-only">
            Phone
          </label>
          <input
            id="hero-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            autoComplete="tel"
            inputMode="tel"
            required
            className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 py-3 bg-accent hover:bg-accent-light disabled:opacity-50 text-surface-dark font-semibold rounded-lg transition-colors"
            >
              {status === "loading" ? "Sending..." : "Book a demo"}
            </button>
          </div>
        </>
      )}
      {status === "error" && (
        <p role="alert" className="text-red-400 text-sm">
          Something went wrong.{" "}
          <button
            type="button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="underline"
          >
            Use the full form below
          </button>
          .
        </p>
      )}
    </form>
  );
}
