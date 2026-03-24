import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

const DEFAULT_FROM_EMAIL = "LibraryHub <onboarding@resend.dev>";
const NEWSLETTER_SUBJECT = "You're subscribed to LibraryHub updates";

const EMAIL_THEME = {
  background: "#f4efe7",
  surface: "#fcfaf6",
  surfaceSoft: "#f1ebe2",
  border: "#ddd3c5",
  text: "#22313f",
  muted: "#667685",
  primary: "#3f566d",
  primaryStrong: "#2d445a",
  accent: "#c69757",
  accentSoft: "#f5e7d1",
  white: "#ffffff",
} as const;

const jsonResponse = (status: number, data: object) =>
  NextResponse.json(data, { status });

const featureCard = (
  title: string,
  description: string,
  tone: "default" | "accent" = "default",
) => {
  const background =
    tone === "accent" ? EMAIL_THEME.accentSoft : EMAIL_THEME.surface;
  const borderColor =
    tone === "accent" ? "#e8d3b0" : EMAIL_THEME.border;

  return `
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background:${background};border:1px solid ${borderColor};border-radius:22px;"
    >
      <tr>
        <td style="padding:20px 20px 18px;">
          <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:${EMAIL_THEME.text};">
            ${title}
          </p>
          <p style="margin:0;font-size:14px;line-height:1.75;color:${EMAIL_THEME.muted};">
            ${description}
          </p>
        </td>
      </tr>
    </table>
  `;
};

const statCard = (label: string, value: string) => `
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="background:${EMAIL_THEME.surfaceSoft};border:1px solid ${EMAIL_THEME.border};border-radius:20px;"
  >
    <tr>
      <td style="padding:18px 18px 16px;">
        <p style="margin:0 0 7px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.muted};">
          ${label}
        </p>
        <p style="margin:0;font-size:16px;font-weight:700;color:${EMAIL_THEME.text};">
          ${value}
        </p>
      </td>
    </tr>
  </table>
`;

const generateNewsletterEmail = (appUrl: string) => {
  const year = new Date().getFullYear();
  const siteUrl = appUrl.endsWith("/") ? appUrl.slice(0, -1) : appUrl;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${NEWSLETTER_SUBJECT}</title>
  </head>
  <body style="margin:0;padding:0;background:${EMAIL_THEME.background};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_THEME.text};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Your LibraryHub newsletter subscription is active. Expect product updates,
      discovery improvements, and polished feature launches.
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.background};padding:28px 12px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;">
            <tr>
              <td>
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background:${EMAIL_THEME.surface};border:1px solid ${EMAIL_THEME.border};border-radius:32px;overflow:hidden;box-shadow:0 28px 90px rgba(34,49,63,0.10);"
                >
                  <tr>
                    <td style="padding:0;background:${EMAIL_THEME.primaryStrong};background-image:linear-gradient(135deg,${EMAIL_THEME.primaryStrong} 0%,${EMAIL_THEME.primary} 72%,#6a7f91 100%);">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding:28px 28px 30px;">
                            <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.16);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.white};">
                              Subscription active
                            </div>

                            <p style="margin:22px 0 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.68);">
                              LibraryHub
                            </p>

                            <h1 style="margin:14px 0 12px;font-size:34px;line-height:1.18;color:${EMAIL_THEME.white};">
                              Welcome to a calmer stream of LibraryHub updates.
                            </h1>

                            <p style="margin:0;max-width:520px;font-size:15px;line-height:1.8;color:rgba(255,255,255,0.84);">
                              You are officially on the list. We will share meaningful
                              product notes, discovery improvements, and feature releases
                              shaped around the same visual language as the LibraryHub
                              experience.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 24px 8px;background:${EMAIL_THEME.surface};">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td width="33.33%" style="padding:0 8px 16px 0;">
                            ${statCard("Theme", "Warm editorial surfaces")}
                          </td>
                          <td width="33.33%" style="padding:0 4px 16px;">
                            ${statCard("Focus", "Discovery and borrowing")}
                          </td>
                          <td width="33.33%" style="padding:0 0 16px 8px;">
                            ${statCard("Delivery", "Only useful updates")}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:8px 24px 0;background:${EMAIL_THEME.surface};">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="background:${EMAIL_THEME.surfaceSoft};border:1px solid ${EMAIL_THEME.border};border-radius:24px;"
                      >
                        <tr>
                          <td style="padding:22px 22px 20px;">
                            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.primary};">
                              What to expect
                            </p>
                            <p style="margin:0;font-size:15px;line-height:1.8;color:${EMAIL_THEME.muted};">
                              Our newsletter follows the product itself: cleaner discovery,
                              clearer lending journeys, curated highlights, and occasional
                              launch notes worth opening. No noise, no filler, and no
                              flood of weekly promotions.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 24px 0;background:${EMAIL_THEME.surface};">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding-bottom:14px;">
                            ${featureCard(
                              "Discovery flow ready",
                              "Hear about search refinements, better browse patterns, curated lists, and updates that make finding the right title feel faster and more deliberate.",
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:14px;">
                            ${featureCard(
                              "Borrowing with more clarity",
                              "We will highlight improvements to availability signals, lending journeys, and the small polish details that make the member experience easier to trust.",
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ${featureCard(
                              "Launch notes worth reading",
                              "Expect occasional product releases, reading-club updates, and visual refreshes that keep the public site and workspace experience aligned.",
                              "accent",
                            )}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px;background:${EMAIL_THEME.surface};">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="background:${EMAIL_THEME.primaryStrong};background-image:linear-gradient(180deg,${EMAIL_THEME.primary} 0%,${EMAIL_THEME.primaryStrong} 100%);border-radius:26px;border:1px solid #55697d;"
                      >
                        <tr>
                          <td style="padding:24px 22px;text-align:center;">
                            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.68);">
                              Keep exploring
                            </p>
                            <p style="margin:0 0 20px;font-size:16px;line-height:1.8;color:rgba(255,255,255,0.84);">
                              Jump back into the product and continue with the same
                              LibraryHub experience the newsletter is designed around.
                            </p>
                            <a
                              href="${siteUrl}/welcome"
                              style="display:inline-block;padding:14px 28px;border-radius:999px;background:${EMAIL_THEME.accent};color:${EMAIL_THEME.text};font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 14px 28px rgba(0,0,0,0.16);"
                            >
                              Open LibraryHub
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px 26px;background:${EMAIL_THEME.surface};text-align:center;">
                      <p style="margin:0;font-size:13px;line-height:1.8;color:${EMAIL_THEME.muted};">
                        You are receiving this email because you subscribed to
                        LibraryHub updates. If this was not you, you can safely
                        ignore this message.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 24px 24px;background:${EMAIL_THEME.surfaceSoft};border-top:1px solid ${EMAIL_THEME.border};text-align:center;">
                      <p style="margin:0;font-size:12px;line-height:1.9;color:${EMAIL_THEME.muted};">
                        Copyright ${year} LibraryHub<br />
                        Built for discovery, borrowing, and a smoother library workflow.
                      </p>
                      <p style="margin:10px 0 0;font-size:12px;line-height:1.8;">
                        <a href="${siteUrl}/privacy" style="color:${EMAIL_THEME.primary};text-decoration:none;font-weight:700;">Privacy policy</a>
                        <span style="color:${EMAIL_THEME.border};padding:0 8px;">|</span>
                        <a href="${siteUrl}/contact" style="color:${EMAIL_THEME.primary};text-decoration:none;font-weight:700;">Contact</a>
                      </p>
                    </td>
                  </tr>
                </table>
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
