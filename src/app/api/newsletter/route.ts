import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { APP_URL } from "@/lib/app-url";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "LibraryHub <onboarding@resend.dev>";
const WELCOME_SUBJECT = "Welcome to LibraryHub";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Invalid email address",
    }),
});

const jsonResponse = (status: number, data: object) =>
  NextResponse.json(data, { status });

const generateWelcomeEmail = () => {
  const year = new Date().getFullYear();
  const ctaUrl = `${APP_URL}/welcome`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to LibraryHub</title>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:Segoe UI,Arial,sans-serif; color:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%; margin:0; padding:32px 16px; background-color:#f8fafc;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; width:100%;">
          <tr>
            <td style="padding-bottom:16px; text-align:center;">
              <span style="display:inline-block; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#64748b;">
                LibraryHub Newsletter
              </span>
            </td>
          </tr>

          <tr>
            <td style="border:1px solid #e2e8f0; border-radius:24px; overflow:hidden; background-color:#ffffff; box-shadow:0 20px 60px rgba(79,70,229,0.10);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0; background:linear-gradient(135deg,#4f46e5 0%,#f59e0b 100%);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0));">
                      <tr>
                        <td style="padding:36px 40px 28px;">
                          <div style="display:inline-block; padding:8px 14px; border-radius:999px; background-color:rgba(255,255,255,0.14); color:#ffffff; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase;">
                            Welcome Onboard
                          </div>
                          <h1 style="margin:18px 0 0; color:#ffffff; font-size:34px; line-height:1.15; font-weight:700;">
                            Welcome to LibraryHub
                          </h1>
                          <p style="margin:12px 0 0; max-width:460px; color:rgba(255,255,255,0.86); font-size:16px; line-height:1.7;">
                            You are now subscribed to product updates, workflow improvements, and release notes built for modern library teams.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:36px 40px 10px;">
                    <p style="margin:0; font-size:15px; line-height:1.7; color:#334155;">
                      Hi there,
                    </p>
                    <p style="margin:16px 0 0; font-size:16px; line-height:1.8; color:#475569;">
                      Thanks for subscribing to <strong style="color:#0f172a;">LibraryHub</strong>. We will send you thoughtful updates on new features, circulation improvements, member workflow upgrades, and product refinements that help library operations run with more clarity.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px 40px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 12px;">
                          <div style="font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#4f46e5;">
                            What to expect
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 12px;">
                            <tr>
                              <td style="width:28px; vertical-align:top; color:#4f46e5; font-size:18px; line-height:1.4;">•</td>
                              <td style="font-size:15px; line-height:1.7; color:#475569;">Feature launches and release notes that matter to your daily operations.</td>
                            </tr>
                            <tr>
                              <td style="width:28px; vertical-align:top; color:#f59e0b; font-size:18px; line-height:1.4;">•</td>
                              <td style="font-size:15px; line-height:1.7; color:#475569;">Practical updates focused on circulation, catalog visibility, and member management.</td>
                            </tr>
                            <tr>
                              <td style="width:28px; vertical-align:top; color:#4f46e5; font-size:18px; line-height:1.4;">•</td>
                              <td style="font-size:15px; line-height:1.7; color:#475569;">A cleaner view into how LibraryHub is evolving for modern library teams.</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 40px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(79,70,229,0.12); border-radius:20px; background:linear-gradient(135deg,rgba(79,70,229,0.05),rgba(245,158,11,0.05));">
                      <tr>
                        <td style="padding:24px;">
                          <div style="font-size:20px; font-weight:700; line-height:1.3; color:#0f172a;">
                            Explore the welcome space
                          </div>
                          <p style="margin:10px 0 0; font-size:15px; line-height:1.7; color:#475569;">
                            Start with the LibraryHub welcome page and get a quick view of the product direction, experience, and feature set.
                          </p>
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;">
                            <tr>
                              <td>
                                <a href="${ctaUrl}" style="display:inline-block; padding:14px 24px; border-radius:999px; background:linear-gradient(135deg,#4f46e5 0%,#f59e0b 100%); color:#ffffff; text-decoration:none; font-size:14px; font-weight:700;">
                                  Explore LibraryHub
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 40px 36px;">
                    <p style="margin:0; font-size:13px; line-height:1.7; color:#64748b;">
                      You are receiving this email because you subscribed to LibraryHub updates. If this was not you, you can safely ignore this message.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 8px 0; text-align:center;">
              <p style="margin:0; font-size:12px; line-height:1.7; color:#94a3b8;">
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

const sendWelcomeEmail = async (to: string) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: WELCOME_SUBJECT,
    html: generateWelcomeEmail(),
  });
};

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
