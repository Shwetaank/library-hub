import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

/* ------------------ CONFIG ------------------ */

const FROM_EMAIL = "LibraryHub <onboarding@resend.dev>";
const ADMIN_SUBJECT = "📚 New Demo Request - LibraryHub";
const USER_SUBJECT = "We Received Your Demo Request 🚀";

/* ------------------ VALIDATION ------------------ */

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  organization: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(1000),
});

/* ------------------ RESPONSE HELPER ------------------ */

const jsonResponse = (status: number, data: object) =>
  NextResponse.json(data, { status });

/* ------------------ HTML ESCAPE ------------------ */

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

/* ------------------ ADMIN EMAIL TEMPLATE ------------------ */

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
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:16px;overflow:hidden;
box-shadow:0 10px 35px rgba(0,0,0,0.08);">

<tr>
<td style="background:linear-gradient(90deg,#6D28D9,#EC4899);
padding:30px 40px;text-align:center;">
<h2 style="margin:0;color:#ffffff;">📚 New Demo Request</h2>
<p style="margin:8px 0 0;color:#e0e7ff;font-size:14px;">
LibraryHub Contact Submission
</p>
</td>
</tr>

<tr>
<td style="padding:40px;">
<table width="100%" cellpadding="8" cellspacing="0"
style="font-size:14px;color:#374151;">
<tr><td style="font-weight:600;width:140px;">Full Name:</td><td>${name}</td></tr>
<tr><td style="font-weight:600;">Email:</td><td>${email}</td></tr>
<tr><td style="font-weight:600;">Organization:</td><td>${organization}</td></tr>
<tr>
<td style="font-weight:600;vertical-align:top;">Message:</td>
<td style="line-height:1.6;">${message}</td>
</tr>
</table>

<div style="margin-top:30px;padding:14px 16px;
background:#f9fafb;border-radius:10px;
font-size:12px;color:#6b7280;">
Request ID: ${requestId}
</div>
</td>
</tr>

<tr>
<td style="border-top:1px solid #e5e7eb;"></td>
</tr>

<tr>
<td style="padding:24px;text-align:center;
font-size:12px;color:#9ca3af;">
© ${year} LibraryHub. Internal notification.
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

/* ------------------ USER EMAIL TEMPLATE ------------------ */

const generateUserConfirmationEmail = (name: string) => {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="560" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:16px;
box-shadow:0 10px 35px rgba(0,0,0,0.08);overflow:hidden;">

<tr>
<td style="background:linear-gradient(90deg,#6D28D9,#EC4899);
padding:30px 40px;text-align:center;">
<h2 style="margin:0;color:#ffffff;">You’re All Set 🎉</h2>
</td>
</tr>

<tr>
<td style="padding:40px;">
<p style="margin:0 0 16px;font-size:15px;color:#374151;">
Hi ${name},
</p>

<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
Thank you for requesting a demo of <strong>LibraryHub</strong>.
</p>

<p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4b5563;">
Our team will contact you within 24 hours.
</p>

<div style="text-align:center;margin-top:20px;">
<span style="display:inline-block;
padding:12px 24px;
background:#6D28D9;
color:#ffffff;
border-radius:10px;
font-size:14px;">
We’re excited to connect with you 🚀
</span>
</div>
</td>
</tr>

<tr>
<td style="border-top:1px solid #e5e7eb;"></td>
</tr>

<tr>
<td style="padding:24px;text-align:center;
font-size:12px;color:#9ca3af;">
© ${year} LibraryHub. All rights reserved.
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

/* ------------------ API ROUTE ------------------ */

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
      return jsonResponse(500, { error: "Server configuration error" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse(400, {
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, organization, message } = parsed.data;

    /* Escape user input */
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeOrg = escapeHtml(organization);
    const safeMessage = escapeHtml(message);

    /* 1️⃣ Store in DB */
    const contact = await prisma.contactRequest.create({
      data: {
        name,
        email,
        organization,
        message,
      },
    });

    /* 2️⃣ Send Emails in Parallel */
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
        html: generateUserConfirmationEmail(safeName),
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
