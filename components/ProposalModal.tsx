"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { FORM_WEBHOOK_URL } from "@/lib/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
};

const PROJECT_TYPES = ["Launch / new dev", "Subdivision", "Interiors", "Other"];
const TIMELINES = ["30 days", "60 days", "90 days", "Flexible"];
const UNIT_RANGES = ["1–20", "21–50", "51–150", "150+"];
const HAS_GALLERY = ["Yes, existing", "Planning one", "No"];
const BUDGET_RANGES = ["Exploring", "Under $50k", "$50k–$100k", "$100k+"];

export default function ProposalModal({ isOpen, onClose, packageName }: Props) {
  const [formData, setFormData] = useState({
    projectType: "",
    timeline: "",
    units: "",
    hasGallery: "",
    budget: "",
    name: "",
    email: "",
    company: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const titleId = useId();
  const descriptionId = useId();
  const projectTypeId = useId();
  const timelineId = useId();
  const unitsId = useId();
  const hasGalleryId = useId();
  const budgetId = useId();
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => firstFieldRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    if (!FORM_WEBHOOK_URL) {
      setStatus("error");
      return;
    }
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("package", packageName);
      fd.append("source", "proposal-modal");
      const res = await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
        }, 2000);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
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
        aria-describedby={descriptionId}
        className="relative bg-surface-dark border border-white/10 rounded-xl p-8 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
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
          Get proposal - {packageName}
        </h3>
        <p id={descriptionId} className="mt-2 text-sm text-gray-400">
          Answer 5 quick questions. We&apos;ll send a tailored plan within 24h.
        </p>

        {status === "success" ? (
          <p role="status" aria-live="polite" className="mt-6 text-green-400 font-medium">
            Thank you! Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor={projectTypeId} className="block text-xs text-gray-400 mb-1">
                Project type
              </label>
              <select
                id={projectTypeId}
                ref={firstFieldRef}
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm"
              >
                <option value="">Select</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={timelineId} className="block text-xs text-gray-400 mb-1">
                Launch timeline
              </label>
              <select
                id={timelineId}
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm"
              >
                <option value="">Select</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={unitsId} className="block text-xs text-gray-400 mb-1">
                Number of units
              </label>
              <select
                id={unitsId}
                value={formData.units}
                onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm"
              >
                <option value="">Select</option>
                {UNIT_RANGES.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={hasGalleryId} className="block text-xs text-gray-400 mb-1">
                Sales gallery?
              </label>
              <select
                id={hasGalleryId}
                value={formData.hasGallery}
                onChange={(e) => setFormData({ ...formData, hasGallery: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm"
              >
                <option value="">Select</option>
                {HAS_GALLERY.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={budgetId} className="block text-xs text-gray-400 mb-1">
                Budget range
              </label>
              <select
                id={budgetId}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm"
              >
                <option value="">Select</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <label htmlFor={nameId} className="sr-only">
                Name
              </label>
              <input
                id={nameId}
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoComplete="name"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm placeholder-gray-500"
              />
              <label htmlFor={emailId} className="sr-only">
                Email
              </label>
              <input
                id={emailId}
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm placeholder-gray-500"
              />
              <label htmlFor={companyId} className="sr-only">
                Company
              </label>
              <input
                id={companyId}
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                autoComplete="organization"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-lg text-white text-sm placeholder-gray-500"
              />
            </div>
            {status === "error" && (
              <p role="alert" className="text-red-400 text-sm">
                Something went wrong. Try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-accent hover:bg-accent-light disabled:opacity-50 text-surface-dark font-semibold rounded-lg transition-colors"
            >
              {status === "loading" ? "Sending..." : "Get my proposal"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
