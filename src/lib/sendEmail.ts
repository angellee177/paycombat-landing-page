import { Resend } from 'resend'

interface EmailData {
  from: string
  to: string
  subject: string
  html: string
}

let resend: Resend | null = null

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_THIRD_PARTY_KEY
    if (!apiKey) {
      throw new Error('RESEND_THIRD_PARTY_KEY environment variable is not set')
    }
    resend = new Resend(apiKey)
  }
  return resend
}

export async function sendEmail({ from, to, subject, html }: EmailData): Promise<void> {
  try {
    const resendClient = getResend()
    await resendClient.emails.send({
      from,
      to,
      subject,
      html,
    })
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}
