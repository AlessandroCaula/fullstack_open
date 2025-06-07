const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Empty the database
    await request.post('http://localhost:3003/api/testing/reset')
    // Create a user 
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "acaula",
        name: "Alessandro Caula",
        password: "provaprova"
      }
    })

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Logging in 
      await page.getByTestId('username').fill('acaula')
      await page.getByTestId('password').fill('provaprova')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Alessandro Caula logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('acaula')
      await page.getByTestId('password').fill('error')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDivLocator = await page.getByTestId('errorDiv')
      await expect(errorDivLocator).toContainText('Wrong username or password')
    })
  })
})