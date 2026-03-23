import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/* ✅ Schema */
const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

/* ✅ Default sender */
const DEFAULT_FROM_EMAIL = "LibraryHub <onboarding@resend.dev>";
const NEWSLETTER_SUBJECT = "You're subscribed to LibraryHub updates";

/* ✅ Helper */
const jsonResponse = (status: number, data: object) =>
  NextResponse.json(data, { status });

const generateNewsletterEmail = (appUrl: string) => {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${NEWSLETTER_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Thanks for subscribing to LibraryHub. You will receive product updates, feature launches, and curated reading highlights.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f7fb;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:28px;overflow:hidden;box-shadow:0 24px 80px rgba(15,23,42,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#314158 0%,#4659a7 55%,#ec4899 100%);padding:18px 24px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:22px 22px 0 0;">
                <tr>
                  <td style="padding:10px 0 28px;">
                    <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.22);font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;">
                      Newsletter confirmed
                    </div>

                    <p style="margin:20px 0 0;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.76);">
                      LibraryHub
                    </p>

                    <h1 style="margin:10px 0 12px;font-size:32px;line-height:1.2;color:#ffffff;">
                      Thanks for joining our update list
                    </h1>

                    <p style="margin:0;max-width:500px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.88);">
                      You are now subscribed to LibraryHub news. We will share product improvements, catalog highlights, and feature releases that support a smoother library experience.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 24px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:22px;">
                <tr>
                  <td style="padding:22px 20px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#4659a7;">
                      What you can expect
                    </p>
                    <p style="margin:0;font-size:15px;line-height:1.8;color:#475569;">
                      Updates from LibraryHub are shaped around the current product flow: easier discovery, clearer borrowing journeys, real-time availability, and a more connected reading experience across the platform.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 24px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-bottom:14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;">
                      <tr>
                        <td style="padding:18px 18px 16px;">
                          <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0f172a;">Discover faster</p>
                          <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">
                            Hear about search upgrades, curated collections, and smarter ways to move from browsing to the right book.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:14px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;">
                      <tr>
                        <td style="padding:18px 18px 16px;">
                          <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0f172a;">Borrow with clarity</p>
                          <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">
                            Stay informed about improvements to availability tracking, borrowing workflows, and the overall member experience.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff7fb;border:1px solid #f3d3e5;border-radius:20px;">
                      <tr>
                        <td style="padding:18px 18px 16px;">
                          <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0f172a;">Stay in sync</p>
                          <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">
                            Expect occasional notes about new features, reading clubs, platform polish, and other LibraryHub launches worth checking out.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 24px 16px;text-align:center;">
              <a
                href="${appUrl}/welcome"
                style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#314158 0%,#4659a7 70%,#ec4899 100%);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 14px 30px rgba(70,89,167,0.28);"
              >
                Explore LibraryHub
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 28px;text-align:center;">
              <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">
                You are receiving this email because you subscribed to LibraryHub updates.
                If this was not you, you can safely ignore this message.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.8;color:#94a3b8;">
                © ${year} LibraryHub<br />
                Built for discovery, borrowing, and a smoother library workflow.
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

/* 🚀 POST Handler */
export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return jsonResponse(500, {
        message: "Newsletter email is not configured yet.",
      });
    }

    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse(400, {
        message: "Invalid email address",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";

    const { email } = parsed.data;
    const html = generateNewsletterEmail(appUrl);

    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: NEWSLETTER_SUBJECT,
      html,
    });

    if (error) {
      console.error("Newsletter email error:", error);

      return jsonResponse(502, {
        message:
          error.message ||
          "Subscription could not be completed due to email provider error.",
      });
    }

    return jsonResponse(200, { message: "Subscription successful!" });
  } catch (error) {
    console.error("Newsletter API error:", error);

    return jsonResponse(500, {
      message: "An error occurred during subscription.",
    });
  }
}
