import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const FROM_EMAIL = "LibraryHub <onboarding@resend.dev>";
const ADMIN_SUBJECT = "New Demo Request - LibraryHub";
const USER_SUBJECT = "We received your LibraryHub request";

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

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  organization: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(1000),
});

const jsonResponse = (status: number, data: object) =>
  NextResponse.json(data, { status });

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char] || char;
  });

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:0 0 14px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.muted};">
      ${label}
    </td>
  </tr>
  <tr>
    <td style="padding:0 0 20px;font-size:15px;line-height:1.75;color:${EMAIL_THEME.text};">
      ${value}
    </td>
  </tr>
`;

const generateAdminContactEmail = ({
  name,
  email,
  organization,
  message,
  requestId,
}: {
  name: string;
  email: string;
  organization: string;
  message: string;
  requestId: number;
}) => {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:${EMAIL_THEME.background};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_THEME.text};">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.background};padding:28px 12px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;">
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.surface};border:1px solid ${EMAIL_THEME.border};border-radius:32px;overflow:hidden;box-shadow:0 28px 90px rgba(34,49,63,0.10);">
                  <tr>
                    <td style="padding:0;background:${EMAIL_THEME.primaryStrong};background-image:linear-gradient(135deg,${EMAIL_THEME.primaryStrong} 0%,${EMAIL_THEME.primary} 72%,#6a7f91 100%);">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding:28px 28px 30px;">
                            <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.16);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.white};">
                              Internal notification
                            </div>
                            <p style="margin:22px 0 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.68);">
                              LibraryHub Contact
                            </p>
                            <h1 style="margin:14px 0 12px;font-size:34px;line-height:1.18;color:${EMAIL_THEME.white};">
                              New demo request received.
                            </h1>
                            <p style="margin:0;max-width:520px;font-size:15px;line-height:1.8;color:rgba(255,255,255,0.84);">
                              A new inquiry came in through the LibraryHub contact page.
                              The details are below and ready for follow-up.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.surfaceSoft};border:1px solid ${EMAIL_THEME.border};border-radius:24px;">
                        <tr>
                          <td style="padding:22px 22px 18px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              ${detailRow("Full name", name)}
                              ${detailRow("Email", email)}
                              ${detailRow("Organization", organization)}
                              ${detailRow("Message", message)}
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.accentSoft};border:1px solid #e8d3b0;border-radius:22px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.primary};">
                              Request ID
                            </p>
                            <p style="margin:0;font-size:16px;font-weight:700;color:${EMAIL_THEME.text};">
                              #${requestId}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 24px 24px;background:${EMAIL_THEME.surfaceSoft};border-top:1px solid ${EMAIL_THEME.border};text-align:center;">
                      <p style="margin:0;font-size:12px;line-height:1.9;color:${EMAIL_THEME.muted};">
                        Copyright ${year} LibraryHub<br />
                        Internal contact notification.
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

const generateUserConfirmationEmail = (name: string, appUrl: string) => {
  const year = new Date().getFullYear();
  const siteUrl = appUrl.endsWith("/") ? appUrl.slice(0, -1) : appUrl;

  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:${EMAIL_THEME.background};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_THEME.text};">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.background};padding:28px 12px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;">
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.surface};border:1px solid ${EMAIL_THEME.border};border-radius:32px;overflow:hidden;box-shadow:0 28px 90px rgba(34,49,63,0.10);">
                  <tr>
                    <td style="padding:0;background:${EMAIL_THEME.primaryStrong};background-image:linear-gradient(135deg,${EMAIL_THEME.primaryStrong} 0%,${EMAIL_THEME.primary} 72%,#6a7f91 100%);">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding:28px 28px 30px;">
                            <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.16);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.white};">
                              Request received
                            </div>
                            <p style="margin:22px 0 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.68);">
                              LibraryHub
                            </p>
                            <h1 style="margin:14px 0 12px;font-size:34px;line-height:1.18;color:${EMAIL_THEME.white};">
                              Thanks, ${name}. We have your request.
                            </h1>
                            <p style="margin:0;max-width:500px;font-size:15px;line-height:1.8;color:rgba(255,255,255,0.84);">
                              Your note is in. We will review it and reply within 24
                              hours with the most useful next step.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.surfaceSoft};border:1px solid ${EMAIL_THEME.border};border-radius:24px;">
                        <tr>
                          <td style="padding:22px 22px 20px;">
                            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_THEME.primary};">
                              What happens next
                            </p>
                            <p style="margin:0;font-size:15px;line-height:1.8;color:${EMAIL_THEME.muted};">
                              We will review your message, decide whether a demo,
                              product walkthrough, or implementation conversation fits
                              best, and follow up with a thoughtful response.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_THEME.primaryStrong};background-image:linear-gradient(180deg,${EMAIL_THEME.primary} 0%,${EMAIL_THEME.primaryStrong} 100%);border-radius:26px;border:1px solid #55697d;">
                        <tr>
                          <td style="padding:24px 22px;text-align:center;">
                            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.68);">
                              In the meantime
                            </p>
                            <p style="margin:0 0 20px;font-size:16px;line-height:1.8;color:rgba(255,255,255,0.84);">
                              You can continue exploring the product while our team
                              prepares the right response.
                            </p>
                            <a
                              href="${siteUrl}/catalog"
                              style="display:inline-block;padding:14px 28px;border-radius:999px;background:${EMAIL_THEME.accent};color:${EMAIL_THEME.text};font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 14px 28px rgba(0,0,0,0.16);"
                            >
                              Browse LibraryHub
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 24px 24px;background:${EMAIL_THEME.surfaceSoft};border-top:1px solid ${EMAIL_THEME.border};text-align:center;">
                      <p style="margin:0;font-size:12px;line-height:1.9;color:${EMAIL_THEME.muted};">
                        Copyright ${year} LibraryHub<br />
                        Built for discovery, borrowing, and calmer workflows.
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

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
      return jsonResponse(500, { error: "Server configuration error" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse(400, {
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, organization, message } = parsed.data;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeOrg = escapeHtml(organization);
    const safeMessage = escapeHtml(message);

    const contact = await prisma.contactRequest.create({
      data: {
        name,
        email,
        organization,
        message,
      },
    });

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: ADMIN_SUBJECT,
        html: generateAdminContactEmail({
          name: safeName,
          email: safeEmail,
          organization: safeOrg,
          message: safeMessage,
          requestId: contact.id,
        }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: USER_SUBJECT,
        html: generateUserConfirmationEmail(safeName, appUrl),
      }),
    ]);

    return jsonResponse(201, { success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return jsonResponse(500, {
      error: "Internal Server Error",
    });
  }
}
