import { test, expect } from '@playwright/test'

const navLinks = [
  { label: 'Dashboard', url: '/' },
  { label: 'About Us', url: '/about-us' },
  { label: 'Contact Us', url: '/about-us#contact-us' },
  { label: 'FAQ', url: '/landing-page#faq' },
]

test.describe('Header NavLinks Active State', () => {
  test('Contact Us nav is active on /about-us#contact-us', async ({ page }) => {
    await page.goto('http://localhost:3000/about-us#contact-us')
    const contactUs = page.getByRole('link', { name: 'Contact Us' })
    await expect(contactUs).toHaveClass(/active|text-primary|border-primary/)
    // About Us should NOT be active
    const aboutUs = page.getByRole('link', { name: 'About Us' })
    await expect(aboutUs).not.toHaveClass(/active|text-primary|border-primary/)
  })

  test('FAQ nav is active on /landing-page#faq', async ({ page }) => {
    await page.goto('http://localhost:3000/landing-page#faq')
    const faq = page.getByRole('link', { name: 'FAQ' })
    await expect(faq).toHaveClass(/active|text-primary|border-primary/)
    // Dashboard should NOT be active
    const dashboard = page.getByRole('link', { name: 'Dashboard' })
    await expect(dashboard).not.toHaveClass(/active|text-primary|border-primary/)
  })

  test('Dashboard nav is active on /', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    const dashboard = page.getByRole('link', { name: 'Dashboard' })
    await expect(dashboard).toHaveClass(/active|text-primary|border-primary/)
  })

  test('Career nav is active on /careers', async ({ page }) => {
    await page.goto('http://localhost:3000/careers')
    const career = page.getByRole('link', { name: 'Career' })
    await expect(career).toHaveClass(/active|text-primary|border-primary/)
  })
})
