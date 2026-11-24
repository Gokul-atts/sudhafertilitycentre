import { z } from "zod";
import { appointmentSchema } from "@/schemas/appointmentSchema";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { validatePhoneNumber } from "@/lib/validators/phoneValidator";

const bookingSheetUrl = "https://script.google.com/macros/s/AKfycby3vKUfKzwY_wptmFm-roe9AxF2ugMhZ0c07izl7WME2BNqLhKvGtgq7vtbrCdxWPRC7g/exec";

const bookingSchema = z.object({
  name: appointmentSchema.shape.name,
  mobile: appointmentSchema.shape.mobile,
  location: z.string().trim()
    .min(2, "Enter your city or area.")
    .max(100, "Location cannot exceed 100 characters.")
    .regex(/^[\p{L}\p{N}][^\p{Cc}<>]*$/u, "Enter a city or area starting with a letter or number."),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const { allowed, resetAt } = checkRateLimit(
    `booking-appointment:${getClientIp(req)}`,
    Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
    Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  );
  if (!allowed) {
    res.setHeader("Retry-After", Math.ceil((resetAt - Date.now()) / 1000));
    return res.status(429).json({ success: false, message: "Too many requests. Please try again in a few minutes." });
  }

  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(415).json({ success: false, message: "Unsupported content type." });
  }

  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0]] ??= issue.message;
    }
    return res.status(400).json({ success: false, errors, message: "Please correct the highlighted fields." });
  }

  const phoneCheck = validatePhoneNumber(parsed.data.mobile);
  if (!phoneCheck.valid) {
    return res.status(400).json({
      success: false,
      errors: { mobile: phoneCheck.error },
      message: "Please enter a valid phone number.",
    });
  }

  try {
    const response = await fetch(bookingSheetUrl, {
      method: "POST",
      body: new URLSearchParams({ ...parsed.data, formType: "landing page" }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = response.ok ? await response.json() : null;
    if (result?.success !== false && (result?.success === true || result?.result === "success")) {
      return res.status(200).json({ success: true });
    }
  } catch {
    // The caller receives the same error for a timeout or an invalid script response.
  }

  return res.status(502).json({ success: false, message: "We could not save your appointment request. Please try again." });
}
