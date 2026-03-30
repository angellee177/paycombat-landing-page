'use client'

import React, { useMemo, useRef, useState } from 'react'
import { Button, useAuth, useDocumentInfo } from '@payloadcms/ui'
import sanitizeHtml from 'sanitize-html'
import './MessageDetailView.css'

type ReplyItem = {
  body?: string
  id?: string
  role?: 'admin' | 'user'
  senderEmail?: string
  senderName?: string
  sentAt?: string
}

const timestampFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  month: '2-digit',
  second: '2-digit',
  year: 'numeric',
})

const toDateLabel = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return timestampFormatter.format(date)
}

const toPlainText = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedAttributes: {},
  allowedTags: ['b', 'blockquote', 'br', 'div', 'em', 'i', 'li', 'ol', 'p', 'span', 'strong', 'u', 'ul'],
}

const sanitizeReplyMarkup = (value: string) => sanitizeHtml(value, sanitizeOptions)

export const MessageDetailView: React.FC = () => {
  const { data, id } = useDocumentInfo()
  const { user } = useAuth()

  const [replyHtml, setReplyHtml] = useState('')
  const [isSending, setIsSending] = useState(false)
  const editorRef = useRef<HTMLDivElement | null>(null)

  const sanitizedReplyHtml = useMemo(() => sanitizeReplyMarkup(replyHtml), [replyHtml])

  const hasReplyContent = toPlainText(sanitizedReplyHtml).length > 0

  const messageId = useMemo(() => {
    if (id !== undefined && id !== null) return String(id)
    if (data?.id !== undefined && data?.id !== null) return String(data.id)
    return ''
  }, [data, id])

  const conversation = useMemo(() => {
    const initial: ReplyItem = {
      body: typeof data?.message === 'string' ? data.message : '',
      role: 'user' as const,
      senderEmail: typeof data?.email === 'string' ? data.email : '',
      senderName: typeof data?.name === 'string' ? data.name : 'Customer',
      sentAt: typeof data?.createdAt === 'string' ? data.createdAt : undefined,
    }

    const replies = Array.isArray(data?.replies) ? (data.replies as ReplyItem[]) : []

    return [initial, ...replies] as ReplyItem[]
  }, [data])

  const handleSend = async () => {
    if (!messageId || !hasReplyContent) return

    setIsSending(true)

    try {
      const response = await fetch(`/api/messages/${messageId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: user?.email || 'admin@dashboard.com',
          message: sanitizedReplyHtml,
          subject: typeof data?.subject === 'string' ? data.subject : 'Reply',
          to: typeof data?.email === 'string' ? data.email : '',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send reply')
      }

      setReplyHtml('')
      if (editorRef.current) editorRef.current.innerHTML = ''
      window.location.reload()
    } catch (_error) {
      alert('Failed to send reply. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const handleClear = () => {
    setReplyHtml('')
    if (editorRef.current) editorRef.current.innerHTML = ''
  }

  const applyFormatting = (command: string, value?: string) => {
    if (typeof document === 'undefined') return
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    setReplyHtml(editorRef.current?.innerHTML || '')
  }

  return (
    <div style={{ width: '100%', maxWidth: 'none', margin: 0, padding: '8px 24px 24px' }}>
      {conversation.map((item, index) => {
        const isAdmin = item.role === 'admin'
        const sanitizedBody = sanitizeReplyMarkup(item.body || '')

        return (
          <div key={`${index}-${item.sentAt || ''}`} style={{ marginBottom: 16 }}>
            <div
              style={{
                background: '#15171c',
                borderLeft: isAdmin ? '3px solid #2e5cff' : '3px solid #2a2d34',
                borderRadius: 4,
                padding: 18,
              }}
            >
              {index === 0 ? (
                <div style={{ color: '#6d7cff', fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
                  SUBJECT
                </div>
              ) : null}
              {index === 0 ? (
                <div style={{ color: '#f3f5ff', fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
                  {typeof data?.subject === 'string' ? data.subject : 'Message'}
                </div>
              ) : null}
              <div style={{ color: '#9aa0ab', fontSize: 12, marginBottom: 16 }}>
                <strong style={{ color: '#e6e8ef', marginRight: 8 }}>
                  {item.senderName || 'Unknown'}
                </strong>
                {item.senderEmail || ''}
                {item.sentAt ? (
                  <span style={{ marginLeft: 12 }}>{toDateLabel(item.sentAt)}</span>
                ) : null}
              </div>
              <div
                className="thread-message-body"
                dangerouslySetInnerHTML={{ __html: sanitizedBody }}
                style={{ color: '#e5e7ef', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}
              />
            </div>
          </div>
        )
      })}

      <div style={{ border: '1px solid #20242e', background: '#0f1116' }}>
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid #20242e',
            color: '#e8ebf7',
            display: 'flex',
            fontSize: 12,
            fontWeight: 700,
            justifyContent: 'space-between',
            letterSpacing: '.04em',
            padding: '14px 16px',
            textTransform: 'uppercase',
          }}
        >
          <span>Post A Reply</span>
        </div>

        <div className="reply-editor-shell">
          <div className="reply-editor-toolbar" role="toolbar" aria-label="Message formatting">
            <button className="reply-editor-btn" onClick={() => applyFormatting('bold')} type="button">
              B
            </button>
            <button className="reply-editor-btn" onClick={() => applyFormatting('italic')} type="button">
              I
            </button>
            <button className="reply-editor-btn" onClick={() => applyFormatting('underline')} type="button">
              U
            </button>
            <button className="reply-editor-btn" onClick={() => applyFormatting('insertUnorderedList')} type="button">
              • List
            </button>
            <button className="reply-editor-btn" onClick={() => applyFormatting('insertOrderedList')} type="button">
              1. List
            </button>
            <button className="reply-editor-btn" onClick={() => applyFormatting('formatBlock', 'blockquote')} type="button">
              Quote
            </button>
            <button className="reply-editor-btn" onClick={() => applyFormatting('removeFormat')} type="button">
              Clear
            </button>
          </div>

          <div
            aria-label="Write your response"
            className="reply-editor-content"
            contentEditable
            data-placeholder="Write your response here..."
            onInput={(event) => setReplyHtml(event.currentTarget.innerHTML)}
            ref={editorRef}
            suppressContentEditableWarning
          />
        </div>

        <div
          style={{
            alignItems: 'center',
            borderTop: '1px solid #20242e',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px 16px',
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
            <Button buttonStyle="secondary" onClick={handleClear} type="button">
              Discard
            </Button>
            <Button
              buttonStyle="primary"
              disabled={isSending || !hasReplyContent}
              onClick={handleSend}
              type="button"
            >
              {isSending ? 'Sending...' : 'Send Reply'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
