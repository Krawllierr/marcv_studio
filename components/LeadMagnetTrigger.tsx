"use client";

import { useState } from "react";
import LeadMagnetModal from "./LeadMagnetModal";
import { FileText } from "lucide-react";

export default function LeadMagnetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
      >
        <FileText size={18} />
        Get the free Interactive Sales Gallery Checklist (PDF)
      </button>
      <LeadMagnetModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
