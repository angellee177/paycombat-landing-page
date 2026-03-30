import { sendEmail } from '@/lib/sendEmail'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import sanitizeHtml from 'sanitize-html'

const emailSanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'a',
    'b',
    'blockquote',
    'br',
    'div',
    'em',
    'i',
    'li',
    'ol',
    'p',
    'span',
    'strong',
    'u',
    'ul',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
}

const sanitizeReplyMarkup = (value: string) => sanitizeHtml(value, emailSanitizeOptions)

const normalizeEditorHtml = (value: string) =>
  value
    .replace(/<div><br\s*\/?>\s*<\/div>/gi, '<p>&nbsp;</p>')
    .replace(/<div>/gi, '<p>')
    .replace(/<\/div>/gi, '</p>')
    .replace(/<p>\s*<\/p>/gi, '<p>&nbsp;</p>')

const canonicalizeReplyMarkup = (value: string) =>
  sanitizeReplyMarkup(normalizeEditorHtml(sanitizeReplyMarkup(value)))

const toVisibleText = (value: string) =>
  sanitizeHtml(value, { allowedAttributes: {}, allowedTags: [] })
    .replace(/&nbsp;/g, ' ')
    .trim()

const toEmailHtml = (canonical: string): string => {
  let result = canonical
  // Convert <p> blocks to inline content + <br> spacing — CSS margins are unreliable in Gmail
  result = result.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => {
    const trimmed = content.replace(/&nbsp;/g, '').trim()
    if (!trimmed) return '<br>'
    return content + '<br><br>'
  })
  result = result.replace(/<ul[^>]*>/gi, '<ul style="margin: 4px 0 12px 24px; padding: 0;">')
  result = result.replace(/<ol[^>]*>/gi, '<ol style="margin: 4px 0 12px 24px; padding: 0;">')
  result = result.replace(/<li[^>]*>/gi, '<li style="margin-bottom: 4px;">')
  result = result.replace(
    /<blockquote[^>]*>/gi,
    '<blockquote style="border-left: 4px solid #d1d5db; color: #6b7280; margin: 0 0 12px; padding-left: 12px;">',
  )
  // Collapse runs of 3+ <br> down to 2
  result = result.replace(/(\s*<br\s*\/?>\s*){3,}/gi, '<br><br>')
  // Strip leading/trailing <br>
  result = result.replace(/^(\s*<br\s*\/?>\s*)+/g, '').replace(/(\s*<br\s*\/?>\s*)+$/g, '')
  return result
}

const wrapEmailBody = (body: string) => `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#ffffff;">
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;font-size:14px;line-height:1.6;max-width:600px;margin:0 auto;padding:24px;">
    ${body}
  </div>
</body>
</html>`

export async function POST(
  request: NextRequest,
  props: {
    params: Promise<{ messageId: string }>
  },
) {
  try {
    const { from, to, subject, message, markResolved } = await request.json()
    const { messageId } = await props.params
    const canonicalMessage = canonicalizeReplyMarkup(String(message || ''))

    if (!messageId || !from || !subject || !toVisibleText(canonicalMessage)) {
      return NextResponse.json(
        { error: 'Missing required fields: from, subject, message' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    const existingMessage = await payload.findByID({
      id: messageId,
      collection: 'messages',
    })

    const existingReplies = (existingMessage as { replies?: unknown })?.replies
    const currentReplies = Array.isArray(existingReplies) ? existingReplies : []

    const replyEntry = {
      senderName: 'Admin',
      senderEmail: from,
      role: 'admin' as const,
      body: canonicalMessage,
      privateNote: false,
      sentAt: new Date().toISOString(),
    }

    await payload.update({
      id: messageId,
      collection: 'messages',
      data: {
        replies: [...currentReplies, replyEntry] as unknown as never,
        resolved: Boolean(markResolved),
      } as never,
    })

    if (!to) {
      return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 })
    }

    await sendEmail({
      from,
      to,
      subject,
      html: wrapEmailBody(toEmailHtml(canonicalMessage)),
    })

    return NextResponse.json({ success: true, message: 'Reply sent successfully' })
  } catch (error) {
    console.error('Error sending reply:', error)
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 })
  }
}
