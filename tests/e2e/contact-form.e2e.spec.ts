import { test, expect } from '@playwright/test'

// This test assumes the Contact Us form is rendered on the landing page or a known route
// and that the form fields are named: name, email, subject, message

test.describe('Contact Us Form', () => {
  test('submits a message and appears in Payload admin', async ({ page, request }) => {
    // Go to the page with the Contact Us form
    await page.goto('/') // Change to the correct route if needed

    // Fill out the form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'testuser@example.com')
    await page.fill('input[name="subject"]', 'Integration Test Subject')
    await page.fill(
      'textarea[name="message"]',
      'This is a test message from Playwright integration test.',
    )

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 5000 })

    // Optionally: Check via API that the message exists in the Messages collection
    // (Requires admin API access or a test-only endpoint)
    // Example (pseudo):
    // const res = await request.get('/api/messages?where[subject][equals]=Integration Test Subject')
    // expect(res.ok()).toBeTruthy()
    // const data = await res.json()
    // expect(data.docs[0].email).toBe('testuser@example.com')
  })
})
