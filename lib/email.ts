import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendStatusChangeEmail({
  to,
  userName,
  company,
  position,
  fromColumn,
  toColumn,
}: {
  to: string;
  userName: string;
  company: string;
  position: string;
  fromColumn: string;
  toColumn: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const dashboardUrl = `${baseUrl}/dashboard`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject: `Application update: ${position} at ${company}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
        <p style="font-size: 16px; margin-bottom: 16px;">Hi ${userName}!</p>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
          Your application for <strong>${position}</strong> at <strong>${company}</strong>
         moved from <strong>${fromColumn}</strong> to <strong>${toColumn}</strong>.
        </p>
        
        <p style="font-size: 16px; margin-bottom: 24px;">
          Click the button below to log in and view all details on the site:
        </p>
        
        <!-- Кнопка-посилання -->
        <a href="${dashboardUrl}" 
           style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500; font-size: 14px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
          Log in to Dashboard
        </a>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 16px 0;" />
        <p style="font-size: 12px; color: #64748b;">If the button doesn't work, copy this link: ${dashboardUrl}</p>
      </div>
    `,
  });
}
