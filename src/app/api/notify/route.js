import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();
    const { buttonName, pageName, details, timestamp, device } = body;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.NOTIFICATION_EMAIL || process.env.RESEND_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Sorry Site <onboarding@resend.dev>";

    // If Resend is not yet configured, log to server console for easy testing
    if (!apiKey || !toEmail) {
      console.log(
        `\n🔔 [BUTTON CLICK NOTIFICATION - Simulation Mode]\n` +
        `🔘 Button: "${buttonName}"\n` +
        `📄 Page: ${pageName}\n` +
        `📝 Details: ${details}\n` +
        `⏰ Time: ${timestamp}\n` +
        `⚠️ To receive real emails, set RESEND_API_KEY and NOTIFICATION_EMAIL in .env.local\n`
      );
      return Response.json({
        success: true,
        mode: "simulation",
        message: "Logged to console. Configure RESEND_API_KEY and NOTIFICATION_EMAIL in .env.local to receive real emails.",
      });
    }

    const resend = new Resend(apiKey);

    // Pick emoji based on action
    let emoji = "💌";
    const lowerBtn = (buttonName || "").toLowerCase();
    if (lowerBtn.includes("hug")) emoji = "🤗";
    else if (lowerBtn.includes("gift") || lowerBtn.includes("open")) emoji = "🎁";
    else if (lowerBtn.includes("music") || lowerBtn.includes("song")) emoji = "🎵";
    else if (lowerBtn.includes("talk")) emoji = "💬";
    else if (lowerBtn.includes("need") || lowerBtn.includes("forgive")) emoji = "💖";
    else if (lowerBtn.includes("read") || lowerBtn.includes("letter")) emoji = "📖";
    else if (lowerBtn.includes("opened") || lowerBtn.includes("visit")) emoji = "🌸";

    const subject = `${emoji} [Sorry Site Alert] "${buttonName}" was clicked!`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sorry Site Notification</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #0d0915; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fdf2f8;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background: linear-gradient(145deg, #1d1230 0%, #120b22 100%); border: 1px solid rgba(244, 114, 182, 0.35); border-radius: 20px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6); overflow: hidden;">
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 16px; text-align: center; border-bottom: 1px solid rgba(244, 114, 182, 0.15);">
              <div style="display: inline-block; padding: 6px 16px; background-color: rgba(236, 72, 153, 0.2); border: 1px solid rgba(244, 114, 182, 0.4); border-radius: 9999px; font-size: 13px; color: #f472b6; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
                ${emoji} Activity Alert
              </div>
              <h1 style="margin: 18px 0 6px; font-size: 26px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                ${buttonName}
              </h1>
              <p style="margin: 0; font-size: 15px; color: #d8b4fe;">
                Page: <strong style="color: #f472b6;">${pageName}</strong>
              </p>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 24px 32px;">
              <div style="background-color: rgba(255, 255, 255, 0.04); border-left: 4px solid #ec4899; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #fce7f3;">
                  ${details}
                </p>
              </div>

              <!-- Metadata Table -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(0, 0, 0, 0.25); border-radius: 12px; overflow: hidden; font-size: 14px;">
                <tr>
                  <td style="padding: 12px 16px; color: #c084fc; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06); width: 30%;">
                    ⏰ Timestamp
                  </td>
                  <td style="padding: 12px 16px; color: #fdf2f8; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                    ${timestamp || new Date().toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; color: #c084fc; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                    🔘 Button Name
                  </td>
                  <td style="padding: 12px 16px; color: #f472b6; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                    ${buttonName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; color: #c084fc; font-weight: 600;">
                    📱 Client Info
                  </td>
                  <td style="padding: 12px 16px; color: #9ca3af; font-size: 12px; word-break: break-all;">
                    ${device || "Standard Browser"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px 28px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06);">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                💖 Automatically sent from your <em>Sorry Site</em>
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

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error("[Notify API] Resend error:", error);
      return Response.json({ success: false, error }, { status: 500 });
    }

    console.log(`[Notify API] Email notification sent successfully: ${buttonName}`);
    return Response.json({ success: true, data });
  } catch (err) {
    console.error("[Notify API] Server exception:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
