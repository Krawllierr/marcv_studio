import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MarcV Studio",
  description: "Privacy policy for MarcV Studio lead and contact forms.",
};

export default function PrivacyPage() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm text-gray-400">Last updated: February 21, 2026</p>

        <div className="mt-8 space-y-6 text-sm text-gray-300">
          <p>
            We collect contact details you submit through our forms to reply to your request, send
            proposal material, and schedule demos.
          </p>
          <p>
            We do not sell your personal data. Information is processed by service providers used
            to handle form submissions and communication workflows.
          </p>
          <p>
            To request update or deletion of your information, contact us at
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
