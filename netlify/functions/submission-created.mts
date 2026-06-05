import type { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function buildHtml(name: string, email: string, company: string, message: string): string {
  const companyLine = company
    ? `<tr>
        <td style="padding:4px 0;color:#a1a1aa;font-size:13px;width:110px">Company</td>
        <td style="padding:4px 0;color:#f4f4f5;font-size:13px">${company}</td>
       </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Contact — CoreCodeSolution</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 16px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

          <!-- Header -->
          <tr>
            <td style="background:#18181b;border-radius:16px 16px 0 0;padding:32px 40px;border-bottom:1px solid #27272a">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:700;color:#f4f4f5;letter-spacing:-0.5px">
                      Core<span style="color:#06b6d4">Code</span>Solution
                    </span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:#06b6d4;color:#000;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:0.5px;text-transform:uppercase">
                      New Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#18181b;padding:32px 40px">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#f4f4f5">
                New discovery call request
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:#71717a">
                Someone submitted the contact form on corecodesolution.com
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#09090b;border:1px solid #27272a;border-radius:10px;padding:20px 24px;margin-bottom:28px">
                <tr>
                  <td style="padding:4px 0;color:#a1a1aa;font-size:13px;width:110px">Name</td>
                  <td style="padding:4px 0;color:#f4f4f5;font-size:13px;font-weight:600">${name}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#a1a1aa;font-size:13px">Email</td>
                  <td style="padding:4px 0;font-size:13px">
                    <a href="mailto:${email}" style="color:#06b6d4;text-decoration:none">${email}</a>
                  </td>
                </tr>
                ${companyLine}
              </table>

              <!-- Message -->
              <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px">
                Message
              </p>
              <div style="background:#09090b;border:1px solid #27272a;border-left:3px solid #06b6d4;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:32px">
                <p style="margin:0;font-size:14px;color:#d4d4d8;line-height:1.7;white-space:pre-wrap">${message}</p>
              </div>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:8px">
                <tr>
                  <td style="background:#06b6d4;border-radius:8px">
                    <a href="mailto:${email}?subject=Re: Your inquiry — CoreCodeSolution"
                       style="display:inline-block;padding:12px 28px;color:#000;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.2px">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111113;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #27272a">
              <p style="margin:0;font-size:12px;color:#52525b;text-align:center">
                CoreCodeSolution · Elite Software Services &amp; Business Automation ·
                <a href="https://www.corecodesolution.com" style="color:#06b6d4;text-decoration:none">corecodesolution.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

const handler: Handler = async (event) => {
  const payload = JSON.parse(event.body ?? '{}')

  // Netlify Forms sends field values under payload.data for background functions,
  // but the submission-created sync function receives the submission object directly.
  // Support both shapes to be safe.
  const data = payload.data ?? payload

  const { name, email, company, message } = data as {
    name: string
    email: string
    company?: string
    message: string
  }

  try {
    await transporter.sendMail({
      from: `"CoreCodeSolution" <${process.env.GMAIL_USER}>`,
      to: 'office@corecodesolution.com',
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` · ${company}` : ''}`,
      html: buildHtml(name, email, company ?? '', message),
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company ?? '—'}\n\nMessage:\n${message}`,
    })

    return { statusCode: 200, body: 'OK' }
  } catch (err) {
    console.error('Email send failed:', err)
    return { statusCode: 500, body: 'Email send failed' }
  }
}

export { handler }
