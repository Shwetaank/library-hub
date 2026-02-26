import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { APP_URL } from "@/lib/app-url";

// --- Environment Validation ---
if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "LibraryHub <onboarding@resend.dev>";
const WELCOME_SUBJECT = "Welcome to LibraryHub 🚀";

// --- Validation Schema ---
const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Invalid email address",
    }),
});

// --- Helper: Standard JSON Response ---
const jsonResponse = (status: number, data: object) =>
  NextResponse.json(data, { status });

// --- Helper: Generate Email HTML Dynamically ---
const generateWelcomeEmail = () => {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to LibraryHub</title>
</head>

<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#f3f4f6;">
<tr>
<td align="center">

  <table width="560" cellpadding="0" cellspacing="0" 
         style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.06);">

    <tr>
      <td style="background:linear-gradient(90deg,#6366f1,#8b5cf6); padding:30px 40px; text-align:center;">
        <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:600;">
          Welcome to LibraryHub 📚
        </h1>
        <p style="margin:8px 0 0; font-size:14px; color:#e0e7ff;">
          Modern Cloud-Powered Library Management
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 16px; font-size:15px; color:#374151;">
          Hi there 👋,
        </p>

        <p style="margin:0 0 16px; font-size:15px; line-height:1.7; color:#4b5563;">
          Thanks for subscribing to <strong>LibraryHub</strong>.
          You're now part of our growing community building a smarter,
          faster, and more delightful library experience.
        </p>

        <p style="margin:0 0 30px; font-size:15px; line-height:1.7; color:#4b5563;">
          We’ll send you updates about new features, improvements,
          and performance upgrades.
        </p>

        <table cellpadding="0" cellspacing="0" align="center">
          <tr>
            <td align="center">
              <a href="${APP_URL}/welcome"
                 style="display:inline-block;
                        padding:14px 28px;
                        background-color:#111827;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:10px;
                        font-size:14px;
                        font-weight:500;">
                Explore the Library →
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td style="border-top:1px solid #e5e7eb;"></td>
    </tr>

    <tr>
      <td style="padding:24px 40px; text-align:center; font-size:12px; color:#9ca3af;">
        <p style="margin:0 0 8px;">
          If you didn’t subscribe, you can safely ignore this email.
        </p>
        <p style="margin:0;">
          © ${year} LibraryHub. All rights reserved.
        </p>
      </td>
    </tr>

  </table>

</td>
</tr>
</table>

</body>
</html>
`;
};

// --- Send Email ---
const sendWelcomeEmail = async (to: string) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: WELCOME_SUBJECT,
    html: generateWelcomeEmail(),
  });
};

// --- API Route ---
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = newsletterSchema.safeParse(body);

    if (!validation.success) {
      return jsonResponse(400, {
        error: "Invalid request",
        details: validation.error.flatten().fieldErrors,
      });
    }

    await sendWelcomeEmail(validation.data.email);

    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return jsonResponse(500, {
      error: "Internal Server Error",
    });
  }
}
