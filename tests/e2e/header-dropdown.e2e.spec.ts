import { test, expect } from '@playwright/test'

// This test assumes you have a Payload admin running at localhost:3000
// and that the admin user is already authenticated (or you handle login in a helper)

test.describe('Header Dropdown Admin and Frontend Integration', () => {
  test('Admin can add dropdown with children and frontend renders them', async ({
    page,
    context,
  }) => {
    // Go to Payload admin Site Settings
    await page.goto('http://localhost:3000/admin/globals/site-settings')
    await page.screenshot({ path: 'step-1-admin-goto.png' })

    // Wait for the Brand Name label to ensure the page is loaded
    await page.getByLabel('Brand Name').waitFor({ state: 'visible' })
    await page.screenshot({ path: 'step-2-brand-label.png' })

    // Find the Header Links array and add a new Dropdown
    await page.getByRole('button', { name: /add header link/i }).click()
    await page.screenshot({ path: 'step-3-add-header-link.png' })

    // Set type to Dropdown
    await page.locator('select[name$=".type"]').last().selectOption('dropdown')
    await page.screenshot({ path: 'step-4-type-dropdown.png' })

    // Set label
    await page.locator('input[name$=".label"]').last().fill('Our Service')
    await page.screenshot({ path: 'step-5-label-our-service.png' })

    // Save (to trigger conditional field)
    await page.getByRole('button', { name: /save/i }).click()
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'step-6-saved-dropdown.png' })

    // Add a child to the dropdown
    await page
      .getByRole('button', { name: /add dropdown links/i })
      .last()
      .click()
    await page.screenshot({ path: 'step-7-add-dropdown-link.png' })

    await page.locator('input[name$=".children.0.label"]').last().fill('Consulting Service')
    await page.locator('input[name$=".children.0.url"]').last().fill('/consulting')
    await page.screenshot({ path: 'step-8-child-filled.png' })

    // Save again
    await page.getByRole('button', { name: /save/i }).click()
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'step-9-saved-child.png' })

    // Now go to the frontend and check for the dropdown
    const frontend = await context.newPage()
    await frontend.goto('http://localhost:3000/')
    await frontend.screenshot({ path: 'step-10-frontend.png' })

    // Find the dropdown parent
    const dropdownParent = frontend.getByRole('button', { name: /our service/i })
    await expect(dropdownParent).toBeVisible()
    await frontend.screenshot({ path: 'step-11-dropdown-parent.png' })

    // Hover to open dropdown
    await dropdownParent.hover()
    await frontend.screenshot({ path: 'step-12-dropdown-hover.png' })

    // The child should be visible
    const childLink = frontend.getByRole('link', { name: /consulting service/i })
    await expect(childLink).toBeVisible()
    await expect(childLink).toHaveAttribute('href', '/consulting')
    await frontend.screenshot({ path: 'step-13-child-link.png' })

    // Debug: log current URLs
    console.log('Admin page URL:', page.url())
    console.log('Frontend page URL:', frontend.url())
    // Optionally, log a snippet of the DOM if needed
    // console.log(await page.content())
  })
})
