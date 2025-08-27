export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "/",
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
};
