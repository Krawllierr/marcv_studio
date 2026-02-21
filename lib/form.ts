export type LeadFormData = {
  name: string;
  company: string;
  role: string;
  cityState: string;
  projectType: string;
  launchTimeline: string;
  phone: string;
  email: string;
  file?: File;
};

export type LeadMagnetFormData = {
  email: string;
};

export async function submitLeadForm(
  data: LeadFormData,
  endpoint: string
): Promise<{ ok: boolean; error?: string }> {
  if (!endpoint) {
    return { ok: false, error: "Form endpoint not configured" };
  }

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("company", data.company);
  formData.append("role", data.role);
  formData.append("cityState", data.cityState);
  formData.append("projectType", data.projectType);
  formData.append("launchTimeline", data.launchTimeline);
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  if (data.file) {
    formData.append("file", data.file);
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    return { ok: res.ok, error: res.ok ? undefined : "Submission failed" };
  } catch (e) {
    return { ok: false, error: "Network error" };
  }
}

export async function submitLeadMagnet(
  data: LeadMagnetFormData,
  endpoint: string
): Promise<{ ok: boolean; error?: string }> {
  if (!endpoint) {
    return { ok: false, error: "Form endpoint not configured" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: data.email }),
    });
    return { ok: res.ok, error: res.ok ? undefined : "Submission failed" };
  } catch (e) {
    return { ok: false, error: "Network error" };
  }
}
