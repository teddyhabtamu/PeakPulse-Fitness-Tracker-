const welcomeEmail = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
          <tr>
            <td style="padding:0 0 24px;text-align:center;">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#00AEFF;vertical-align:middle;margin-right:8px;"></span>
              <span style="font-size:22px;font-weight:800;color:#0F172A;letter-spacing:-0.5px;vertical-align:middle;">PeakPulse</span>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;padding-bottom:8px;">
                    <span style="font-size:40px;line-height:1;">💪</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 8px;">
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#0F172A;text-align:center;letter-spacing:-0.3px;">Welcome to PeakPulse, ${name}!</h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#475569;text-align:center;">
                      You're all set to start tracking your workouts, monitoring your progress, and reaching new personal bests.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 0 24px;text-align:center;">
                    <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/dashboard" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#174657,#0F2C38);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.3px;">
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0;font-size:13px;line-height:1.5;color:#94A3B8;text-align:center;">
                      Start by logging your first workout, set your goals, and watch your progress grow.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94A3B8;">
                PeakPulse &bull; Built to help you train smarter
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

module.exports = welcomeEmail;
