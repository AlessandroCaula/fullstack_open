const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Get the login form using the data-testid defined in the login form in the frontend
    const loginFormLocator = await page.getByTestId('login form')
    await expect(loginFormLocator).toBeVisible()
    // Check the existence of the Username text for the bloglist login form 
    const usernameLocator = await page.getByText('Username')
    await expect(usernameLocator).toBeVisible()
    // Check the existence of the Password text for the bloglist login form
    const passwordLocator = await page.getByText('Password')
    await expect(passwordLocator).toBeVisible()
  })
})