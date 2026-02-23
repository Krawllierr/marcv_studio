"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT, FORM_WEBHOOK_URL, LEGAL } from "@/lib/constants";
import { submitLeadForm } from "@/lib/form";
import ParallaxScene from "./ParallaxScene";

const ROLES = ["Developer", "Sales", "Marketing", "Architect", "Broker", "Other"];
const PROJECT_TYPES = ["Launch", "Subdivision", "Interiors", "Other"];
const TIMELINES = ["30 days", "60 days", "90 days", "Flexible"];

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORM_WEBHOOK_URL) {
      setStatus("error");
      setErrorMessage(
        `Form is temporarily unavailable. Please email us at ${CONTACT.email}.`
      );
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fileValue = formData.get("file");
    const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : undefined;
    setStatus("loading");
    setErrorMessage(null);
    const result = await submitLeadForm(
      {
        name: String(formData.get("name") || ""),
        company: String(formData.get("company") || ""),
        role: String(formData.get("role") || ""),
        cityState: String(formData.get("cityState") || ""),
        projectType: String(formData.get("projectType") || ""),
        launchTimeline: String(formData.get("launchTimeline") || ""),
        phone: String(formData.get("phone") || ""),
        email: String(formData.get("email") || ""),
        file,
        source: "lead-form",
      },
      FORM_WEBHOOK_URL
    );
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Lead form submission failed:", result.error);
      }
      setStatus("error");
      setErrorMessage(
        result.error || `Error. Try again or email us at ${CONTACT.email}.`
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <ParallaxScene distance={20}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Book a demo
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10">
            We reply within 24h.
          </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
                autoComplete="name"
                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Company"
                autoComplete="organization"
                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <label htmlFor="role" className="sr-only">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="">Role</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <div>
            <label htmlFor="cityState" className="sr-only">
              City and state
            </label>
            <input
              id="cityState"
              name="cityState"
              type="text"
              required
              placeholder="City, State"
              autoComplete="address-level2"
              className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectType" className="sr-only">
                Project type
              </label>
              <select
                id="projectType"
                name="projectType"
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
              <label htmlFor="launchTimeline" className="sr-only">
                Launch timeline
              </label>
              <select
                id="launchTimeline"
                name="launchTimeline"
                required
                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent"
              >
                <option value="">Timeline</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="file" className="text-xs text-gray-400 block">
            Upload plans or references (optional)
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".pdf,image/*"
            className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-accent file:text-surface-dark file:font-medium"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone"
                autoComplete="tel"
                inputMode="tel"
                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {status === "success" && (
            <p role="status" aria-live="polite" className="text-green-400 text-sm">
              Thanks. We&apos;ll be in touch.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-red-400 text-sm">
              {errorMessage || "Error. Try again or email us."}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 bg-accent hover:bg-accent-light disabled:opacity-50 text-surface-dark font-semibold rounded-lg transition-colors"
          >
            {status === "loading" ? "Sending..." : "Book a demo"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            <Link href={LEGAL.privacyHref} className="hover:text-gray-400">
              Privacy
            </Link>
          </p>
          </form>
        </div>
      </ParallaxScene>
    </section>
  );
}
