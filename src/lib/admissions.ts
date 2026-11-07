export type AdmissionEnquiry = {
  name: string;
  phone: string;
  programme: string;
  message: string;
};

const ADMISSIONS_EMAIL = "kitsenggcollege@gmail.com";

export function createAdmissionEmail(enquiry: AdmissionEnquiry): string {
  const subject = `Admission enquiry — ${enquiry.programme}`;
  const body = [
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Programme: ${enquiry.programme}`,
    "",
    enquiry.message,
  ].join("\n");

  return `mailto:${ADMISSIONS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}