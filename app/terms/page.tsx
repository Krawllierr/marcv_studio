import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | MarcV Studio",
  description: "Terms for MarcV Studio website use and service inquiries.",
};

export default function TermsPage() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Terms</h1>
        <p className="mt-4 text-sm text-gray-400">Last updated: February 21, 2026</p>

        <div className="mt-8 space-y-6 text-sm text-gray-300">
          <p>
            Content on this website is provided for informational purposes and may change without
            notice.
          </p>
          <p>
            Submitting a contact form does not create a contractual obligation. Scope, delivery,
            and pricing are finalized in a separate proposal agreement.
          </p>
          <p>
            For legal or commercial questions, contact
            {" "}
            <a href="mailto:marcv_studio.3d@outlook.com" className="text-accent hover:text-accent-light">
              marcv_studio.3d@outlook.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
