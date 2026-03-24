import { useState } from 'react'

export interface MessageFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface UseSubmitMessageResult {
  loading: boolean
  error: string | null
  success: boolean
  submitMessage: (data: MessageFormData) => Promise<void>
}

export function useSubmitMessage(): UseSubmitMessageResult {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function submitMessage(data: MessageFormData) {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      // Basic validation (can be extended)
      if (!data.name || !data.email || !data.subject || !data.message) {
        setError('All fields are required.')
        setLoading(false)
        return
      }
      // Email format check
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
        setError('Invalid email address.')
        setLoading(false)
        return
      }
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setError(err?.message || 'Failed to send message.')
        setLoading(false)
        return
      }
      setSuccess(true)
    } catch (e: any) {
      setError(e?.message || 'Unexpected error.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, submitMessage }
}
